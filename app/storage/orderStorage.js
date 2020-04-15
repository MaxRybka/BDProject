const db = require('./dbexec');

async function getAllOrders() {
    // получение объектов
    const conn = await db.connection();
    let res= await conn.query(`SELECT O.ord_id, ord_date, ord_notes , C.cust_edrpou, C.cust_name, R.ord_price
                               FROM mydb.order O INNER JOIN customer C ON O.cust_edrpou = C.cust_edrpou
                                                 INNER JOIN (SELECT OL.ord_id , SUM(total_price) AS ord_price
                                                             FROM order_line OL
                                                             GROUP BY OL.ord_id) AS R ON R.ord_id = O.ord_id;`);
    conn.release();
    return res;
}

async function getOrder(id){
    // получение объектов
    const conn = await db.connection();
    let res= await conn.query(`SELECT P.prod_cd, P.prod_name, O.price , O.line_amount, O.total_price, M.man_name
                               FROM order_line O INNER JOIN product P ON O.prod_cd = P.prod_cd
                                                 INNER JOIN manufacturer M ON M.man_id = P.man_id
                               WHERE O.ord_id = ${id};`);
    conn.release();
    return res;
}

module.exports = { getAllOrders , getOrder };