use crate::types::product::Product;
use anyhow::Result;
use sqlx::SqlitePool;

pub async fn all_products(connection_pool: &SqlitePool) -> Result<Vec<Product>> {
    Ok(sqlx::query_as::<_, Product>("Select * from products")
        .fetch_all(connection_pool)
        .await?)
}

pub async fn products_by_category(connection_pool: &SqlitePool, id: i32) -> Result<Vec<Product>> {
    Ok(
        sqlx::query_as::<_, Product>("SELECT * FROM products WHERE cate_id=$1")
            .bind(id)
            .fetch_all(connection_pool)
            .await?,
    )
}

pub async fn product_by_id(connection_pool: &SqlitePool, id: i32) -> Result<Product> {
    Ok(
        sqlx::query_as::<_, Product>("SELECT * FROM products WHERE id=$1")
            .bind(id)
            .fetch_one(connection_pool)
            .await?,
    )
}
