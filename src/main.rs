use std::sync::Arc;

use anyhow::Ok;
use axum::routing::get;
use axum::Router;

mod controllers;
mod models;
mod routes;
mod types;

// struct MyConfig {
//     config_string: String,
// }

// #[derive(Debug, FromRow)]
// struct User {
//     #[allow(dead_code)]
//     email: String,
//     #[allow(dead_code)]
//     password: String,
// }

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

    // let app = Router::new()
    //     .route("/", get(handler_html))
    //     .route("/query", get(handler_query))
    //     .route("/header", get(handler_header))
    //     .route("/:id", get(handler_path))
    //     .with_state(config);

    let tcp = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();
    println!("Server started at: {})", tcp.local_addr().unwrap());

    axum::serve(tcp, app).await.unwrap();
    Ok(())
}

// async fn handler_html(State(config): State<Arc<MyConfig>>) -> Html<String> {
//     Html(format!("<h2>{}</h2>", config.config_string))
// }
//
// async fn handler_path(Path(id): Path<u32>) -> Html<String> {
//     Html(format!("hi {id}"))
// }
//
// async fn handler_query(Query(page): Query<HashMap<String, String>>) -> Html<String> {
//     Html(format!("hi {page:#?} "))
// }
//
// async fn handler_header(header: HeaderMap) -> Html<String> {
//     Html(format!("hi {header:#?} "))
// }
