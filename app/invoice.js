let invDao = require('./storage/invStorage');

module.exports = { initInvoice }

function initInvoice(app, jsonParser) {
    //Products
    app.get('/inv', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

        invDao.getAllInvoices().then((data) => {
            let dataArr = data[0];
            let resArr = [];

            for (let inv of dataArr) {
                resArr.push({
                    id : inv.inv_id,
                    date : inv.inv_date,
                    total_price : inv.inv_total,
                    notes : inv.inv_notes,
                    sup_id : inv.sup_edrpou,
                    sup_name : inv.sup_name
                });
            }
            res.write(JSON.stringify(resArr));
            res.end();
        }).catch(err => {
            res.write(err);
            res.end();
        });
        
    });

    app.get('/inv/:id', function(req, res) {
        //TODO - check token + session 
        const myid = req.params.id;
        console.log('id = ' + myid);
        res.write("Invoice with id = " + myid);
        res.end();
    });

    app.post('/inv', jsonParser, async function(req, res) {
        //check token
        let data = req.body;
        //todo - add new product
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('New invoice added');
        res.end();
    });

    app.put('/inv/:id', jsonParser, async function(req, res) {
        const id = req.params.id;
        //check token
        let data = req.body;
        //todo - update product
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('The invoice has been updated');
        res.end();
    });

    app.delete('/inv/:id', async function(req, res) {
        const id = req.params.id;
        //check token
        //todo - add new product
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('The invoice has been deleted');
        res.end();
    });
}