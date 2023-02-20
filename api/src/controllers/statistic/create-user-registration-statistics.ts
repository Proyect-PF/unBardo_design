import { Request, Response } from "express";
import db from '../../database/database';

export async function createUserRegistrationStatistics(id_user: number) {
    try {
        const registrationStatistic = {
            action_type: "user_registration",
            action_date: new Date(),
            id_user: id_user,
        };

        await db.Statistics.create(registrationStatistic);
    } catch (error) {
        console.error(error);
    }
}
