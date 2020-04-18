const suppDao = require('./storage/supplierStorage');

module.exports = { initSupplier }

function initSupplier(app, jsonParser,config) {

    //Supplier
    app.get('/supp', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

            suppDao.getAllSuppliers().then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });
        }else{
            res.redirect('/login');
        } 
    });

    //Get all supplier invoices
    app.get('/suppinv/:id', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

            suppDao.getSupplierInvoices(req.params.id).then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });
        }else{
            res.redirect('/login');
        }  

    });

    app.get('/supp/:id', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

            suppDao.getSupplier(req.params.id).then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });
        }else{
            res.redirect('/login');
        } 
    });

    app.get('/supplike/:id', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            suppDao.getAllSuppLike(req.params.id).then((data) => {
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

    app.post('/supp', jsonParser, async function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            
            let data = [req.body.sup_edrpou, req.body.sup_itn, req.body.sup_name, req.body.sup_phone, req.body.sup_country, req.body.sup_region, req.body.sup_city, req.body.sup_street, req.body.sup_building, req.body.sup_email, req.body.sup_acc];
            data.push((req.body.sup_notes === undefined) ? null : req.body.sup_notes);
            console.log(data);
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            suppDao.insertNewSupplier(data).then(() => {
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });
        }else{
            res.redirect('/login');
        } 
    });

    app.put('/supp/:id', jsonParser, async function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            
            const id = req.params.id;
            let data = [req.body.sup_itn, req.body.sup_name, req.body.sup_phone, req.body.sup_country, req.body.sup_region, req.body.sup_city, req.body.sup_street, req.body.sup_building, req.body.sup_email, req.body.sup_acc];
            data.push((req.body.sup_notes === undefined) ? null : req.body.sup_notes);
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            suppDao.updateSupplierById(id, data).then(() => {
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });
        }else{
            res.redirect('/login');
        } 
    });

}