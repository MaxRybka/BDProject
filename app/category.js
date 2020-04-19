const catDao = require('./storage/categoryStorage');
const prodDao = require('./storage/prodStorage');

module.exports = { initCategory }

function initCategory(app, jsonParser,config) {
    //Category
    app.get('/category', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            catDao.getAllCategories().then((data) => {
                    let dataToSend = JSON.stringify(data[0]);
                    res.write(dataToSend);
                    res.end();
                })
                .catch(err => {
                    res.write(err.stack);
                    res.end();
                });
        }else{
            res.status(200).write(JSON.stringify({ redirect: '/login' }));
            res.end();
        } 
    });

    //get all products by category id
    app.get('/category/:id', function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
           
            const catId = req.params.id;
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            prodDao.getProductsByCategoryId(catId).then((data) => {
                    let dataToSend = JSON.stringify(data[0]);
                    res.write(dataToSend);
                    res.end();
                })
                .catch(err => {
                    res.write(err.stack);
                    res.end();
                }); 
        }else{
            res.status(200).write(JSON.stringify({ redirect: '/login' }));
            res.end();
        }   
    });

    app.post('/category', jsonParser, async function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            
            let catNotes = (req.body.cat_notes === undefined) ? null : req.body.cat_notes;
            let category = [req.body.cat_name, req.body.cat_notes];
            let products = req.body.products;
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });

            catDao.insertNewCategory(category, products).then((data) => {
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

    app.put('/category/:id', jsonParser, async function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
            
            const id = req.params.id;
            let catName = req.body.cat_name;
            let catNotes = (req.body.cat_notes === undefined) ? null : req.body.cat_notes;
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            catDao.updateCategoryById(id, catName, catNotes).then((data) => {
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

    app.delete('/category/:id', async function(req, res) {
        if(req.session.loggedin){
            //extend session
            req.session.maxAge = config.session_duration;
          
            const id = req.params.id;
            res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
            catDao.deleteCategoryById(id).then((data) => {
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
}