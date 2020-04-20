const db = require('./dbexec');

async function getUserByLogin(login) {
    const conn = await db.connection();
    let res = conn.query(`SELECT login, pass, role
                          FROM users
                          WHERE login = "${login}"`);
    conn.release();
    return res;
}


async function addNewUser(login, pass) {
    const conn = await db.connection();
    let res = conn.query(`INSERT INTO users (login,pass)
                          VALUES ("${login}", "${pass}")`);
    conn.release();
    return res;
}

async function getAllUsers() {
    const conn = await db.connection();
    let res = conn.query(`SELECT login, role
                          FROM users
                          WHERE role <> 1;`);
    return res;
}

async function deleteUserByLogin(login) {
    const conn = await db.connection();
    let sql = `DELETE FROM users
                WHERE login = ?
                AND role <> 1;`
    let res = conn.query(sql, [login]);
    conn.release();
    return res;
}

module.exports = { getUserByLogin, addNewUser, getAllUsers, deleteUserByLogin };