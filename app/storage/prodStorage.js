const db = require('./dbexec');

async function getAllProducts() {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query("SELECT prod_cd, prod_name, prod_unit, prod_total_am, product.man_id, manufacturer.man_name FROM product INNER JOIN manufacturer ON (product.man_id = manufacturer.man_id)");
    conn.release();
    return res;
}

async function getProductsByCategoryId(catId) {
    const conn = await db.connection();
    const sql = `SELECT p.prod_cd, prod_name, prod_unit, prod_total_am, p.prod_notes, p.man_id, m.man_name
                 FROM product p INNER JOIN manufacturer m ON (p.man_id = m.man_id)
                INNER JOIN belongs_to b ON (p.prod_cd = b.prod_cd)
                WHERE b.cat_id = ?`;
    let res = await conn.query(sql, [catId]);
    conn.release();
    return res;
}

async function getProductsByManufId(manId) {
    const conn = await db.connection();
    const sql = "SELECT p.prod_cd, prod_name, prod_unit, prod_total_am, p.prod_notes, m.man_name" +
        " FROM product p INNER JOIN manufacturer m ON (p.man_id = m.man_id)" +
        " WHERE p.man_id = ?";
    let res = await conn.query(sql, [manId]);
    conn.release();
    return res;
}

async function getProductById(prod_cd) {
    const conn = await db.connection();
    const sql = `SELECT prod_name, prod_unit, prod_total_am, prod_notes, man_id ` +
        `FROM product ` +
        `WHERE prod_cd = ${prod_cd}`;
    console.log(sql);
    let res = await conn.query(sql);
    conn.release();
    return res;
}

async function addNewProduct(prod_cd, dataProduct, dataCategs) {
    let categsSql = "INSERT INTO belongs_to (prod_cd, cat_id) " +
        "VALUES ";

    for (let i = 0; i < dataCategs.length; i++) {
        categsSql += `(${prod_cd}, ${dataCategs[i]})`;
        if (i != (dataCategs.length - 1)) {
            categsSql += ', ';
        }
    }
    categsSql += ";";
    const prodSql = "INSERT INTO product (prod_cd, prod_name, prod_unit, prod_total_am, prod_notes, man_id) " +
        "VALUES (?, ?, ?, ?, ?, ?) ;";

    const conn = await db.connection();

    try {
        await conn.beginTransaction()
            //product
        await conn.query(prodSql, dataProduct);
        //belongs_to
        await conn.query(categsSql);
        console.log("Successfully added new product!\n COMMITTING...\n");
        await conn.commit();
    } catch (err) {
        console.log("Error occured while adding new product!\n ROLLBACK...\n" + err.stack);
        await conn.rollback();
    } finally {
        return conn.release();
    }

}


async function updateProductById(prod_cd, dataProduct, dataCategs) {
    console.log("prod cd:");
    console.log(prod_cd);
    console.log("prod data:");
    console.log(dataProduct);
    console.log("categs data:");
    console.log(dataCategs);

    let categsDelSql = "DELETE FROM belongs_to " +
        "WHERE prod_cd = ? ;";

    console.log(categsDelSql);

    let categsInsertSql = "INSERT INTO belongs_to (prod_cd, cat_id)" +
        "VALUES ";
    for (let i = 0; i < dataCategs.length; i++) {
        categsInsertSql += `(${prod_cd},${dataCategs[i]})`;
        if (i != (dataCategs.length - 1)) {
            categsInsertSql += ', ';
        }
    }
    categsInsertSql += ";"

    console.log(categsInsertSql);

    let prodSql = "UPDATE product " +
        "SET prod_name = ?, prod_unit = ?, prod_notes = ?, man_id = ? " +
        "WHERE prod_cd = ";
    prodSql += prod_cd;
    prodSql += " ;";

    console.log(prodSql);
    const conn = await db.connection();

    try {
        await conn.beginTransaction()
            //product
        await conn.query(prodSql, dataProduct);
        //Delete belongs_to
        await conn.query(categsDelSql, prod_cd);
        //Insert belongs_to
        await conn.query(categsInsertSql);

        console.log("Successfully updated the product!\n COMMITTING...\n");
        await conn.commit();
    } catch (err) {
        console.log("Error occured while updating the product!\n ROLLBACK...\n" + err.stack);
        await conn.rollback();
    } finally {
        return conn.release();
    }

}

module.exports = { getAllProducts, getProductsByCategoryId, getProductsByManufId, addNewProduct, updateProductById, getProductById };