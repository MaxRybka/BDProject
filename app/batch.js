module.exports = { initBatch }

function initBatch(app, jsonParser) {
    //BATCH
    app.get('/batch', function(req, res) {
        //TODO - check token + session 

        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write("Batch with id = " + myid);
        res.end();
    });

    app.get('/batch/:id', function(req, res) {
        //TODO - check token + session     
        const myid = req.params.id;
        console.log('id = ' + myid);
        res.write("Batch with id = " + myid);
        res.end();
    });

    app.post('/batch', jsonParser, async function(req, res) {
        //TODO - check token + session 
        let data = req.body;
        //TODO - db add new batch with data
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Added new batch');
        res.end();
    });

    app.put('/batch/:id', jsonParser, async function(req, res) {
        //TODO - check token + session 
        const id = req.params.id;
        let data = req.body;
        //TODO - db update batch with data
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Added new batch');
        res.end();
    });


    app.delete('/batch/:id', async function(req, res) {
        //TODO - check token + session 
        const id = req.params.id;
        //TODO - db delete batch by id
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Added new batch');
        res.end();
    });

}