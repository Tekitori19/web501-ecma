use sqlx::FromRow;

#[derive(Debug, FromRow)]
pub struct Products {
    name: String,
    cate_id: i32,
    price: f64,
    detail: String,
    image: String,
}
