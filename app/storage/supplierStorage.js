const db = require('./dbexec');

async function getAllSuppliers() {
    // получение объектов
    const conn = await db.connection();
    return results = conn.query("SELECT sup_edrpou, sup_itn, sup_name, sup_phone, sup_email, sup_country, sup_region, sup_city, sup_street, sup_building,sup_acc,sup_notes FROM supplier;");
}

async function getSupplier(id) {
    // получение объектов
    const conn = await db.connection();
    return results = conn.query(`SELECT sup_edrpou, sup_itn, sup_name, sup_phone, sup_email, sup_country, sup_region, sup_city, sup_street, sup_building,sup_acc,sup_notes FROM supplier WHERE sup_edrpou = ${id};`);
}

async function getSupplierInvoices(id){
    const conn = await db.connection();
    return results = conn.query(`SELECT inv_id, inv_date, inv_notes, supplier.sup_edrpou, sup_name FROM invoice INNER JOIN supplier ON invoice.sup_edrpou = supplier.sup_edrpou WHERE invoice.sup_edrpou = ${id}`);
}

module.exports = { getAllSuppliers , getSupplier , getSupplierInvoices};