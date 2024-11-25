use axum::{
    extract::{Path, Query},
    http::HeaderMap,
    response::Html,
};
use std::collections::HashMap;

pub async fn handler_path(Path(id): Path<u32>) -> Html<String> {
    Html(format!("hi {id}"))
}

pub async fn handler_query(Query(page): Query<HashMap<String, String>>) -> Html<String> {
    Html(format!("hi {page:#?} "))
}

pub async fn handler_header(header: HeaderMap) -> Html<String> {
    Html(format!("hi {header:#?} "))
}
