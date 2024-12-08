use anyhow::Ok;
use axum::{
    http::{HeaderValue, Method},
    Router,
};

mod controllers;
mod database;
mod models;
mod routes;
mod types;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenv::dotenv()?;

    let pool = database::init_db().await?;

    let app = Router::new().merge(routes::router_init(pool)).layer(
        CorsLayer::new()
            .allow_origin("localhost:5500".parse::<HeaderValue>().unwrap())
            .allow_origin("http://127.0.0.1:5500".parse::<HeaderValue>().unwrap())
            .allow_origin("localhost:8080".parse::<HeaderValue>().unwrap())
            .allow_origin("http://127.0.0.1:8080".parse::<HeaderValue>().unwrap())
            .allow_methods([Method::GET])
            .allow_headers(Any),
    );

    let tcp = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();

    println!("Server started at: {}", tcp.local_addr().unwrap());

    axum::serve(tcp, app).await.unwrap();
    Ok(())
}
