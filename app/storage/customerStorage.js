const db = require('./dbexec');

async function getAllCustomers() {
    const conn = await db.connection();
    let res = await conn.query("SELECT cust_edrpou, cust_itn, cust_name, cust_phone, cust_region, cust_city, cust_street, cust_building, cust_email, cust_acc, cust_debt, cust_notes FROM customer");
    conn.release();
    return res;
}

async function getCustomer(id){
    const conn = await db.connection();
    let res = await conn.query(`SELECT cust_edrpou, cust_itn,cust_name, cust_phone, cust_region, cust_city, cust_street, cust_building, cust_email, cust_acc, cust_debt, cust_notes FROM customer WHERE cust_edrpou= ${id}`);
    conn.release();
    return res;
}

async function getCustomerOrders(id){
    const conn = await db.connection();
    let res = await conn.query(`SELECT ord_id, ord_date, ord_notes ,O.cust_edrpou FROM mydb.order O INNER JOIN customer C ON O.cust_edrpou = C.cust_edrpou WHERE C.cust_edrpou = ${id};`);
    conn.release();
    return res;
}

async function insertNewCustomer(data){
    const conn = await db.connection();
    const sql = "INSERT INTO customer (cust_edrpou, cust_itn, cust_name, cust_phone, cust_region, cust_city, cust_street, cust_building, cust_email, cust_acc, cust_debt, cust_notes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
    let res = await conn.query(sql, data);
    conn.release();
    return res;
}

module.exports = { getAllCustomers , getCustomer,getCustomerOrders, insertNewCustomer };