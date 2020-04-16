const db = require('./dbexec');

async function getAllInvoices() {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query("SELECT SI.inv_id, SI.inv_date,IB.inv_total, SI.inv_notes , SI.sup_edrpou, SI.sup_name FROM ( SELECT S.sup_edrpou, S.sup_name , I.inv_id, I.inv_date , I.inv_notes FROM supplier S INNER JOIN invoice I ON I.sup_edrpou = S.sup_edrpou) AS SI INNER JOIN (SELECT I2.inv_id ,SUM(bat_lineprice) AS inv_total FROM invoice I2 INNER JOIN batch ON I2.inv_id=batch.inv_id GROUP BY I2.inv_id) IB ON SI.inv_id = IB.inv_id;");
    conn.release();
    return res;
}

async function addNewInvoice(invData, batchesArr) {
    const conn = await db.connection();
    try {
        await conn.beginTransaction();
        console.log('Inv data: ' + `${invData}`);
        console.log('Batches arr: ' + `${batchesArr}`);
        await conn.query('INSERT INTO invoice (inv_id, inv_date, inv_notes, sup_edrpou) VALUES (?, ?, ?, ?)', invData);

        let batchsql = 'INSERT INTO batch (prod_cd, inv_id, bat_extra, bat_amount, bat_price, bat_initamount) VALUES ';

        for (let i = 0; i < batchesArr.length; i++) {
            batchsql += `(${batchesArr[i].prod_cd}, ${batchesArr[i].inv_id}, ${batchesArr[i].bat_extra}, ${batchesArr[i].bat_amount}, ${batchesArr[i].bat_price}, ${batchesArr[i].bat_initamount})`;
            if (i != (batchesArr.length - 1)) {
                batchsql += ', ';
            }
        }
        batchsql += ';';
        console.log('sosiska');
        console.log('Batch sql: ' + `${batchsql}`);
        await conn.query(batchsql);

        for (let prod of batchesArr) {
            await conn.query(`UPDATE product SET prod_total_am = prod_total_am + ${prod.bat_initamount} WHERE prod_cd = ${prod.prod_cd};`);
        }
        await conn.commit();
        console.log("Successfully added new invoice and batches. COMMITTED...");

    } catch (e) {
        console.log("Error occured while adding new invoice.\nROLLBACK...\n: " + e.stack);
        await connection.rollback();
        return await connection.release();
    } finally {
        return conn.release();
    }
}

module.exports = { getAllInvoices, addNewInvoice };