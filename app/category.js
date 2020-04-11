module.exports = { initBatch }

function initBatch(app, jsonParser) {
    //Category
    app.get('/category', function(req, res) {
        //TODO - check token + session 

        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write("Categories");
        res.end();
    });

    app.get('/category/:id', function(req, res) {
        //TODO - check token + session     
        const myid = req.params.id;
        console.log('id = ' + myid);
        res.write("Category with id = " + myid);
        res.end();
    });

    app.post('/category', jsonParser, async function(req, res) {
        //TODO - check token + session 
        let data = req.body;
        //TODO - db add new batch with data
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Added new category');
        res.end();
    });

    app.put('/category/:id', jsonParser, async function(req, res) {
        //TODO - check token + session 
        const id = req.params.id;
        let data = req.body;
        //TODO - db update batch with data
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Updated category');
        res.end();
    });


    app.delete('/category/:id', async function(req, res) {
        //TODO - check token + session 
        const id = req.params.id;
        //TODO - db delete batch by id
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Deleted category');
        res.end();
    });

}