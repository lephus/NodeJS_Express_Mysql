const query = require('../database/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');


class ProductModel {
    tableName = 'products';

    select = async () => {
        const Category = await query("SELECT * FROM `categories`")
        let sql = `SELECT * FROM products ORDER BY products.created_at DESC`;
        const ok = await query(sql);
        let resOK = []
        ok.forEach(element => {
            let ca = ""
            Category.forEach(tmp => {
                if(element.category_id == tmp.category_id){
                    ca = tmp.category_name
                }
            });
            resOK.push({product: element, category: ca})
        });
        return resOK;
    }

    findOne = async (id) => {
        let sql = `SELECT * FROM products INNER JOIN categories ON categories.category_id = products.pro_id WHERE products.pro_id = ?`;
        return await query(sql, [id]);
    }

    create = async (category_id, pro_title, pro_subtitle, pro_image, number1, number2, number3, image1, image2, image3, content1, content2, content3) => {
        const sql = `INSERT INTO ${this.tableName}
        (category_id, pro_title, pro_subtitle, pro_image, number1, number2, number3, image1, image2, image3, content1, content2, content3)
        VALUES ( '${category_id}', '${pro_title}', '${pro_subtitle}', '${pro_image}', '${number1}', '${number2}', '${number3}', '${image1}', '${image2}', '${image3}', '${content1}', '${content2}', '${content3}')`;
        console.log(sql)
        const result = await query(sql);
        if(!result){
            return false;
        }
        return true
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE pro_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    update = async (pro_id, category_id, pro_title, pro_subtitle, pro_image, number1, number2, number3, image1, image2, image3, content1, content2, content3) => {
        const sql = `UPDATE products SET 
        category_id = '${category_id}',
        pro_title = '${pro_title}',
        pro_subtitle = '${pro_subtitle}',
        pro_image = '${pro_image}',
        number1 = '${number1}',
        number2 = '${number2}',
        number3 = '${number3}',
        image1 = '${image1}',
        image2 = '${image2}',
        image3 = '${image3}',
        content1 = '${content1}',
        content2 = '${content2}',
        content3 = '${content3}',
        updated_at = current_timestamp() WHERE pro_id= '${pro_id}' `;
        const result = await query(sql);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

}

module.exports = new ProductModel;