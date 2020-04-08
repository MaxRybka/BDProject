module.exports = { initClient }

function initClient(app, jsonParser) {
    //Client
    app.get('/client', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write("Supp with id = " + myid);
        res.end();
    });

    app.get('/client/:id', function(req, res) {
        //TODO - check token + session 
        const myid = req.params.id;
        console.log('id = ' + myid);
        res.write("Client with id = " + myid);
        res.end();
    });

    app.post('/client', jsonParser, async function(req, res) {
        //check token
        let data = req.body;
        //todo - add new client
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('New client has been added');
        res.end();
    });

    app.put('/client/:id', jsonParser, async function(req, res) {
        const id = req.params.id;
        //check token
        let data = req.body;
        //todo - update client
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('The client has been updated');
        res.end();
    });

    app.delete('/client/:id', async function(req, res) {
        const id = req.params.id;
        //check token
        //todo - delete client by id
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('The client has been deleted');
        res.end();
    });

}