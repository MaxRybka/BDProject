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

async function addNewOrder(data,order_lines_array){
    const conn = await db.connection();
    try {
        console.log('Begin of transaction');
        await conn.beginTransaction();
        console.log("Insering to order : " + data);
        await conn.query('INSERT INTO mydb.order (ord_id, ord_date, ord_notes, cust_edrpou) VALUES (?, ?, ?, ?)', data);
        let order_line_sql = 'INSERT INTO order_line (prod_cd, ord_id, line_amount, price) VALUES ';

        for (let i = 0; i < order_lines_array.length; i++) {
            let current_ammount = order_lines_array[i].line_amount;
            let bat_amount = 0;
            let ord_amount = 0;

            //get price and amount of product from latest invoice
            do{
                let res = await conn.query(`SELECT MD.prod_cd, IB.inv_id, bat_amount, bat_endprice
                                  FROM (SELECT B.prod_cd, Min(I.inv_date) AS min_date 
                                        FROM invoice AS I INNER JOIN batch AS B ON I.inv_id = B.inv_id 
                                        WHERE B.bat_amount<>0 
                                        GROUP BY B.prod_cd) AS MD, 
                                       (SELECT prod_cd, I1.inv_id, I1.inv_date, bat_amount, bat_endprice 
                                        FROM batch AS B1 LEFT JOIN invoice AS I1 ON I1.inv_id=B1.inv_id) AS IB
                                        WHERE MD.min_date = IB.inv_date 
                                  AND MD.prod_cd = IB.prod_cd AND MD.prod_cd = ${order_lines_array[i].prod_cd};`);
                
                let results = res[0];

                if(results[0].bat_amount >= current_ammount){
                    ord_amount = current_ammount;
                    bat_amount = results[0].bat_amount - current_ammount;
                    current_ammount = 0;
                }
                else{
                    ord_amount = results[0].bat_amount;
                    bat_amount = 0;
                    current_ammount -= results[0].bat_amount;
                }
                //update batch amount to bat_amount value
                await conn.query(`UPDATE batch
                                    SET bat_amount = ${bat_amount}
                                    WHERE prod_cd = ${results[0].prod_cd} AND inv_id=${results[0].inv_id}`);

                //update total_amount of product 
                await conn.query(`UPDATE product
                                    SET prod_total_am = prod_total_am - ${ord_amount}
                                    WHERE prod_cd = ${results[0].prod_cd};`);

                //insert new order_line with price of latest batch
                order_line_sql += `(${order_lines_array[i].prod_cd}, ${data[0]}, ${ord_amount}, ${results[0].bat_endprice})`;
            
                if (i != (order_lines_array.length - 1)) {
                    order_line_sql += ', ';
                }
            }while(current_ammount > 0);
            
        }
        order_line_sql += ';';

        await conn.query(order_line_sql);
        await conn.commit();

        console.log("Successfully added new order and order_lines. COMMITTED...");
    } catch (e) {
        console.log("Error occured while adding new order.\nROLLBACK...\n: " + e.stack);
        await connection.rollback();
        return await connection.release();
    } finally {
        return conn.release();
    }
}

module.exports = { getAllOrders , getOrder , addNewOrder};