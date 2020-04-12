const db = require('./dbexec');

async function getAllManuf() {
    // получение объектов
    const conn = await db.connection();
    return conn.query("SELECT man_id, man_name, man_phone FROM manufacturer");
}

async function getManuf(id){
    // получение объектов
    const conn = await db.connection();
    return conn.query(`SELECT man_id, man_name, man_phone FROM manufacturer WHERE man_id= ${id}`);
}

module.exports = { getAllManuf , getManuf };