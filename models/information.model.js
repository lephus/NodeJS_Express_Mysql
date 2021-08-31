const query = require('../database/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');


class InformationModel {
    tableName = 'information';

    select = async () => {
        let sql = `SELECT * FROM ${this.tableName}`;
        return await query(sql);
    }

    create = async ( title, des) => {
        const sql = `INSERT INTO ${this.tableName}
        ( title, des, link) VALUES ('${title}','${des}','#')`;
        const result = await query(sql);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async ( infor_id, title, des) => {
        const sql = `UPDATE information SET 
       title= '${title}', des= '${des}' WHERE infor_id = '${infor_id}' `;
        const result = await query(sql);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }


    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE infor_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }
}

module.exports = new InformationModel;