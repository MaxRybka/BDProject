const db = require('./dbexec');

async function getAllSuppliers() {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query("SELECT sup_edrpou, sup_itn, sup_name, sup_phone, sup_email, sup_country, sup_region, sup_city, sup_street, sup_building,sup_acc,sup_notes FROM supplier;");
    conn.release();
    return res;
}

async function getSupplier(id) {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query(`SELECT sup_edrpou, sup_itn, sup_name, sup_phone, sup_email, sup_country, sup_region, sup_city, sup_street, sup_building,sup_acc,sup_notes FROM supplier WHERE sup_edrpou = ${id};`);
    conn.release();
    return res
}

async function getSupplierInvoices(id) {
    const conn = await db.connection();
    let res = await conn.query(`SELECT inv_id, inv_date, inv_notes, supplier.sup_edrpou, sup_name FROM invoice INNER JOIN supplier ON invoice.sup_edrpou = supplier.sup_edrpou WHERE invoice.sup_edrpou = ${id}`);
    conn.release();
    return res;
}


//cat_notes can be null
async function insertNewSupplier(data) {
    const conn = await db.connection();
    const sql = "INSERT INTO supplier (sup_edrpou, sup_itn, sup_name, sup_phone, sup_email, sup_country, sup_region, sup_city, sup_street, sup_building,sup_acc,sup_notes) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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

module.exports = { getAllSuppliers, getSupplier, getSupplierInvoices, updateSupplierById, insertNewSupplier };