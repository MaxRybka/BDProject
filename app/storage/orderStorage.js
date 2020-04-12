const db = require('./dbexec');

async function getAllOrders() {
    // получение объектов
    const conn = await db.connection();
    return conn.query("SELECT ord_id, ord_date, ord_notes , cust_edrpou FROM mydb.order;");
}

async function getOrder(id){
    // получение объектов
    const conn = await db.connection();
    return conn.query(`SELECT ord_id, ord_date, ord_notes , cust_edrpou FROM mydb.order WHERE ord_id = ${id};`);
}

module.exports = { getAllOrders , getOrder };