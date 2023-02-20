import {Request, Response} from 'express';
import moment from 'moment';
import db from '../../database/database';

interface DailyStatistic {
    timeUnit: string;
    totalProductsSold: number;
}

export const getProductSalesStats = async (req: Request, res: Response) => {
    try {
        let {timeUnit, num, status}: any = req.query;
        let n = Number(num)
        if (!timeUnit) {
            return res.status(400).json({message: 'Missing period parameter'});
        }
        if (timeUnit === "trimesters") {
            timeUnit = "months";
            n = 3;
        }
        if (!status) {
            status = 'approved';
        }
        if (!n && timeUnit === 'days') {
            n = 7;
        } else if (!n && timeUnit === 'weeks') {
            n = 4;
        } else if (!n && timeUnit === 'months') {
            n = 12;
        } else if (!n && timeUnit === 'years') {
            n = 5;
        }
        const range = moment().subtract(n, timeUnit).format('YYYY-MM-DD');
        // Por revisar que no se sobreescriban los ceros
        const query = `
WITH date_range AS (
  SELECT generate_series(
    date_trunc('${timeUnit}', '${range}'::date),
    date_trunc('${timeUnit}', NOW())::date,
    '1 ${timeUnit}'::interval
  ) AS "timeUnit"
), sales_data AS (
  SELECT DATE_TRUNC('${timeUnit}', orders."updatedAt") AS "timeUnit",
    SUM(COALESCE((op.sizes->>'XL')::int, 0) 
      + COALESCE((op.sizes->>'S')::int, 0) 
      + COALESCE((op.sizes->>'M')::int, 0) 
      + COALESCE((op.sizes->>'L')::int, 0)) AS "totalProductsSold"
  FROM public."OrderProducts" AS op
  JOIN public."Orders" AS orders ON op.id_order = orders.id
  WHERE orders."updatedAt" >= '${range}' AND orders.status = '${status}'
  GROUP BY DATE_TRUNC('${timeUnit}', orders."updatedAt")
)
SELECT date_range."timeUnit", COALESCE(sales_data."totalProductsSold", 0) AS "totalProductsSold"
FROM date_range
LEFT JOIN sales_data ON date_range."timeUnit" = sales_data."timeUnit"
ORDER BY date_range."timeUnit" ASC;
    `;

        // Version Vieja sin los ceros
    //     const query = `
    //  SELECT DATE_TRUNC('${timeUnit}', orders."updatedAt") AS "timeUnit",
    //    SUM(COALESCE((op.sizes->>'XL')::int, 0)
    //      + COALESCE((op.sizes->>'S')::int, 0)
    //      + COALESCE((op.sizes->>'M')::int, 0)
    //      + COALESCE((op.sizes->>'L')::int, 0)) AS "totalProductsSold"
    //  FROM public."OrderProducts" AS op
    //  JOIN public."Orders" AS orders ON op.id_order = orders.id
    //  WHERE orders."updatedAt" >= '${range}' AND orders.status = '${status}'
    //  GROUP BY DATE_TRUNC('${timeUnit}', orders."updatedAt")
    //  ORDER BY DATE_TRUNC('${timeUnit}', orders."updatedAt") ASC;
    // `;

        const results = await db.sequelize.query(query, {
            type: db.sequelize.QueryTypes.SELECT,
        }) as DailyStatistic[];



        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};
