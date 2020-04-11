const db = require('./dbexec');

async function getAllManuf() {
    // получение объектов
    const conn = await db.connection();
    return results = conn.query("SELECT man_id, man_notes FROM manufacturer");
}

module.exports = { getAllManuf };