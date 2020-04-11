const db = require('./dbexec');

async function getAllProducts() {
    // получение объектов
    const conn = await db.connection();
    return results = conn.query("SELECT prod_cd, prod_name, prod_unit, prod_total_am, product.man_id, manufacturer.man_name FROM product INNER JOIN manufacturer ON (product.man_id = manufacturer.man_id)");
}

module.exports = { getAllProducts };