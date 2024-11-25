use crate::types::MyConfig;
use axum::{extract::State, response::Html};
use std::sync::Arc;

pub async fn handler_html(State(config): State<Arc<MyConfig>>) -> Html<String> {
    Html(format!("<h2>{}</h2>", config.config_string))
}
