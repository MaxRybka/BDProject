let userDao = require('./app/storage/userStorage');

module.exports = { initLogin }

function initLogin(server, jsonParser, config) {
    const passwordHash = require('password-hash');
    const redis = require('redis');
    const session = require('express-session');
    const redisStorage = require('connect-redis')(session);
    const client = redis.createClient();

    server.use(
        session({
            store: new redisStorage({
                host: '127.0.0.1',
                port: 6379,
                client: client,
                ttl: config.session_duration
            }),
            secret: 'secret',
            resave: false,
            saveUninitialized: true
        })
    )

    server.get('/login', function(req, res) {
        if (!req.session.loggedin) {
            //res.send("Hello world");
            res.sendFile(__dirname + "/docs/login.html");
        } else {
            console.log('already logged in');
            redirect('/');
        }
    });

    server.post('/logout', function(req, res) {
        req.session.loggedin = false;
        req.session.maxAge = 0;
        res.redirect('/login');
    });

    //Login 
    //if session expired redirect here
    server.post('/login', jsonParser, function(req, res) {
        var login = req.body.login;
        var password = req.body.password;

        if (login && password) {

            //get user info from db
            userDao.getUserByLogin(login).then((data) => {
                let userData = data[0][0];
                if (data[0].length > 0 && passwordHash.verify(password, userData.pass)) {
                    //user exists
                    if (!req.session.loggedin) {
                        req.session.accessToken = req.sessionID
                    }

                    req.session.loggedin = true;
                    req.session.test_login = login;
                    req.session.role = userData.role;
                    req.session.maxAge = config.session_duration;

                    res.end();
                } else {
                    //throw err
                    res.status(400).send({ "err": "Incorrect Username and/or Password!" });
                }
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });
        } else {
            //Redirect to login + notify
            res.status(400).send({ "err": "Incorrect Username and/or Password!" });
            //res.redirect('/login');
        }
    });

    //Admin
    server.get('/admin', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;

            res.write("Admin page here")
            res.end();
            //res.sendFile(__dirname+"");    
        }else{
            res.redirect('/login');
        } 
    });

    server.post('/user', jsonParser, function(req, res) {
        if (req.session.loggedin && req.session.role === 1) {
            //extend session
            req.session.maxAge = config.session_duration;

            //add user
            let login = req.body.login;
            let pass = req.body.password;
            let role = req.body.role;

            userDao.addNewUser(login, pass, role).then((data) => {
                res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });

        } else {
            res.redirect('/login');
        }
    });
}