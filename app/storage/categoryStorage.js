const db = require('./dbexec');

async function getAllCategories() {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query(`SELECT category.cat_id, category.cat_name, category.cat_notes FROM category`);
    conn.release();
    return res;
}

//get all categories of given product
async function getCategoriesByProdCd(cd) {
    // получение объектов
    const conn = await db.connection();
    let res = await conn.query(`SELECT category.cat_id, category.cat_name FROM belongs_to INNER JOIN category ON (category.cat_id = belongs_to.cat_id) WHERE belongs_to.prod_cd = ${cd}`);
    conn.release();
    return res;
}

//cat_notes can be null
async function insertNewCategory(category, products) {
    const conn = await db.connection();
    try {
        await conn.beginTransaction();
        await conn.query("INSERT INTO category (cat_id,cat_name, cat_notes) VALUES(?, ?, ?)", category);

        for (let i = 0; i < products.length; i++) {
            await conn.query(`INSERT INTO belongs_to (prod_cd, cat_id) VALUES(${products[i]}, ${category[0]})`);
        }

        await conn.commit();

        console.log("Successfully added new category and created new belongs_to. COMMITTED...");
    } catch (e) {
        console.log("Error occured while adding new category.\nROLLBACK...\n: " + e.stack);
        await conn.rollback();
        return await conn.release();
    } finally {
        return conn.release();
    }
    
}

//cat_notes can be null
async function updateCategoryById(id, name, notes) {
    const conn = await db.connection();
    const sql = "UPDATE category SET cat_name = ?, cat_notes = ? WHERE cat_id = ?;";
    const data = [name, notes, id];
    let res = await conn.query(sql, data);
    conn.release();
    return res;
}

async function deleteCategoryById(catId) {
    const conn = await db.connection();
    const sql = "DELETE FROM category WHERE cat_id = ?";
    const data = [catId];
    let res = await conn.query(sql, data);
    conn.release();
    return res;
}

module.exports = { getCategoriesByProdCd, insertNewCategory, updateCategoryById, deleteCategoryById, getAllCategories };