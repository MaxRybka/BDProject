const db = require('./dbexec');

async function getAllSuppliers() {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query("SELECT sup_edrpou, sup_itn, sup_name, sup_phone, sup_country, sup_region, sup_city, sup_street, sup_building,sup_email,sup_acc,sup_notes FROM supplier;");
    conn.release();
    return res;
}

async function getSupplier(id) {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query(`SELECT sup_edrpou, sup_itn, sup_name, sup_phone , sup_country, sup_region, sup_city, sup_street, sup_building, sup_email, sup_acc,sup_notes FROM supplier WHERE sup_edrpou = ${id};`);
    conn.release();
    return res
}

async function getSupplierInvoices(id) {
    const conn = await db.connection();
    let res = await conn.query(`SELECT I.inv_id,I.inv_date, I.inv_notes,R.inv_total, S.sup_edrpou, S.sup_name 
                                FROM invoice I INNER JOIN (SELECT B.inv_id, SUM(B.bat_lineprice) AS inv_total
                                                        FROM batch B
                                                        GROUP BY B.inv_id) AS R ON R.inv_id = I.inv_id
                                            INNER JOIN supplier S ON I.sup_edrpou = S.sup_edrpou
                                WHERE I.sup_edrpou = ${id};`);
    conn.release();
    return res;
}


//cat_notes can be null
async function insertNewSupplier(data) {

    const conn = await db.connection();
    const sql = "INSERT INTO supplier (sup_edrpou, sup_itn, sup_name, sup_phone, sup_country, sup_region, sup_city, sup_street, sup_building,sup_email ,sup_acc,sup_notes) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let res = await conn.query(sql, data);
    conn.release();
    return res;
}

//sup_notes can be null
async function updateSupplierById(edrpou, data) {
    const conn = await db.connection();
    console.log(data);
    const sql = `UPDATE supplier SET sup_itn = ?, sup_name = ?, sup_phone = ?, sup_country = ?, sup_region = ?, sup_city = ?, sup_street = ?, sup_building = ?, sup_email = ?, sup_acc = ?, sup_notes = ? WHERE sup_edrpou = ${edrpou};`;
    console.log(sql);
    let res = await conn.query(sql, data);
    conn.release();
    return res;
}

async function getAllSuppLike(id){
    const conn = await db.connection();
    let res = await conn.query(`SELECT sup_edrpou, sup_itn, sup_name, sup_phone , sup_country, sup_region, sup_city, sup_street, sup_building,sup_email,sup_acc,sup_notes
                                FROM supplier S
                                WHERE S.sup_edrpou IN (SELECT S1.sup_edrpou
                                                    FROM supplier S1
                                                    WHERE NOT EXISTS (SELECT *
                                                                        FROM batch B INNER JOIN invoice I ON B.inv_id = I.inv_id
                                                                        WHERE I.sup_edrpou = ${id}
                                                                        AND NOT EXISTS(SELECT *
                                                                                        FROM batch B1 INNER JOIN invoice I1 ON B1.inv_id = I1.inv_id
                                                                                        WHERE I1.sup_edrpou = S1.sup_edrpou AND B1.prod_cd = B.prod_cd)))
                                AND S.sup_edrpou <> ${id};`);
    conn.release();
    return res;
}

module.exports = { getAllSuppliers, getSupplier, getSupplierInvoices, updateSupplierById, insertNewSupplier, getAllSuppLike };