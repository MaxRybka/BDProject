const orderDao = require('./storage/orderStorage');
module.exports = { initOrder }

function initOrder(app, jsonParser,config) {
    //ORDER
    app.get('/order', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
        
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            orderDao.getAllOrders().then((data) => {
                    let dataToSend = JSON.stringify(data[0]);
                    res.write(dataToSend);
                    res.end();
                })
                .catch(err => {
                    res.write(err.stack);
                    res.end();
                });    
        }else{
            res.redirect('/login');
        } 
    });

    app.get('/order/:id', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
         
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            orderDao.getOrder(req.params.id).then((data) => {
                    let dataToSend = JSON.stringify(data[0]);
                    res.write(dataToSend);
                    res.end();
                })
                .catch(err => {
                    res.write(err.stack);
                    res.end();
                });   
        }else{
            res.redirect('/login');
        } 
    });

    app.post('/order', jsonParser, async function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            
            let ord_notes = (req.body.ord_notes === undefined) ? null : req.body.ord_notes;
            let dataOrders = [req.body.ord_id, req.body.ord_date, ord_notes, req.body.cust_edrpou];
            let dataOrderLines = req.body.order_lines;
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

            orderDao.addNewOrder(dataOrders, dataOrderLines)
                .then(() => {
                    res.end();
                }).catch(err => {
                    res.write(err.stack);
                    res.end();
                });  
        }else{
            res.redirect('/login');
        } 
    });

    app.put('/order/:id', jsonParser, async function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
        
            const id = req.params.id;
            //check token
            let data = req.body;
            //todo - update order
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            res.write('Order has been updated');
            res.end();    
        }else{
            res.redirect('/login');
        } 
    });
}