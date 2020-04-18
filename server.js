let dbexec = require('./app/storage/dbexec');

let express = require('express');
const bodyParser = require("body-parser");
let server = express();
let batch = require('./app/batch');
let invoice = require('./app/invoice');
let product = require('./app/product');
let supplier = require('./app/supplier');
let customer = require('./app/customer');
let order = require('./app/order');
let manuf = require('./app/manuf');
let categ = require('./app/category');
let login = require('./app/login');

server.listen(8888);
console.log('Server is running on port 8888');
server.use(express.static(__dirname));

const jsonParser = bodyParser.json();

batch.initBatch(server, jsonParser);
customer.initCustomer(server, jsonParser);
invoice.initInvoice(server, jsonParser);
order.initOrder(server, jsonParser);
product.initProduct(server, jsonParser);
supplier.initSupplier(server, jsonParser);
manuf.initManuf(server, jsonParser);
categ.initCategory(server, jsonParser);
login.initLogin(server, jsonParser);

//ROOT
server.get('/', function(req, res) {
    //TODO - check token + session 
    //res.write("Main page here")
    if (!req.session.accessToken){
        console.log("relog");
        res.redirect('/login');
    }else{
        console.log("main");
        res.sendFile(__dirname + "/docs/index.html");
    }
});