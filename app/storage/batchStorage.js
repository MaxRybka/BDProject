const db = require('./dbexec');

async function getBatchesByInvoiceId(invId) {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query(`SELECT B.prod_cd, P.prod_name, B.bat_extra, B.bat_amount, B.bat_initamount, B.bat_endprice, B.bat_lineprice, P.man_id, M.man_name
                                 FROM batch B INNER JOIN product P ON B.prod_cd = P.prod_cd
                                              INNER JOIN manufacturer M ON P.man_id = M.man_id 
                                 WHERE B.inv_id = ${invId};`);
    conn.release();
    return res;
}

module.exports = { getBatchesByInvoiceId };