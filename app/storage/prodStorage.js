const db = require('./dbexec');

async function getAllProducts() {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query("SELECT prod_cd, prod_name, prod_unit, prod_total_am, product.man_id, manufacturer.man_name FROM product INNER JOIN manufacturer ON (product.man_id = manufacturer.man_id)");
    conn.release();
    return res;
}

async function getProductsByCategoryId(catId) {
    const conn = await db.connection();
    const sql = "SELECT p.prod_cd, prod_name, prod_unit, prod_total_am, p.prod_notes, p.man_id, m.man_name" +
        " FROM product p INNER JOIN manufacturer m ON (p.man_id = m.man_id)" +
        " INNER JOIN belongs_to b ON (p.prod_cd = b.prod_cd)" +
        " WHERE b.cat_id = ?";
    let res = await conn.query(sql, [catId]);
    conn.release();
    return res;
}

async function getProductsByManufId(manId) {
    const conn = await db.connection();
    const sql = "SELECT p.prod_cd, prod_name, prod_unit, prod_total_am, p.prod_notes, m.man_name" +
        " FROM product p INNER JOIN manufacturer m ON (p.man_id = m.man_id)" +
        " WHERE p.man_id = ?";
    let res = await conn.query(sql, [manId]);
    conn.release();
    return res;
}


module.exports = { getAllProducts, getProductsByCategoryId, getProductsByManufId };