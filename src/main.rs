// use axum::extract::Path;
// use axum::extract::Query;
use axum::{response::Html, routing::get, Router};

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(handler_html));

    let tcp = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();
    println!("Server started at: 127.0.0.1:8080)");

    axum::serve(tcp, app).await.unwrap();
}

async fn handler_html() -> Html<&'static str> {
    Html("<h2>Hi</h2>")
}
