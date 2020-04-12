const db = require('./dbexec');

async function getAllProducts() {
    // получение объектов
    const conn = await db.connection();
    return results = conn.query("SELECT prod_cd, prod_name, prod_unit, prod_total_am, product.man_id, manufacturer.man_name FROM product INNER JOIN manufacturer ON (product.man_id = manufacturer.man_id)");
}

async function getProductCategories(id){
    const conn = await db.connection();
    return results = conn.query(`SELECT category.cat_id, category.cat_name FROM category INNER JOIN belongs_to ON belongs_to.cat_id = category.cat_id WHERE belongs_to.prod_cd = ${id}`);
}

module.exports = { getAllProducts , getProductCategories};