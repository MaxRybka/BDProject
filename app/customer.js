const custDao = require('./storage/customerStorage');

module.exports = { initCustomer }

function initCustomer(app, jsonParser,config) {
    //Customer
    app.get('/cust', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            custDao.getAllCustomers().then((data) => {
                    let dataToSend = JSON.stringify(data[0]);
                    res.write(dataToSend);
                    res.end();
                })
                .catch(err => {
                    res.write(err.stack);
                    res.end();
                });
        }else{
            res.redirect('/login');
        }
    });

    app.get('/cust/:id', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
 
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            custDao.getCustomer(req.params.id).then((data) => {
                    let dataToSend = JSON.stringify(data[0]);
                    res.write(dataToSend);
                    res.end();
                })
                .catch(err => {
                    res.write(err.stack);
                    res.end();
                });           
        }else{
            res.redirect('/login');
        } 
    });
    

    app.get('/custord/:id', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
     
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            custDao.getCustomerOrders(req.params.id).then((data) => {
                    let dataToSend = JSON.stringify(data[0]);
                    res.write(dataToSend);
                    res.end();
                })
                .catch(err => {
                    res.write(err.stack);
                    res.end();
                });       
        }else{
            res.redirect('/login');
        } 
    });

    app.post('/cust', jsonParser, async function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
        
            let data = [req.body.cust_edrpou, req.body.cust_itn, req.body.cust_name, req.body.cust_phone, req.body.cust_region, req.body.cust_city, req.body.cust_street, req.body.cust_building, req.body.cust_email, req.body.cust_acc, req.body.cust_debt, req.body.cust_notes];
            //console.log(data);
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            custDao.insertNewCustomer(data).then(() => {
                    res.end();
                })
                .catch(err => {
                    res.write(err.stack);
                    res.end();
                });    
        }else{
            res.redirect('/login');
        } 
    });

    app.put('/cust/:id', jsonParser, async function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
        
            const id = req.params.id;
            let data = [req.body.cust_itn, req.body.cust_name, req.body.cust_phone, req.body.cust_region, req.body.cust_city, req.body.cust_street, req.body.cust_building, req.body.cust_email, req.body.cust_acc, req.body.cust_debt];
            data.push((req.body.cust_notes === undefined) ? null : req.body.cust_notes);
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            custDao.updateCustomerById(id, data).then(() => {
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });    
        }else{
            res.redirect('/login');
        } 
    });

}