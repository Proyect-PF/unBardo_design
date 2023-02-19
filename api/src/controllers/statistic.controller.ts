import {Request, Response} from 'express';
import moment from 'moment';
import db from '../database/database';

interface DailyStatistic {
    timeUnit: string;
    totalProductsSold: number;
}

export const getProductSalesStats = async (req: Request, res: Response) => {
    try {
        let {timeUnit, num}: any = req.query;
        if (!timeUnit) {
            return res.status(400).json({message: 'Missing period parameter'});
        }
        if (!num && timeUnit === 'days') {
            num = 7;
        } else if (!num && timeUnit === 'weeks') {
            num = 4;
        } else if (!num && timeUnit === 'months') {
            num = 12;
        } else if (!num && timeUnit === 'years') {
            num = 5;
        }
        const range = moment().subtract(num, timeUnit).format('YYYY-MM-DD');

        const query = `
      SELECT DATE_TRUNC('${timeUnit}', orders."createdAt") AS "timeUnit",
        SUM(COALESCE((op.sizes->>'XL')::int, 0) 
          + COALESCE((op.sizes->>'S')::int, 0) 
          + COALESCE((op.sizes->>'M')::int, 0) 
          + COALESCE((op.sizes->>'L')::int, 0)) AS "totalProductsSold"
      FROM public."OrderProducts" AS op
      JOIN public."Orders" AS orders ON op.id_order = orders.id
      WHERE orders."createdAt" >= '${range}'
      GROUP BY DATE_TRUNC('${timeUnit}', orders."createdAt")
      ORDER BY DATE_TRUNC('${timeUnit}', orders."createdAt") ASC
    `;

        const results = await db.sequelize.query(query, {
            type: db.sequelize.QueryTypes.SELECT,
        }) as DailyStatistic[];



        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

