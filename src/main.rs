use std::sync::Arc;

use anyhow::Ok;
use axum::Router;

mod controllers;
mod models;
mod routes;
mod types;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let config = Arc::new(types::MyConfig {
        config_string: "My config string".to_string(),
    });

    dotenv::dotenv()?;
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = sqlx::SqlitePool::connect(&db_url).await.unwrap();

    let users = sqlx::query_as::<_, models::User>("SELECT * FROM users")
        .fetch_all(&pool)
        .await
        .unwrap();

    println!("{:?}", users);

    let app = Router::new().merge(routes::init(config));

    let tcp = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();
    println!("Server started at: {})", tcp.local_addr().unwrap());

    axum::serve(tcp, app).await.unwrap();
    Ok(())
}
