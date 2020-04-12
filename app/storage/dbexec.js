const mysql = require("mysql2");

function createPool() {
    try {
        const pool = mysql.createPool({
            connectionLimit: 5,
            host: "localhost",
            user: "root",
            database: "mydb",
            password: "admin"
        });

        const promisePool = pool.promise();

        return promisePool;
    } catch (err) {
        return console.log(`Could not connect - ${error}`);
    }
}

const pool = createPool();

module.exports = {
    connection: async() => pool.getConnection(),
    execute: (...params) => pool.execute(...params)
}