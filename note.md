viết cho tôi nhiều trang html css và vanilla js theo các yêu cầu sau:
Done: xem danh sách sản phẩm
Done: Xem sản phẩm theo danh mục
Done: Xem chi tiết sản phẩm
Done: Thêm sản phẩm vào giỏ hàng
Done: Lọc sản phẩm theo khoảng giá, theo danh mục
Thêm sản phẩm vào giỏ hàng
Thanh toán giỏ hàng
Hiển thị màn hình cảm ơn sau khi thanh toán thành công

đây là khung database theo json-server:

1. categories - id - name 2. products - id - name - cate_id - price - detail - image 3. orders - id - customer_name - customer_address - customer_email - customer_phone_number - created_date - status 4. order_details - order_id - product_id - quantity - unit_price
Trang quản trị
    Quản lý danh mục sản phẩm
    Quản lý đơn hàng
    Thống kê:
        Số lượng sản phẩm được đặt mua 
        Thống kê doanh thu


1. **Quản lý danh mục sản phẩm**:
   - Thêm danh mục sản phẩm:
     ```sql
     INSERT INTO categories (name) VALUES ('Tên danh mục');
     ```

   - Cập nhật danh mục sản phẩm:
     ```sql
     UPDATE categories SET name = 'Tên mới' WHERE id = 1;
     ```

   - Xóa danh mục sản phẩm:
     ```sql
     DELETE FROM categories WHERE id = 1;
     ```

2. **Quản lý đơn hàng**:
   - Thêm đơn hàng:
     ```sql
     INSERT INTO orders (customer_name, customer_address, customer_email, customer_phone_number, created_date, status) 
     VALUES ('Tên khách hàng', 'Địa chỉ', 'Email', 'Số điện thoại', 'Ngày tạo', 'Trạng thái');
     ```

   - Cập nhật đơn hàng:
     ```sql
     UPDATE orders SET status = 'Trạng thái mới' WHERE id = 1;
     ```

   - Xóa đơn hàng:
     ```sql
     DELETE FROM orders WHERE id = 1;
     ```

3. **Thống kê**:
   - Số lượng sản phẩm được đặt mua:
     ```sql
     SELECT product_id, SUM(quantity) AS total_quantity
     FROM order_details
     GROUP BY product_id;
     ```

   - Thống kê doanh thu:
     ```sql
     SELECT strftime('%Y-%m', created_date) AS month, SUM(quantity * unit_price) AS total_revenue
     FROM orders
     JOIN order_details ON orders.id = order_details.order_id
     GROUP BY month;
