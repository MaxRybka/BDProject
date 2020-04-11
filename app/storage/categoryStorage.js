const db = require('./dbexec');

async function getCategoriesByProdCd(cd) {
    // получение объектов
    const conn = await db.connection();
    return results = conn.query(`SELECT category.cat_id, category.cat_name FROM belongs_to INNER JOIN category ON (category.cat_id = belongs_to.cat_id) WHERE belongs_to.prod_cd = ${cd}`);
}

module.exports = { getCategoriesByProdCd };