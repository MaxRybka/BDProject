const manufDao = require('./storage/manufStorage');
module.exports = { initManuf }

//Manufacturer    
function initManuf(app, jsonParser) {
    app.get('/manuf', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        manufDao.getAllManuf().then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            })
            .catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

    app.get('/manuf/:id', function(req, res) {
        //TODO - check token + session     
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        manufDao.getManufById(req.params.id).then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            })
            .catch(err => {
                res.write(err.stack);
                res.end();
            });
    });




    app.post('/manuf', jsonParser, async function(req, res) {
        //check token
        let data = [req.body.man_name, req.body.man_phone, req.body.man_country, req.body.man_city, req.body.man_street, req.body.man_building, req.body.man_email];
        data.push((req.body.man_notes === undefined) ? null : req.body.man_notes);
        console.log(data);
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        manufDao.insertNewManuf(data)
            .then(() => {
                res.end();
            })
            .catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

    app.put('/manuf/:id', jsonParser, async function(req, res) {
        //TODO - check token + session 
        const id = req.params.id;
        let data = [req.body.man_name, req.body.man_phone, req.body.man_country, req.body.man_city, req.body.man_street, req.body.man_building, req.body.man_email];
        data.push((req.body.man_notes === undefined) ? null : req.body.man_notes);
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        manufDao.updateManufById(id, data).then(() => {
            res.end();
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });
    });

    app.delete('/manuf/:id', async function(req, res) {
        //TODO - check token + session 
        const id = req.params.id;
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        manufDao.deleteManufById(id).then(() => {
            res.end();
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });
    });

}