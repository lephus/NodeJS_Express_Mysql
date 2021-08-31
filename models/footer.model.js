const query = require('../database/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');


class FooterModel {
    tableName = 'footer';

    select = async () => {
        let sql = `SELECT * FROM type_footer`;
        const type_footer = await query(sql);
        let resOK = []
        let sql1 = 'SELECT * FROM `footer` WHERE type_id = 1'
        const subMenu1 = await query(sql1);
        let sql2 = 'SELECT * FROM `footer` WHERE type_id = 2'
        const subMenu2 = await query(sql2);
        let sql3 = 'SELECT * FROM `footer` WHERE type_id = 3'
        const subMenu3 = await query(sql3);
        let sql4 = 'SELECT * FROM `footer` WHERE type_id = 4'
        const subMenu4 = await query(sql4);


        resOK.push({type: type_footer[0] , footer: subMenu1})
        resOK.push({type: type_footer[1] , footer: subMenu2})
        resOK.push({type: type_footer[2] , footer: subMenu3})
        resOK.push({type: type_footer[3] , footer: subMenu4})
        return resOK;
    }

    selectTypeFooter = async () => {
        let sql = `SELECT * FROM type_footer`;
        return await query(sql);
    }

    selectFooter = async () => {
        let sql = `SELECT * FROM footer`;
        return await query(sql);
    }

    updateTypeFooter = async ({id, title}) => {
        const sql =`UPDATE type_footer SET title= '${title}' WHERE id = '${id}'`;
        const result = query(sql);
        return true;
    }

    deleteFooter = async (id) => {
        const sql =`DELETE FROM footer WHERE footer_id = '${id}'`;
        console.log(sql)
        const result = query(sql);
        return true;
    }

    insertFooter = async ({type_id, title }) => {
        const sql =`INSERT INTO footer
        (type_id, title, link, des)
         VALUES (?,?,'','')`;
        const result = query(sql, [type_id, title]);
        return true;
    }
    updateFooter =  async ({type_id, title, id }) => {
        const sql =`UPDATE footer SET
         type_id = '${type_id}',
         title = '${title}' WHERE footer_id = '${id}'`;
        const result = query(sql);
        return true;
    }

}

module.exports = new FooterModel;