// API Base URL (assuming json-server)
const API_URL = 'http://localhost:3000';

// State Management
let categories = [];
let products = [];
let orders = [];

// UI Section Management
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Load data based on section
    switch (sectionId) {
        case 'categories':
            loadCategories();
            break;
        case 'products':
            loadCategories(); // Load categories first for dropdown
            loadProducts();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'stats':
            loadStatistics();
            break;
    }
}

// Category Management
async function loadCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`);
        categories = await response.json();
        renderCategories();
        populateProductCategoryDropdown(); // Update product category dropdown
    } catch (error) {
        console.error('Lỗi tải danh mục:', error);
        alert('Không thể tải danh mục. Vui lòng kiểm tra kết nối.');
    }
}

function renderCategories() {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = categories.map(category => `
        <div class="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded">
            <span>${category.name}</span>
            <div>
                <button onclick="prepareEditCategory('${category.id}')" class="text-blue-500 mr-2">Sửa</button>
                <button onclick="deleteCategory('${category.id}')" class="text-red-500">Xóa</button>
            </div>
        </div>
    `).join('');
}

// Hàm chuẩn bị sửa danh mục
function prepareEditCategory(categoryId) {
    // Tìm danh mục theo ID
    const categoryToEdit = categories.find(cat => cat.id.toString() === categoryId.toString());

    if (categoryToEdit) {
        // Điền thông tin vào form
        document.getElementById('categoryName').value = categoryToEdit.name;
        document.getElementById('categoryId').value = categoryToEdit.id;
    } else {
        alert('Không tìm thấy danh mục để sửa');
    }
}

// Hàm thêm/sửa danh mục
async function addCategory(event) {
    event.preventDefault();

    const categoryName = document.getElementById('categoryName').value.trim();
    const categoryId = document.getElementById('categoryId').value;

    // Kiểm tra tính hợp lệ
    if (!categoryName) {
        alert('Vui lòng nhập tên danh mục');
        return;
    }

    try {
        // Xác định phương thức (thêm mới hoặc cập nhật)
        const method = categoryId ? 'PUT' : 'POST';
        const url = categoryId
            ? `${API_URL}/categories/${categoryId}`
            : `${API_URL}/categories`;

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: categoryId ? parseInt(categoryId) : undefined,
                name: categoryName
            })
        });

        if (!response.ok) {
            throw new Error('Lỗi khi lưu danh mục');
        }

        // Làm mới danh sách danh mục
        await loadCategories();

        // Reset form
        document.getElementById('categoryForm').reset();
        document.getElementById('categoryId').value = '';

    } catch (error) {
        console.error('Lỗi khi lưu danh mục:', error);
        alert('Không thể lưu danh mục. Vui lòng thử lại.');
    }
}

// Hàm xóa danh mục
async function deleteCategory(categoryId) {
    if (!confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;

    try {
        const response = await fetch(`${API_URL}/categories/${categoryId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Không thể xóa danh mục');
        }

        // Làm mới danh sách danh mục
        await loadCategories();

    } catch (error) {
        console.error('Lỗi khi xóa danh mục:', error);
        alert('Không thể xóa danh mục. Có thể do danh mục đang được sử dụng.');
    }
}

// Product Management
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(product => `
        <div class="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded">
            <div>
                <span class="font-bold">${product.name}</span>
                <span class="text-gray-600 ml-2">$${product.price}</span>
            </div>
            <div>
                <button onclick="editProduct('${product.id}')" class="text-blue-500 mr-2">Sửa</button>
                <button onclick="deleteProduct('${product.id}')" class="text-red-500">Xóa</button>
            </div>
        </div>
    `).join('');
}

function populateProductCategoryDropdown() {
    const categorySelect = document.getElementById('productCategory');
    categorySelect.innerHTML = categories.map(category => `
        <option value="${category.id}">${category.name}</option>
    `).join('');
}

async function addProduct(event) {
    event.preventDefault();
    const productId = document.getElementById('productId').value;
    const productData = {
        categoryId: document.getElementById('productCategory').value,
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value
    };

    if (!productData.name || !productData.price) {
        alert('Vui lòng nhập đầy đủ thông tin sản phẩm');
        return;
    }

    const method = productId ? 'PUT' : 'POST';
    const url = productId
        ? `${API_URL}/products/${productId}`
        : `${API_URL}/products`;

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...productData,
                id: productId ? parseInt(productId) : undefined
            })
        });

        if (!response.ok) {
            throw new Error('Không thể lưu sản phẩm');
        }

        loadProducts();
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = ''; // Clear hidden ID
    } catch (error) {
        console.error('Error saving product:', error);
        alert(error.message);
    }
}

function editProduct(id) {
    // Convert id to string to ensure correct comparison
    const product = products.find(p => p.id.toString() === id.toString());
    if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productCategory').value = product.categoryId;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productImage').value = product.image;
    }
}

async function deleteProduct(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
        const response = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error('Không thể xóa sản phẩm');
        }

        loadProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        alert(error.message);
    }
}

// Orders Management
async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/orders`);
        orders = await response.json();
        renderOrders();
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

function renderOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = orders.map(order => `
        <div class="bg-gray-100 p-3 mb-2 rounded">
            <div class="flex justify-between">
                <span>Đơn hàng #${order.id}</span>
                <span>Tổng: $${order.total}</span>
            </div>
            <div>
                <strong>Sản phẩm:</strong>
                ${order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
            </div>
        </div>
    `).join('');
}

// Statistics
function loadStatistics() {
    // Product Sales Chart
    const productSalesCtx = document.getElementById('productSalesChart').getContext('2d');
    new Chart(productSalesCtx, {
        type: 'bar',
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                label: 'Số lượng bán',
                data: products.map(() => Math.floor(Math.random() * 100)),
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        }
    });

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
            datasets: [{
                label: 'Doanh thu',
                data: [1200, 1900, 3000, 5000, 8000, 12000],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }]
        }
    });
}

// Event Listeners
document.getElementById('categoryForm').addEventListener('submit', addCategory);
document.getElementById('productForm').addEventListener('submit', addProduct);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    showSection('categories');
});
