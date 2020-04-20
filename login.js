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
            if (req.session.role == 1) {
                res.redirect('/admin');
            } else {
                res.redirect('/');
            }
        }
    });

    server.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect('/login');
        res.end();
    });

    //Login 
    //if session expired redirect here
    server.post('/login', jsonParser, function(req, res) {
        var login = req.body.login;
        var password = req.body.password;
        console.log(req.body);
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

                    if (req.session.role === 1) {
                        res.status(200).write(JSON.stringify({ redirect: '/admin' }));
                        res.end();
                    } else {
                        res.status(200).write(JSON.stringify({ redirect: '/' }));
                        res.end();
                    }
                } else {
                    //throw err
                    console.log("throwing error");
                    res.status(400).send({ "err": "Incorrect Username and/or Password!" });
                    res.end();
                }
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });
        } else {
            console.log("sending error");
            res.send({ redirect: "/login", notify: "Incorrect login/password" });
        }
    });

    //Admin
    server.get('/admin', function(req, res) {
        if (req.session.loggedin) {
            //extend session
            req.session.maxAge = config.session_duration;

            if (req.session.role === 1) {
                res.sendFile(__dirname + "/docs/admin.html");
            } else {
                res.redirect('/logout');
            }
        } else {
            res.redirect('/login');
        }
    });

    server.post('/user', jsonParser, function(req, res) {
        if (req.session.loggedin && req.session.role === 1) {
            //extend session
            req.session.maxAge = config.session_duration;

            //add user
            let login = req.body.login;
            let pass = passwordHash.generate(req.body.password);

            console.log('Adding ' + login + ' ' + pass);
            userDao.addNewUser(login, pass).then((data) => {
                res.status(200).send(data).end();
            }).catch(err => {
                res.status(400).send(err.stack).end();
            });

        } else {
            res.status(200).write(JSON.stringify({ redirect: '/login' }));
            res.end();
        }
    });

    server.get('/users', function(req, res) {
        if (req.session.loggedin && req.session.role === 1) {
            //extend session
            req.session.maxAge = config.session_duration;

            userDao.getAllUsers().then((data) => {
                res.status(200).send(data[0]);
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });

        } else {
            res.status(200).write(JSON.stringify({ redirect: '/login' }));
            res.end();
        }
    });


    server.delete('/user/:login', function(req, res) {
        if (req.session.loggedin && req.session.role === 1) {
            //extend session
            req.session.maxAge = config.session_duration;
            const login = req.params.login;
            console.log('Trying to delete ' + login);
            userDao.deleteUserByLogin(login).then((data) => {
                res.status(200).send(data[0]).end();
            }).catch(err => {
                res.status(400).send(err.stack).end();
            });

        } else {
            res.status(200).write(JSON.stringify({ redirect: '/login' }));
            res.end();
        }
    });


}