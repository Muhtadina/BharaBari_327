// ./services/FlatService.js
import db from "../db.js";

class FlatService {
    async createFlat(data) {
        const { landlord_id, building, details, location_, division, floor_level, catagory, rentpermonth, room_count, gas_bill, water_bill, current_bill } = data;
        const result = await db.query(
            `INSERT INTO flats (landlord_id, building, details, location_, division, floor_level, catagory, rentpermonth, room_count, gas_bill, water_bill, current_bill)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
             [landlord_id, building, details, location_, division, floor_level, catagory, rentpermonth, room_count, gas_bill, water_bill, current_bill]
        );
        return result[0];
    }

    async getAll() {
        const flats = await db.query(`SELECT * FROM flats`);
        return flats;
    }

    async getById(flatId) {
        const result = await db.query(`SELECT * FROM flats WHERE flat_id=$1`, [flatId]);
        return result[0];
    }
}

export default new FlatService();
