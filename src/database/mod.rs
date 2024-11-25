use anyhow::Ok;
use sqlx::SqlitePool;

pub async fn init_db() -> anyhow::Result<SqlitePool> {
    let database_url = std::env::var("DATABASE_URL")?;
    let connection_pool = SqlitePool::connect(&database_url).await?;
    sqlx::migrate!().run(&connection_pool).await?;
    Ok(connection_pool)
}
