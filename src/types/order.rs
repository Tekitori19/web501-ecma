use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Order {
    pub id: i32,
    pub customer_name: String,
    pub customer_address: String,
    pub customer_email: String,
    pub customer_phone_number: String,
    pub created_date: String,
    pub status: String,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct OrderDetail {
    pub order_id: i32,
    pub product_id: i32,
    pub quantity: i32,
    pub unit_price: f32,
}
