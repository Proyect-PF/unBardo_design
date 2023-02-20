import { Request, Response } from "express";
import db from '../../database/database';

export async function createOrderStatistics(id_user: number, id_order: number) {
    try {
        const cartStatistic = {
            action_type: "create_cart",
            action_date: new Date(),
            user_id: id_user,
            cart_id: id_order,
        };

        await db.Statistics.create(cartStatistic);
    } catch (error) {
        console.error(error);
    }
}
