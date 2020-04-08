let express = require('express');
const bodyParser = require("body-parser");
let server = express();
let batch = require('./app/batch');
let invoice = require('./app/invoice');
let product = require('./app/product');
let supplier = require('./app/supplier');
let client = require('./app/client');
let order = require('./app/order');

server.listen(8888);
console.log('Server is running on port 8888');
server.use(express.static(__dirname));

//Parsers
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

batch.initBatch(server, jsonParser);
client.initClient(server, jsonParser);
invoice.initInvoice(server, jsonParser);
order.initOrder(server, jsonParser);
product.initProduct(server, jsonParser);
supplier.initSupplier(server, jsonParser);


// Database functions - TBD
//let db = require('./dbexec.js');


//Endpoints
//ROOT
server.get('/', function(req, res) {
    //TODO - check token + session 
    res.write("Main page here")
    res.end();
    //res.sendFile(__dirname+"");
});

//Login
server.get('/login', function(req, res) {
    //TODO - check token + session 
    res.write("Login page here")
    res.end();
    //res.sendFile(__dirname+"");
});

//???????? - login (POST?)

//Admin
server.get('/admin', function(req, res) {
    //TODO - check token + session 

    res.write("Admin page here")
    res.end();
    //res.sendFile(__dirname+"");
});

//Admin login
server.get('/admin/login', function(req, res) {
    //TODO - check token + session 

    res.write("Admin login page here")
    res.end();
    //res.sendFile(__dirname+"");
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