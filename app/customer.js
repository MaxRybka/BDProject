const custDao = require('./storage/customerStorage');

module.exports = { initCustomer }

function initCustomer(app, jsonParser) {
    //Customer
    app.get('/cust', function(req, res) {
        //TODO - check token + session 
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
    });

    app.get('/cust/:id', function(req, res) {
        //TODO - check token + session 
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
    });

    app.get('/custord/:id', function(req, res) {
        //TODO - check token + session 
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
    });

    app.post('/cust', jsonParser, async function(req, res) {
        //check token
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
    });

    app.put('/cust/:id', jsonParser, async function(req, res) {
        const id = req.params.id;
        //check token
        let data = req.body;
        //todo - update client
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('The customer has been updated');
        res.end();
    });

    app.delete('/cust/:id', async function(req, res) {
        const id = req.params.id;
        //check token
        //todo - delete customer by id
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('The customer has been deleted');
        res.end();
    });

}