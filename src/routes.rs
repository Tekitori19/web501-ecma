use crate::controllers::{rest, view};
use axum::{Extension, Router};
use sqlx::SqlitePool;

pub fn router_init(connection_pool: SqlitePool) -> Router {
    Router::new()
        .nest("/api", rest::rest_service())
        .nest("/", view::view_service())
        .layer(Extension(connection_pool))
}
