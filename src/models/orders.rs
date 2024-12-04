use crate::types::order::Order;
use anyhow::Result;
use sqlx::SqlitePool;

pub async fn all_orders(connection_pool: &SqlitePool) -> Result<Vec<Order>> {
    Ok(sqlx::query_as::<_, Order>("Select * from orders")
        .fetch_all(connection_pool)
        .await?)
}
