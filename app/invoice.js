let invDao = require('./storage/invStorage');

module.exports = { initInvoice }

function initInvoice(app, jsonParser,config) {
    //Products
    app.get('/inv', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
         
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

            invDao.getAllInvoices().then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });   
        }else{
            res.status(200).write(JSON.stringify({ redirect: '/login' }));
            res.end();
        } 

    });

    //Adding new invoice with a list of batches inside it
    app.post('/inv', jsonParser, async function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
          
            let inv_notes = (req.body.inv_notes === undefined) ? null : req.body.inv_notes;
            let dataInvoice = [req.body.inv_id, req.body.inv_date, inv_notes, req.body.sup_edrpou];
            let dataBatches = req.body.batches;
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

            invDao.addNewInvoice(dataInvoice, dataBatches)
                .then(() => {
                    res.end();
                }).catch(err => {
                    res.write(err.stack);
                    res.end();
                });

            //console.log(dataBatches);  
        }else{
            res.status(200).write(JSON.stringify({ redirect: '/login' }));
            res.end();
        } 
    });

}