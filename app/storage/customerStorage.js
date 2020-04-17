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
    let res = await conn.query(`SELECT O.ord_id, ord_date, ord_notes ,R.ord_price ,O.cust_edrpou, C.cust_name
                                FROM mydb.order O INNER JOIN (SELECT OL.ord_id , SUM(total_price) AS ord_price
                                                              FROM order_line OL
                                                              GROUP BY OL.ord_id) AS R ON R.ord_id = O.ord_id
                                                  INNER JOIN customer C ON O.cust_edrpou = C.cust_edrpou 
                                WHERE C.cust_edrpou = ${id}`);
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

//sup_notes can be null
async function updateCustomerById(edrpou, data) {
    const conn = await db.connection();
    console.log(data);
    const sql = `UPDATE customer SET cust_itn = ?, cust_name = ?, cust_phone = ?, cust_region = ?, cust_city = ?, cust_street = ?, cust_building = ?, cust_email = ?, cust_acc = ?, cust_debt = ?, cust_notes = ? WHERE cust_edrpou = ${edrpou};`;
    let res = await conn.query(sql, data);
    conn.release();
    return res;
}

module.exports = { getAllCustomers , getCustomer,getCustomerOrders, insertNewCustomer, updateCustomerById };