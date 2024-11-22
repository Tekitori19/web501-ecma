use sqlx::FromRow;

#[derive(Debug, FromRow)]
pub struct User {
    // #[allow(dead_code)]
    email: String,
    // #[allow(dead_code)]
    password: String,
}
