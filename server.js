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
    res.write("Main page here")
    res.end();
    //res.sendFile(__dirname+"");
});

//Login
server.get('/login', function(req, res) {
    res.write("Login page here")
    res.end();
    //res.sendFile(__dirname+"");
});

//Admin
server.get('/admin', function(req, res) {
    res.write("Admin page here")
    res.end();
    //res.sendFile(__dirname+"");
});

//Admin login
server.get('/admin/login', function(req, res) {
    res.write("Admin login page here")
    res.end();
    //res.sendFile(__dirname+"");
});

//BATCH
server.get('/batch', function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
    res.write("Batch with id = " + myid);
    res.end();
});

server.get('/batch/:id', function(req, res) {
    const myid = req.params.id;
    console.log('id = ' + myid);
    res.write("Batch with id = " + myid);
    res.end();
});

//ORDER
server.get('/order', function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
    res.write("Order with id = " + myid);
    res.end();
});

server.get('/order/:id', function(req, res) {
    const myid = req.params.id;
    console.log('id = ' + myid);
    res.write("Order with id = " + myid);
    res.end();
});

//Supplier
server.get('/supp', function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
    res.write("Supp with id = " + myid);
    res.end();
});

server.get('/supp/:id', function(req, res) {
    const myid = req.params.id;
    console.log('id = ' + myid);
    res.write("Supp with id = " + myid);
    res.end();
});


//Client
server.get('/client', function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
    res.write("Supp with id = " + myid);
    res.end();
});

server.get('/client/:id', function(req, res) {
    const myid = req.params.id;
    console.log('id = ' + myid);
    res.write("Client with id = " + myid);
    res.end();
});


//Products
server.get('/prod', function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
    res.write("Prod with id = " + myid);
    res.end();
});

server.get('/prod/:id', function(req, res) {
    const myid = req.params.id;
    console.log('id = ' + myid);
    res.write("Prod with id = " + myid);
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