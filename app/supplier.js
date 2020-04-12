const suppDao = require('./storage/supplierStorage');

module.exports = { initSupplier }

function initSupplier(app, jsonParser) {

    //Supplier
    app.get('/supp', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

        suppDao.getAllSuppliers().then((data) => {
            let dataToSend = JSON.stringify(data[0]);
            res.write(dataToSend);
            res.end();
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });

    });

    //Get all supplier invoices
    app.get('/suppinv/:id', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

        suppDao.getSupplierInvoices(req.params.id).then((data) => {
            let dataToSend = JSON.stringify(data[0]);
            res.write(dataToSend);
            res.end();
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });

    });

    app.get('/supp/:id', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

        suppDao.getSupplier(req.params.id).then((data) => {
            let dataToSend = JSON.stringify(data[0]);
            res.write(dataToSend);
            res.end();
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });
    });

    app.post('/supp', jsonParser, async function(req, res) {
        //check token
        let data = req.body;
        //todo - add new supplier
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('New supplier has been added');
        res.end();
    });

    app.put('/supp/:id', jsonParser, async function(req, res) {
        const id = req.params.id;
        //check token
        let data = req.body;
        //todo - update supplier
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('The supplier has been updated');
        res.end();
    });

    app.delete('/supp/:id', async function(req, res) {
        const id = req.params.id;
        //check token
        //todo - delete supplier
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('The supplier has been deleted');
        res.end();
    });
}