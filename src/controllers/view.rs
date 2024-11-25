use axum::{response::Html, routing::get, Router};

pub fn view_service() -> Router {
    Router::new().route("/", get(handler_html))
}

pub async fn handler_html() -> Html<String> {
    Html("<h2>views page</h2>".to_string())
}
