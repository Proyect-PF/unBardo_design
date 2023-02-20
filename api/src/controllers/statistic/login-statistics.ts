import { Request, Response } from "express";
import db from '../../database/database';
export async function loginStatistics(id_user: number) {
    try {
        const loginStatistic = {
            action_type: "user_login",
            action_date: new Date(),
            id_user: id_user
        };

        await db.Statistics.create(loginStatistic);
    } catch (error) {
        console.error(error);
    }
}