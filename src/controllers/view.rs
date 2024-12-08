use axum::{response::Html, routing::get, Router};
use std::fs;
use std::path::Path;
use tower_http::services::ServeDir;

pub fn view_service() -> Router {
    Router::new()
        .route("/", get(index))
        .route("/admin", get(dashboard))
        .nest_service("/static", ServeDir::new("frontends"))
        .nest_service("/static-admin", ServeDir::new("admin"))
}

fn import_html(path_name: &str, page_name: &str) -> String {
    let format_path = &format!("{}/{}.html", path_name, page_name);
    let path = Path::new(format_path.as_str());
    fs::read_to_string(path).expect("Unable to read file")
}

pub async fn index() -> Html<String> {
    Html(import_html("frontends", "index"))
}

pub async fn dashboard() -> Html<String> {
    Html(import_html("admin", "admin-dashboard"))
}
