import db from '../../database/database';
export async function createMercadoPagoStatistics(id_user: number, id_order: number) {
    try {
        const mpStatistic = {
            action_type: 'mercadopago',
            action_date: new Date(),
            id_user: id_user,
            id_order: id_order,
        };
        await db.Statistics.create(mpStatistic);
    } catch (error) {
        console.error(error);
    }
}