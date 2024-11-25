use std::sync::Arc;

use crate::controllers::{
    rest::{handler_header, handler_path, handler_query},
    serve_static::handler_html,
};
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
