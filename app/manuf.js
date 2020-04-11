const manufDao = require('./storage/manufStorage');
module.exports = { initManuf }

function initManuf(app, jsonParser) {
    //Manufacturer
    app.get('/manuf', function(req, res) {
        //TODO - check token + session 
        manufDao.getAllManuf().then((data) => {
                let info = data[0];
                console.log(info);
            })
            .catch(err => console.log(err));
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write("Manufacturers");
        res.end();
    });

    app.get('/manuf/:id', function(req, res) {
        //TODO - check token + session     
        const myid = req.params.id;
        console.log('id = ' + myid);
        res.write("Manufacturer with id = " + myid);
        res.end();
    });

    app.post('/manuf', jsonParser, async function(req, res) {
        //TODO - check token + session 
        let data = req.body;
        //TODO - db add new batch with data
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Added new manufacturer');
        res.end();
    });

    app.put('/manuf/:id', jsonParser, async function(req, res) {
        //TODO - check token + session 
        const id = req.params.id;
        let data = req.body;
        //TODO - db update batch with data
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Updated manufacturer');
        res.end();
    });


    app.delete('/manuf/:id', async function(req, res) {
        //TODO - check token + session 
        const id = req.params.id;
        //TODO - db delete batch by id
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Deleted manufacturer');
        res.end();
    });

}