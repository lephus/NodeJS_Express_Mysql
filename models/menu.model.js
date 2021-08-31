const query = require('../database/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');


class MenuModel {
    tableName = 'menus';

    select = async () => {
        let sql = `SELECT * FROM ${this.tableName}`;
        const menu = await query(sql);
        let resOK = []
        let sql2 = `SELECT * FROM submenus WHERE submenus.menu_id = 2`
        const subMenu = await query(sql2);
        let sql1 = `SELECT * FROM submenus WHERE submenus.menu_id = 1`
        const subMenu1 = await query(sql1);
        menu.forEach(element => {
            if(element.menu_id == 2){
                resOK.push({menu: element , subMenu: subMenu})
            }else{
                resOK.push({menu: element , subMenu: subMenu1})
            }
        });
        return resOK;
    }

    create = async ({ menu_title, menu_des = Role.SuperUser, age = 0 }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( menu_title, menu_des) VALUES (?,?)`;
        
        const result = await query(sql, [menu_title, menu_des]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new MenuModel;