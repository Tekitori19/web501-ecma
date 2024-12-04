use anyhow::Result;
use sqlx::sqlite::SqliteRow;
use sqlx::SqlitePool;

#[derive(sqlx::FromRow)]
struct Record {
    name: String,
    total_quantity: i64,
}

pub async fn product(connection_pool: &SqlitePool) -> Result<Vec<Record>, sqlx::Error> {
    let records = sqlx::query_as!(
        Record,
        "
        SELECT 
            p.name,
            SUM(od.quantity) AS total_quantity
        FROM 
            order_details od
        JOIN 
            products p ON od.product_id = p.id
        GROUP BY 
            p.name
        ORDER BY 
            total_quantity DESC;
        "
    )
    .fetch_all(connection_pool)
    .await?;

    Ok(records)
}

// pub async fn money(connection_pool: &SqlitePool) -> Result<Vec<SqliteRow>, sqlx::Error> {
//     Ok(sqlx::query!(
//         "
// SELECT
//     p.product_name,
//     SUM(od.quantity * od.unit_price) AS total_revenue
// FROM
//     order_details od
// JOIN
//     products p ON od.product_id = p.id
// GROUP BY
//     p.product_name
// ORDER BY
//     total_revenue DESC;
// ",
//     )
//     .fetch_all(connection_pool)
//     .await?)
// }
