use crate::types::MyConfig;
use axum::{
    extract::{Path, Query, State},
    http::HeaderMap,
    response::Html,
};
use std::{collections::HashMap, sync::Arc};

pub async fn handler_html(State(config): State<Arc<MyConfig>>) -> Html<String> {
    Html(format!("<h2>{}</h2>", config.config_string))
}

pub async fn handler_path(Path(id): Path<u32>) -> Html<String> {
    Html(format!("hi {id}"))
}

pub async fn handler_query(Query(page): Query<HashMap<String, String>>) -> Html<String> {
    Html(format!("hi {page:#?} "))
}

pub async fn handler_header(header: HeaderMap) -> Html<String> {
    Html(format!("hi {header:#?} "))
}
