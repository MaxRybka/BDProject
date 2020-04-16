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
        let data = [req.body.sup_edrpou, req.body.sup_itn, req.body.sup_name, req.body.sup_phone, req.body.sup_country, req.body.sup_region, req.body.sup_city, req.body.sup_street, req.body.sup_building, req.body.sup_email, req.body.sup_acc];
        data.push((req.body.sup_notes === undefined) ? null : req.body.sup_notes);
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        suppDao.insertNewSupplier(data).then(() => {
            res.end();
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });
    });

    app.put('/supp/:id', jsonParser, async function(req, res) {
        //TODO - check token
        const id = req.params.id;
        let data = [req.body.sup_itn, req.body.sup_name, req.body.sup_phone, req.body.sup_country, req.body.sup_region, req.body.sup_city, req.body.sup_street, req.body.sup_building, req.body.sup_email, req.body.sup_acc];
        data.push((req.body.sup_notes === undefined) ? null : req.body.sup_notes);
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        suppDao.updateSupplierById(id, data).then(() => {
            res.end();
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });
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