let invDao = require('./storage/invStorage');

module.exports = { initInvoice }

function initInvoice(app, jsonParser) {
    //Products
    app.get('/inv', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

        invDao.getAllInvoices().then((data) => {
            let dataToSend = JSON.stringify(data[0]);
            res.write(dataToSend);
            res.end();
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });

    });

    //Adding new invoice with a list of batches inside it
    app.post('/inv', jsonParser, async function(req, res) {
        //check token
        let inv_notes = (req.body.inv_notes === undefined) ? null : req.body.inv_notes;
        let dataInvoice = [req.body.inv_id, req.body.inv_date, inv_notes, req.body.sup_edrpou];
        let dataBatches = req.body.batches;
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

        invDao.addNewInvoice(dataInvoice, dataBatches)
            .then(() => {
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });

        //console.log(dataBatches);
    });

}