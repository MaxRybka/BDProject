const db = require('./dbexec');

async function getAllSuppliers() {
    // получение объектов
    const conn = await db.connection();
    return results = conn.query("SELECT JSON_OBJECT('id', sup_edrpou, 'name', sup_name) AS Suplier FROM supplier;");
}

module.exports = { getAllSuppliers };