module.exports = { initSupplier }

function initSupplier(app, jsonParser) {

    //Supplier
    app.get('/supp', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write("Supp with id = " + myid);
        res.end();
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