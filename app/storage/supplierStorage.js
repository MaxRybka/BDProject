const db = require('./dbexec');

async function getAllSuppliers() {
    // получение объектов
    const conn = await db.connection();
    return results = conn.query("SELECT * FROM supplier;");
}

module.exports = { getAllSuppliers };