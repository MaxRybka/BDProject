const db = require('./dbexec');

async function getCategoriesByProdCd(cd) {
    // получение объектов
    const conn = await db.connection();

    let res = await conn.query(`SELECT category.cat_id, category.cat_name FROM belongs_to INNER JOIN category ON (category.cat_id = belongs_to.cat_id) WHERE belongs_to.prod_cd = ${cd}`);
    conn.release();
    return res;
}

//cat_notes can be null
async function insertNewCategory(cat_name, cat_notes) {
    const conn = await db.connection();
    const sql = "INSERT INTO category (cat_name, cat_notes) VALUES(?, ?)";
    const data = [cat_name, cat_notes];
    let res = await conn.query(sql, data);
    conn.release();
    return res;
}


async function deleteCategoryById(catId) {
    const conn = await db.connection();
    const sql = "DELETE FROM category WHERE cat_id = ?";
    const data = [cat_id];
    let res = await conn.query(sql, data);
    conn.release();
    return res;
}

module.exports = { getCategoriesByProdCd, insertNewCategory, deleteCategoryById };