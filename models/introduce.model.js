const query = require('../database/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');


class IntroduceModel {
    tableName = 'menus';

    select = async () => {
        let sql = `SELECT * FROM ${this.tableName} WHERE menu_id = 1`;
        const tmp = await query(sql);
        return tmp[0]
    }

    update = async ({menu_des}) => {
        let sql = `UPDATE menus SET 
        menu_des = '${menu_des}' WHERE menu_id = 1`;
        const tmp = await query(sql);
        return tmp[0]
    }

}

module.exports = new IntroduceModel;