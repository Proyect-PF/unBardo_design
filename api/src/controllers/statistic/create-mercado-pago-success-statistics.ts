import { Request, Response } from "express";
import db from '../../database/database';

export async function createPaymentSuccessStatistics(id_order: number, status: string, transaction_amount: number, shipping_amount: number, total_paid_amount: number) {
    try {
        const paymentStatistic = {
            action_type: "payment_success",
            action_date: new Date(),
            //id_user: id_user,
            id_order: id_order,
        };

        await db.Statistics.create(paymentStatistic);
    } catch (error) {
        console.error(error);
    }
}
