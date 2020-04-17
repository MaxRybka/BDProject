const db = require('./dbexec');

async function getAllManuf() {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query("SELECT man_id, man_name, man_phone, man_country, man_city, man_street, man_building, man_email FROM manufacturer");
    conn.release();
    return res;
}

async function getManufById(id) {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query(`SELECT man_id, man_name, man_phone, man_country, man_city, man_street, man_building, man_email FROM manufacturer WHERE man_id= ${id}`);
    conn.release();
    return res;
}

async function insertNewManuf(data) {
    const conn = await db.connection();
    const sql = "INSERT INTO manufacturer (man_name, man_phone, man_country, man_city, man_street, man_building, man_email, man_notes) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
    let res = await conn.query(sql, data);
    conn.release();
    return res;
}

async function updateManufById(id, data) {
    const conn = await db.connection();
    const sql = "UPDATE manufacturer SET man_name = ?, man_phone = ?, man_country = ?, man_city = ?, man_street = ?, man_building = ?, man_email = ?, man_notes = ? WHERE man_id = ?";
    data.push(id);
    let res = await conn.query(sql, data);
    conn.release();
    return res;
}

async function deleteManufById(manId) {
    const conn = await db.connection();
    const sql = "DELETE FROM manufacturer WHERE man_id = ?";
    let res = await conn.query(sql, manId);
    conn.release();
    return res;
}

module.exports = { getAllManuf, getManufById, insertNewManuf, updateManufById, deleteManufById };