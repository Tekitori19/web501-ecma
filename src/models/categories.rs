use crate::types::category::Category;
use anyhow::Result;
use sqlx::SqlitePool;

pub async fn all_categories(connection_pool: &SqlitePool) -> Result<Vec<Category>> {
    Ok(sqlx::query_as::<_, Category>("Select * from Categories")
        .fetch_all(connection_pool)
        .await?)
}
