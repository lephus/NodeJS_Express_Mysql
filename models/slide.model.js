const query = require('../database/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');

class SlideModel {
    tableName = 'slides';

    select = async () => {
        let sql = `SELECT * FROM ${this.tableName}`;
        return await query(sql);
    }

    create = async ({ slide_image = Role.SuperUser, age = 0 }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( slide_image) VALUES (?)`;
        const result = await query(sql, [slide_image]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (listSlide) => {
        const sql = `DELETE FROM ${this.tableName}`;
        const result = await query(sql);
        listSlide.forEach(element => {
            const sql = `INSERT INTO ${this.tableName}
            ( slide_image) VALUES (?)`;
            const result = query(sql, [element]);
        });
        return true;
    }


    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE slide_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }
}

module.exports = new SlideModel;