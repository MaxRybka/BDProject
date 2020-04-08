module.exports = { initOrder }

function initOrder(app, jsonParser) {
    //ORDER
    app.get('/order', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write("Order with id = " + myid);
        res.end();
    });

    app.get('/order/:id', function(req, res) {
        //TODO - check token + session 
        const myid = req.params.id;
        console.log('id = ' + myid);
        res.write("Order with id = " + myid);
        res.end();
    });

    app.post('/order', jsonParser, async function(req, res) {
        //check token
        let data = req.body;
        //todo - add new order
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('New order added');
        res.end();
    });

    app.put('/order/:id', jsonParser, async function(req, res) {
        const id = req.params.id;
        //check token
        let data = req.body;
        //todo - update order
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Order has been updated');
        res.end();
    });

    app.delete('/order/:id', async function(req, res) {
        const id = req.params.id;
        //check token
        //todo - add new order
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Order has been deleted');
        res.end();
    });
}