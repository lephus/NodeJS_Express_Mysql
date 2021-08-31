const query = require('../database/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');


class NewFeedModel {
    tableName = 'newfeeds';

    select = async () => {
        let sql = `SELECT * FROM ${this.tableName} ORDER BY newfeeds.created_at DESC`;
        return await query(sql);
    }

    findOne = async (id) => {
        let sql = `SELECT * FROM newfeeds WHERE newfeeds.newfeed_id = ?`;
        return await query(sql, [id]);
    }

    create = async ({ newfeed_image, newfeed_title, newfeed_subtitle, number1, number2, number3, image1, image2, image3, content1, content2, content3 = Role.SuperUser, age = 0 }) => {
        const sql = `INSERT INTO newfeeds
        ( newfeed_image, newfeed_title, newfeed_subtitle, number1, number2, number3, image1, image2, image3, content1, content2, content3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
        const result = await query(sql, [newfeed_image, newfeed_title, newfeed_subtitle, number1, number2, number3, image1, image2, image3, content1, content2, content3]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE newfeed_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    update = async ({newfeed_id, newfeed_image, newfeed_title, newfeed_subtitle, number1, number2, number3, image1, image2, image3, content1, content2, content3 = Role.SuperUser, age = 0 }) => {
        const sql = `UPDATE newfeeds SET 
        newfeed_image = '${newfeed_image}',
        newfeed_title = '${newfeed_title}',
        newfeed_subtitle = '${newfeed_subtitle}',
        number1 = '${number1}',
        number2 = '${number2}',
        number3 = '${number3}',
        image1 = '${image1}',
        image2 = '${image2}',
        image3 = '${image3}',
        content1 = '${content1}',
        content2 = '${content2}',
        content3 = '${content3}',
        created_at = current_timestamp() WHERE newfeed_id = '${newfeed_id}'`;
        const result = await query(sql, [newfeed_image, newfeed_title, newfeed_subtitle, number1, number2, number3, image1, image2, image3, content1, content2, content3, newfeed_id]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

}

module.exports = new NewFeedModel;