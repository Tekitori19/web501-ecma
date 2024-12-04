use crate::types::category::Category;
use anyhow::Result;
use sqlx::SqlitePool;

pub async fn all_categories(connection_pool: &SqlitePool) -> Result<Vec<Category>> {
    Ok(sqlx::query_as::<_, Category>("Select * from Categories")
        .fetch_all(connection_pool)
        .await?)
}

pub async fn insert_categories(connection_pool: &SqlitePool) -> Result<Vec<Category>> {
    Ok(
        sqlx::query_as::<_, Category>("INSERT INTO categories (name) VALUES ('Tên danh mục');")
            .fetch_all(connection_pool)
            .await?,
    )
}

pub async fn update_categories(connection_pool: &SqlitePool) -> Result<Vec<Category>> {
    Ok(
        sqlx::query_as::<_, Category>("UPDATE categories SET name = 'Tên mới' WHERE id = 1;")
            .fetch_all(connection_pool)
            .await?,
    )
}

pub async fn delete_categories(connection_pool: &SqlitePool) -> Result<Vec<Category>> {
    Ok(
        sqlx::query_as::<_, Category>("DELETE FROM categories WHERE id = 1;")
            .fetch_all(connection_pool)
            .await?,
    )
}

// Quan ly don hang
pub async fn insert_product(connection_pool: &SqlitePool, id: i32) -> Result<Category> {
    Ok(
        sqlx::query_as::<_, Category>("INSERT INTO orders (customer_name, customer_address, customer_email, customer_phone_number, created_date, status) 
     VALUES ('Tên khách hàng', 'Địa chỉ', 'Email', 'Số điện thoại', 'Ngày tạo', 'Trạng thái');")
            .bind(id)
            .fetch_one(connection_pool)
            .await?,
    )
}

pub async fn update_product(connection_pool: &SqlitePool, id: i32) -> Result<Category> {
    Ok(
        sqlx::query_as::<_, Category>("UPDATE orders SET status = 'Trạng thái mới' WHERE id = 1;")
            .bind(id)
            .fetch_one(connection_pool)
            .await?,
    )
}

pub async fn delete_product(connection_pool: &SqlitePool, id: i32) -> Result<Category> {
    Ok(
        sqlx::query_as::<_, Category>("DELETE FROM orders WHERE id = 1;")
            .bind(id)
            .fetch_one(connection_pool)
            .await?,
    )
}

// thong ke
pub async fn dashboard_products(connection_pool: &SqlitePool, id: i32) -> Result<Category> {
    Ok(sqlx::query_as::<_, Category>(
        "SELECT product_id, SUM(quantity) AS total_quantity
     FROM order_details
     GROUP BY product_id;",
    )
    .bind(id)
    .fetch_one(connection_pool)
    .await?)
}

pub async fn dashboard_money(connection_pool: &SqlitePool, id: i32) -> Result<Category> {
    Ok(
        sqlx::query_as::<_, Category>("SELECT strftime('%Y-%m', created_date) AS month, SUM(quantity * unit_price) AS total_revenue
     FROM orders
     JOIN order_details ON orders.id = order_details.order_id
     GROUP BY month;")
            .bind(id)
            .fetch_one(connection_pool)
            .await?,
    )
}
