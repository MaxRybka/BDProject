const db = require('./dbexec');

async function getAllManuf() {
    // получение объектов
    const conn = await db.connection();
    let res= await conn.query("SELECT man_id, man_name, man_phone FROM manufacturer");
    conn.release();
    return res;
}

async function getManuf(id){
    // получение объектов
    const conn = await db.connection();
    let res= await conn.query(`SELECT man_id, man_name, man_phone FROM manufacturer WHERE man_id= ${id}`);
    conn.release();
    return res;
}

module.exports = { getAllManuf , getManuf };