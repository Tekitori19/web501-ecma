use std::sync::Arc;

use crate::controllers::{handler_header, handler_html, handler_path, handler_query};
use crate::types::MyConfig;
use axum::{routing::get, Router};

pub fn init(config: Arc<MyConfig>) -> Router {
    return Router::new()
        .route("/", get(handler_html))
        .route("/query", get(handler_query))
        .route("/header", get(handler_header))
        .route("/:id", get(handler_path))
        .with_state(config);
}
