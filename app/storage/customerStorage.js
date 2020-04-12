const db = require('./dbexec');

async function getAllCustomers() {
    // получение объектов
    const conn = await db.connection();
    return conn.query("SELECT cust_edrpou, cust_itn, cust_phone, cust_region, cust_city, cust_street, cust_building, cust_email, cust_acc, cust_debt, cust_notes FROM customer");
}

async function getCustomer(id){
    // получение объектов
    const conn = await db.connection();
    return conn.query(`SELECT cust_edrpou, cust_itn, cust_phone, cust_region, cust_city, cust_street, cust_building, cust_email, cust_acc, cust_debt, cust_notes FROM customer WHERE cust_edrpou= ${id}`);
}

async function getCustomerOrders(id){
    // получение объектов
    const conn = await db.connection();
    return conn.query(`SELECT ord_id, ord_date, ord_notes ,O.cust_edrpou FROM mydb.order O INNER JOIN customer C ON O.cust_edrpou = C.cust_edrpou WHERE C.cust_edrpou = ${id};`);
}

module.exports = { getAllCustomers , getCustomer,getCustomerOrders };