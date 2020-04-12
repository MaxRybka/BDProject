const suppDao = require('./storage/supplierStorage');

module.exports = { initSupplier }

function initSupplier(app, jsonParser) {

    //Supplier
    app.get('/supp', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

        suppDao.getAllSuppliers().then((data) => {
            let dataArr = data[0];
            let resArr = [];
            for (let sup of dataArr) {
                resArr.push({
                    id : sup.sup_edrpou,
                    itn : sup.sup_itn,
                    name : sup.sup_name,
                    phone : sup.sup_phone,
                    country : sup.sup_country,
                    region : sup.sup_region,
                    city : sup.sup_city,
                    street : sup.sup_street,
                    building : sup.sup_building,
                    email : sup.sup_email,
                    acc : sup.sup_acc
                });
            }

            res.write(JSON.stringify(resArr));
            res.end();
        }).catch(err => {
            res.write(err);
            res.end();
        });

        
    });

    app.get('/supp/:id', function(req, res) {
        //TODO - check token + session 
        const myid = req.params.id;
        console.log('id = ' + myid);
        res.write("Supp with id = " + myid);
        res.end();
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