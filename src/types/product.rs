use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Product {
    id: i32,
    name: String,
    cate_id: i32,
    price: f64,
    detail: String,
    image: String,
}
