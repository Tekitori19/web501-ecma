use anyhow::Ok;
use axum::Router;

mod controllers;
mod database;
mod models;
mod routes;
mod types;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenv::dotenv()?;

    let pool = database::init_db().await?;

    let app = Router::new().merge(routes::router_init(pool));

    let tcp = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();

    println!("Server started at: {}", tcp.local_addr().unwrap());

    axum::serve(tcp, app).await.unwrap();
    Ok(())
}
