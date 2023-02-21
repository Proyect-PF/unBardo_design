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




interface Stats {
    timeUnit: string;
    num: number;
    numberCarts: number;
    numberSales: number;
    numberLogins: number;
    numberRegisters: number;
    numberVisits: number;
    numberPendingSales: number;
    visits_to_approved: number;
    cart_to_approved: number;
    mercadopago_to_approved: number;
}

export const getGeneralStats = async (req: Request, res: Response) => {
    try {
        let { timeUnit = "months", num }: any = req.query;
        let n = Number(num);
        if (timeUnit === "trimesters") {
            timeUnit = "months";
            n = 3;
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

        const rangeStart = moment().subtract(n, timeUnit).startOf(timeUnit).format('YYYY-MM-DD');
        const rangeEnd = moment().endOf(timeUnit).format('YYYY-MM-DD');


        const allDatesQuery = `
    SELECT generate_series('${rangeStart}'::date, '${rangeEnd}'::date, '1 ${timeUnit}') AS timeUnit
`;

        const dataQuery = `
    SELECT
        dates.timeUnit AS timeUnit,
        COUNT(*) AS num,
        COUNT(CASE WHEN action_type = 'create_cart' THEN 1 ELSE NULL END) AS numberCarts,
        COUNT(CASE WHEN action_type = 'payment_success' THEN 1 ELSE NULL END) AS numberSales,
        COUNT(CASE WHEN action_type = 'user_login' THEN 1 ELSE NULL END) AS numberLogins,
        COUNT(CASE WHEN action_type = 'user_registration' THEN 1 ELSE NULL END) AS numberRegisters,
        COUNT(CASE WHEN action_type = 'visit' THEN 1 ELSE NULL END) AS numberVisits,
        COUNT(CASE WHEN action_type = 'mercadopago' THEN 1 ELSE NULL END) AS numberPendingSales,
        (AVG(CASE WHEN action_type = 'payment_success' THEN 1 ELSE 0 END) / NULLIF(AVG(CASE WHEN action_type = 'visit' THEN 1 ELSE 0 END), 0)) * 100 AS visits_to_approved,
        (AVG(CASE WHEN action_type = 'payment_success' THEN 1 ELSE 0 END) / NULLIF(AVG(CASE WHEN action_type = 'create_cart' THEN 1 ELSE 0 END), 0)) * 100 AS cart_to_approved,
        (AVG(CASE WHEN action_type = 'payment_success' THEN 1 ELSE 0 END) / NULLIF(AVG(CASE WHEN action_type = 'mercadopago' THEN 1 ELSE 0 END), 0)) * 100 AS mercadopago_to_approved
    FROM (${allDatesQuery}) dates
    LEFT JOIN "Statistics" s ON dates.timeUnit = DATE_TRUNC('${timeUnit}', s."createdAt")
    WHERE dates.timeUnit >= '${rangeStart}' AND dates.timeUnit <= '${rangeEnd}'
    GROUP BY dates.timeUnit
    ORDER BY dates.timeUnit
`;

        const results = await db.sequelize.query(dataQuery, {
            type: db.sequelize.QueryTypes.SELECT
        });
        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};


