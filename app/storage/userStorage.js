const db = require('./dbexec');

async function getUserByLogin(login){
    const conn = await db.connection();
    let res = conn.query(`SELECT login, pass, role
                          FROM users
                          WHERE login = "${login}"`);
    conn.release();
    return res;
}


module.exports = { getUserByLogin};