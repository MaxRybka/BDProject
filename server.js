let dbexec = require('./app/storage/dbexec');
//dbexec.initPool();

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

//Session 
const passwordHash = require('password-hash');
const redis = require('redis');
const session = require('express-session');
const redisStorage = require('connect-redis')(session);
const client = redis.createClient();
//session duration
const session_duration = 120;

let userDao = require('./app/storage/userStorage');


server.use(
    session({
        store: new redisStorage({
            host: '127.0.0.1',
            port: 6379,
            client: client,
            ttl: session_duration
          }),
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    })
  )

server.listen(8888);
console.log('Server is running on port 8888');
server.use(express.static(__dirname));

//Parsers
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

batch.initBatch(server, jsonParser);
customer.initCustomer(server, jsonParser);
invoice.initInvoice(server, jsonParser);
order.initOrder(server, jsonParser);
product.initProduct(server, jsonParser);
supplier.initSupplier(server, jsonParser);
manuf.initManuf(server, jsonParser);
categ.initCategory(server, jsonParser);

// Database functions - TBD
//let db = require('./dbexec.js');


//Endpoints
//ROOT
server.get('/', function(req, res) {
    //TODO - check token + session 
    //res.write("Main page here")
    console.log("main");
    res.sendFile(__dirname + "/docs/index.html");

});

//Login 
//if session expired redirect here
server.post('/login',jsonParser, function(req, res) {
    console.log(req.body);
    var login = req.body.login;
    var password = req.body.password;

    if(login && password){

        //get user info from db
        userDao.getUserByLogin(login).then((data)=>{
            let userData = data[0][0];
            if(data[0].length !== 0 &&  passwordHash.verify(password,userData.pass)){
                //user exists
                if (!req.session.accessToken) 
                    req.session.accessToken = req.sessionID
                

                req.session.loggedin = true;
                req.session.test_login = login;
                req.session.role = userData.role;
                req.session.maxAge = session_duration;

                res.end();
            }else{
                //throw err
                res.status(400).send({ "err": "Incorrect Username and/or Password!" });
            }
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });
    }else{
        //Redirect to login + notify
    }
});

//Admin
server.get('/admin', function(req, res) {
    //TODO - check token + session 

    res.write("Admin page here")
    res.end();
    //res.sendFile(__dirname+"");
});