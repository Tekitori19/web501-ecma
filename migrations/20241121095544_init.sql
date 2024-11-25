-- Add migration script here

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- INSERT INTO users (email, password) VALUES
-- ('user1@example.com', 'password1'),
-- ('user2@example.com', 'password2'),
-- ('user3@example.com', 'password3');


CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cate_id INTEGER NOT NULL,
    price REAL NOT NULL,
    detail TEXT,
    image TEXT,
    FOREIGN KEY (cate_id) REFERENCES categories(id)
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone_number TEXT NOT NULL,
    created_date TEXT NOT NULL,
    status TEXT NOT NULL
);

CREATE TABLE order_details (
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- Insert sample data into categories
INSERT INTO categories (name) VALUES
('Electronics'),
('Books'),
('Clothing');

-- Insert sample data into products
INSERT INTO products (name, cate_id, price, detail, image) VALUES
('Smartphone', 1, 699.99, 'Latest model smartphone with advanced features', 'smartphone.jpg'),
('Laptop', 1, 999.99, 'High performance laptop', 'laptop.jpg'),
('Novel', 2, 19.99, 'Bestselling novel', 'novel.jpg'),
('T-Shirt', 3, 9.99, 'Comfortable cotton t-shirt', 'tshirt.jpg');

-- Insert sample data into orders
INSERT INTO orders (customer_name, customer_address, customer_email, customer_phone_number, created_date, status) VALUES
('John Doe', '123 Main St', 'john.doe@example.com', '555-1234', '2023-10-01', 'Pending'),
('Jane Smith', '456 Elm St', 'jane.smith@example.com', '555-5678', '2023-10-02', 'Shipped');

-- Insert sample data into order_details
INSERT INTO order_details (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 699.99),
(1, 3, 2, 19.99),
(2, 2, 1, 999.99),
(2, 4, 3, 9.99);
