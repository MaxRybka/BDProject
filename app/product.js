let prodDao = require('./storage/prodStorage');
let catDao = require('./storage/categoryStorage');

module.exports = { initProduct }

function initProduct(app, jsonParser) {
    //Products
    app.get('/prod', function(req, res) {
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        prodDao.getAllProducts().then((data) => {
                let dataArr = data[0];
                let resArr = [];
                for (let prod of dataArr) {
                    let resCatArr = [];
                    catDao.getCategoriesByProdCd(prod.prod_cd).then((data_cat) => {
                        let dataCatArr = data_cat[0];
                        for (let cat of dataCatArr) {
                            resCatArr.push({
                                //parse 
                                id : cat.cat_id,
                                name : cat.cat_name
                            });
                        }                    
                        
                    }).catch(catErr => {
                        catErr.write(catErr);
                        catErr.end();
                    }); //return to user

                    resArr.push({
                        cd: prod.prod_cd,
                        name: prod.prod_name,
                        unit: prod.prod_unit,
                        total_am: prod.prod_total_am,
                        man_id: prod.man_id,
                        man_name: prod.man_name,
                        cat: resCatArr
                    });
                }

                //TODO - связать каждый товар с массивом
                res.write(JSON.stringify(resArr));
                res.end();
            })
            .catch(err => {
                res.write(err);
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