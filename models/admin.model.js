const query = require('../database/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
var md5 = require('md5');
class AdminModel {
    tableName = 'admin';

    login = async ({username, password}) => {
        const _password = md5(password)
        let sql = `SELECT * FROM ${this.tableName} WHERE admin_username = '${username}' AND admin_password = '${_password}'`;
        return await query(sql);
    }

    select = async () => {
        let sql = `SELECT * FROM ${this.tableName}`;
        return await query(sql);
    }

    create = async ({fullname, admin_username, admin_password, phone, address = Role.SuperUser, age = 0 }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( fullname, admin_username, admin_password, phone, address) VALUES (?,?,?,?,?)`;
        
        const result = await query(sql, [fullname, admin_username, md5(admin_password), phone, address ]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (fullname, phone, address, id) => {
        const sql = `UPDATE admin SET fullname= '${fullname}' ,phone= '${phone}' ,address= '${address}' ,updated_at=current_timestamp() WHERE admin_id = ${id}`
        console.log(sql)
        const result = await query(sql);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE admin_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        return result[0];
    }
    checkExit = async (admin_username) => {
        const sql = `SELECT * FROM ${this.tableName}
        WHERE admin_username = '${admin_username}'`;
        const result = await query(sql);
        return result;
    }

    updatePassword = async (passwordNew,passwordOld, id) => {
        const _passwordNew = md5(passwordNew)
        const _passwordOld = md5(passwordOld)
        const sql = `SELECT * FROM admin WHERE admin_id = '${id}' AND admin_password = '${_passwordOld}'`
        const result = await query(sql);
        if(result.length > 0){
            const sql = `UPDATE admin SET admin_password = '${_passwordNew}' WHERE admin_id = '${id}'`
            const result = await query(sql);
            return true
        }else{
            return false;
        }
    } 

}

module.exports = new AdminModel;