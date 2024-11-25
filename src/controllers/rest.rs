use crate::models::products::{all_products, product_by_id, products_by_category};
use crate::types::product::Product;
use axum::{
    extract::{Path, Query},
    http::HeaderMap,
    response::Html,
    Extension, Json,
};
use axum::{routing::get, Router};
use reqwest::StatusCode;
use sqlx::SqlitePool;
use std::collections::HashMap;

pub fn rest_service() -> Router {
    Router::new()
        .route("/query", get(handler_query))
        .route("/header", get(handler_header))
        .route("/:id", get(handler_path))
        .route("/product", get(get_all_products))
        .route("/product/cate/:id", get(get_products_by_category))
        .route("/product/:id", get(get_products_by_id))
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

// pub async fn get_all_products() -> Html<String> {
//     Html("hi".to_string())
// }

async fn get_all_products(
    Extension(connect): Extension<SqlitePool>,
) -> Result<Json<Vec<Product>>, StatusCode> {
    if let Ok(products) = all_products(&connect).await {
        Ok(Json(products))
    } else {
        Err(StatusCode::SERVICE_UNAVAILABLE)
    }
}

async fn get_products_by_category(
    Extension(connect): Extension<SqlitePool>,
    Path(id): Path<i32>,
) -> Result<Json<Vec<Product>>, StatusCode> {
    if let Ok(products) = products_by_category(&connect, id).await {
        Ok(Json(products))
    } else {
        Err(StatusCode::SERVICE_UNAVAILABLE)
    }
}

async fn get_products_by_id(
    Extension(connect): Extension<SqlitePool>,
    Path(id): Path<i32>,
) -> Result<Json<Product>, StatusCode> {
    if let Ok(products) = product_by_id(&connect, id).await {
        Ok(Json(products))
    } else {
        Err(StatusCode::SERVICE_UNAVAILABLE)
    }
}
