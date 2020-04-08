let express = require('express');
const bodyParser = require("body-parser");
let server = express();

server.listen(8888);
console.log('Server is running on port 8888');
server.use(express.static(__dirname));

//Parsers
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// Database functions - TBD
//let db = require('./dbexec.js');


//Endpoints
//ROOT
server.get('/', function(req, res) {
    res.write("Miaoo!")
    res.end();
    //res.sendFile(__dirname+"");
});


//


server.get('/user/:id', function(req, res) {
    const myid = req.params.id;
    console.log('id = ' + myid);
    res.write("Got user with id = " + myid);
    res.end();
});




















/*



const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mydb",
    password: "admin"
});

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
});*/