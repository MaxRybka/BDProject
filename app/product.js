let prodDao = require('./storage/prodStorage');
let catDao = require('./storage/categoryStorage');

module.exports = { initProduct }

function initProduct(app, jsonParser) {
    //Products
    app.get('/prod', function(req, res) {
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        prodDao.getAllProducts().then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            })
            .catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

    //Get all categories of product by id of product
    app.get('/prodcat/:id', function(req, res) {
        console.log("prod");
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        catDao.getCategoriesByProdCd(req.params.id).then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            })
            .catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

    //Get all products by id of manufacturer
    app.get('/prodmanuf/:id', function(req, res) {
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        prodDao.getProductsByManufId(req.params.id).then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            })
            .catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

    app.get('/prod/:id', function(req, res) {
        //TODO - check token + session 
        const myid = req.params.id;
        console.log('id = ' + myid);
        res.write("Prod with id = " + myid);
        res.end();
    });

    app.post('/prod', jsonParser, async function(req, res) {
        //check token
        let data = req.body;
        //todo - add new product
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('New product added');
        res.end();
    });

    app.put('/prod/:id', jsonParser, async function(req, res) {
        const id = req.params.id;
        //check token
        let data = req.body;
        //todo - update product
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('The product has been updated');
        res.end();
    });

    app.delete('/prod/:id', async function(req, res) {
        const id = req.params.id;
        //check token
        //todo - add new product
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('The product has been deleted');
        res.end();
    });
}