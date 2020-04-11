const mysql = require("mysql2");

function createPool() {
    try {
        const pool = mysql.createPool({
            connectionLimit: 5,
            host: "localhost",
            user: "root",
            database: "mydb",
            password: "admin",
            waitForConnections: true
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


/*
// тестирование подключения
connection.connect(function(err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});
// закрытие подключения
connection.end(function(err) {
    if (err) {
        return console.log("Ошибка: " + err.message);
    }
    console.log("Подключение закрыто");
});
*/