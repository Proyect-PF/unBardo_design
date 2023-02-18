import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import moment from "moment";
import db from "../database/database";

export const getProductSalesStats = async (req: Request, res: Response) => {
    try {
        const { timeUnit, status } = req.query;

        let timeUnitFormat: any;
        let groupByTimeUnit;
        let dateRange;

        switch (timeUnit) {
            case "day":
                timeUnitFormat = "YYYY-MM-DD";
                groupByTimeUnit = "date_trunc('day', \"Orders\".\"createdAt\")";
                dateRange = "";
                break;
            case "week":
                timeUnitFormat = "YYYY [W]WW";
                groupByTimeUnit = "to_char(\"Orders\".\"createdAt\" - INTERVAL '1 day', 'IYYY \"W\"IW')";
                dateRange = `AND \"Orders\".\"createdAt\" >= NOW() - INTERVAL '20 years'`;
                break;

            case "month":
                timeUnitFormat = "YYYY-MM";
                groupByTimeUnit = "to_char(\"Orders\".\"createdAt\", 'YYYY-MM')";
                dateRange = `AND \"Orders\".\"createdAt\" >= NOW() - INTERVAL '20 years'`;
                break;
            case "year":
                timeUnitFormat = "YYYY";
                groupByTimeUnit = "to_char(\"Orders\".\"createdAt\", 'YYYY')";
                dateRange = `AND \"Orders\".\"createdAt\" >= NOW() - INTERVAL '20 years'`;
                break;
            default:
                return res.status(400).json({
                    message: `Invalid time unit provided: ${timeUnit}. Valid values are: day, week, month, year.`,
                });
        }

        const stats = await db.sequelize.query(
            `SELECT ${groupByTimeUnit} AS "timeUnit",
              sum(("OrderProducts"."sizes" ->> 'S')::integer + 
                  ("OrderProducts"."sizes" ->> 'M')::integer + 
                  ("OrderProducts"."sizes" ->> 'L')::integer + 
                  ("OrderProducts"."sizes" ->> 'XL')::integer) AS "totalProductsSold"
       FROM "Orders"
       INNER JOIN "OrderProducts" ON "Orders"."id" = "OrderProducts"."id_order"
       WHERE "Orders"."status" = '${status}' ${dateRange}
       GROUP BY "timeUnit"
       ORDER BY "timeUnit" ASC`,
            { type: QueryTypes.SELECT }
        );

        const data = stats.map((stat: { timeUnit: string; totalProductsSold: string }) => {
            return {
                timeUnit: moment(stat.timeUnit + '1', 'YYYY [W]WW').format(timeUnitFormat),
                totalProductsSold: parseInt(stat.totalProductsSold),
            };
        });


        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
