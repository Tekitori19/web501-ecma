use axum::{response::Html, routing::get, Router};
use std::fs;
use std::path::Path;
use tower_http::services::ServeDir;

pub fn view_service() -> Router {
    Router::new()
        .route("/", get(handler_html))
        .nest_service("/static", ServeDir::new("frontends"))
}

fn import_html(page_name: &str) -> String {
    let format_path = &format!("frontends/{}.html", page_name);
    let path = Path::new(format_path.as_str());
    fs::read_to_string(path).expect("Unable to read file")
}

pub async fn handler_html() -> Html<String> {
    Html(import_html("index"))
}
