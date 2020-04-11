const db = require('./dbexec');

async function getAllInvoices() {
    // получение объектов
    const conn = await db.connection();
    return results = conn.query("SELECT SI.inv_id, SI.inv_date,IB.inv_total, SI.inv_notes , SI.sup_edrpou, SI.sup_name FROM ( SELECT S.sup_edrpou, S.sup_name , I.inv_id, I.inv_date , I.inv_notes FROM supplier S INNER JOIN invoice I ON I.sup_edrpou = S.sup_edrpou) AS SI INNER JOIN (SELECT I2.inv_id ,SUM(bat_lineprice) AS inv_total FROM invoice I2 INNER JOIN batch ON I2.inv_id=batch.inv_id GROUP BY I2.inv_id) IB ON SI.inv_id = IB.inv_id;");
}

module.exports = { getAllInvoices };