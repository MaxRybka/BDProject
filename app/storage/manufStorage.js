const db = require('./dbexec');

async function getAllManuf() {
    // получение объектов
    const conn = await db.connection();
    const results = conn.execute("SELECT man_id, man_notes FROM manufacturer");
    results.then(res => { console.log(res) })
        .catch(err => console.log(err));
}

module.exports = { test };