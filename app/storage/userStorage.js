const db = require('./dbexec');

async function getUserByLogin(login){
    const conn = await db.connection();
    let res = conn.query(`SELECT login, pass, role
                          FROM users
                          WHERE login = "${login}"`);
    conn.release();
    return res;
}


async function addNewUser(login, pass,role){
    const conn = await db.connection();
    let res = conn.query(`INSERT INTO users [login,pass,role]
                          VALUES ("${login}", "${pass}", ${role})`);
    conn.release();
    return res;
}

module.exports = { getUserByLogin, addNewUser};