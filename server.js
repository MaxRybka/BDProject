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
let login = require('./login');

server.listen(8888);
console.log('Server is running on port 8888');
server.use(express.static(__dirname));

//Project configuration
const config = {
    //session duration
    session_duration: 100
};

const jsonParser = bodyParser.json();
login.initLogin(server, jsonParser, config);

batch.initBatch(server, jsonParser, config);
customer.initCustomer(server, jsonParser, config);
invoice.initInvoice(server, jsonParser, config);
order.initOrder(server, jsonParser, config);
product.initProduct(server, jsonParser, config);
supplier.initSupplier(server, jsonParser, config);
manuf.initManuf(server, jsonParser, config);
categ.initCategory(server, jsonParser, config);

//ROOT
server.get('/', function(req, res) {
    if (!req.session.loggedin) {
        console.log("relogin from main");
        res.redirect('/login');
    } else {
        console.log("main");
        res.sendFile(__dirname + "/docs/index.html");
    }
});