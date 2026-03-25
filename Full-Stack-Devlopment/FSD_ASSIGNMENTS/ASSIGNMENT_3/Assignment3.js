// Products Data
let products = [
    { id: 1, name: "Oversized Cotton Hoodie", category: "men", price: 1299, oldPrice: 2499, discount: 48, img: "https://picsum.photos/id/1015/600/600", rating: 4.3, reviews: 1245, desc: "Ultra soft cotton blend perfect for casual wear" },
    { id: 2, name: "Floral Print Summer Dress", category: "women", price: 899, oldPrice: 2299, discount: 61, img: "https://picsum.photos/id/1005/600/600", rating: 4.6, reviews: 892, desc: "Light and breezy fabric for summer days" },
    { id: 3, name: "Premium Running Shoes", category: "footwear", price: 2199, oldPrice: 3999, discount: 45, img: "https://picsum.photos/id/160/600/600", rating: 4.4, reviews: 2156, desc: "Breathable mesh with excellent cushioning" },
    { id: 4, name: "Kids Denim Jacket", category: "kids", price: 799, oldPrice: 1599, discount: 50, img: "https://picsum.photos/id/201/600/600", rating: 4.7, reviews: 634, desc: "Stylish and durable for everyday use" },
    { id: 5, name: "Slim Fit Formal Shirt", category: "men", price: 999, oldPrice: 1999, discount: 50, img: "https://picsum.photos/id/1009/600/600", rating: 4.2, reviews: 1456, desc: "Premium cotton with wrinkle-free finish" },
    { id: 6, name: "Embroidered Kurti Set", category: "ethnic", price: 1499, oldPrice: 2999, discount: 50, img: "https://picsum.photos/id/133/600/600", rating: 4.5, reviews: 789, desc: "Beautiful ethnic wear for festivals" },
    { id: 7, name: "Chunky Sneakers", category: "footwear", price: 1799, oldPrice: 3499, discount: 49, img: "https://picsum.photos/id/1003/600/600", rating: 4.1, reviews: 923, desc: "Trendy street style sneakers" },
    { id: 8, name: "Warm Puffer Jacket", category: "winter", price: 2499, oldPrice: 4999, discount: 50, img: "https://picsum.photos/id/866/600/600", rating: 4.4, reviews: 567, desc: "Perfect for cold weather" }
];

let cart = [];

// Render Products
function renderProducts(filteredProducts) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    filteredProducts.forEach(product => {
        const html = `
        <div class="col-6 col-md-4 col-lg-3 col-xl-2">
            <div class="product-card h-100 position-relative" onclick="viewProduct(${product.id})">
                <img src="${product.img}" class="product-img w-100" alt="${product.name}">
                <div class="discount-badge">${product.discount}% OFF</div>
                <div class="p-3">
                    <h6 class="mb-2 text-truncate">${product.name}</h6>
                    <div class="d-flex align-items-center gap-2">
                        <span class="price">₹${product.price}</span>
                        <span class="old-price">₹${product.oldPrice}</span>
                    </div>
                    <div class="d-flex align-items-center gap-2 mt-2">
                        <span class="rating">${product.rating} ★</span>
                        <span class="small text-muted">(${product.reviews})</span>
                    </div>
                </div>
            </div>
        </div>`;
        grid.innerHTML += html;
    });
}

// View Product in Modal
function viewProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modalImage').src = product.img;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalBrand').textContent = "Fashion Store";
    document.getElementById('modalPrice').textContent = `₹${product.price}`;
    document.getElementById('modalOldPrice').textContent = `₹${product.oldPrice}`;
    document.getElementById('modalDiscount').textContent = `${product.discount}% off`;
    document.getElementById('modalRating').textContent = `${product.rating} ★`;
    document.getElementById('modalReviews').textContent = `(${product.reviews} ratings)`;
    document.getElementById('modalDesc').textContent = product.desc;

    new bootstrap.Modal(document.getElementById('productModal')).show();
}

// Add Current Product to Cart
function addCurrentToCart() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    if (modal) modal.hide();
    if (products.length > 0) addToCart(products[0]);
}

// Add to Cart
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    showToast(`${product.name} added to cart ✓`);
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById('cartCount').textContent = count;
}

// Show Cart
function showCart() {
    const body = document.getElementById('cartBody');
    body.innerHTML = '';

    if (cart.length === 0) {
        body.innerHTML = `<div class="text-center py-5"><h5>Your cart is empty</h5><p>Browse our collection and add items</p></div>`;
        document.getElementById('cartTotal').textContent = '₹0';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const qty = item.quantity || 1;
        const itemTotal = item.price * qty;
        total += itemTotal;

        body.innerHTML += `
        <div class="d-flex mb-4 align-items-center">
            <img src="${item.img}" width="70" height="70" class="rounded" style="object-fit:cover">
            <div class="ms-3 flex-grow-1">
                <h6 class="mb-1">${item.name}</h6>
                <small>₹${item.price} × ${qty}</small>
                <div class="mt-2">
                    <button onclick="changeQty(${index}, -1)" class="btn btn-sm btn-outline-secondary">-</button>
                    <span class="mx-3">${qty}</span>
                    <button onclick="changeQty(${index}, 1)" class="btn btn-sm btn-outline-secondary">+</button>
                </div>
            </div>
            <div class="text-end">
                <div class="price">₹${itemTotal}</div>
                <button onclick="removeFromCart(${index})" class="btn btn-link text-danger mt-2"><i class="fas fa-trash"></i></button>
            </div>
        </div>`;
    });

    document.getElementById('offcanvasCartCount').textContent = cart.length;
    document.getElementById('cartTotal').textContent = `₹${total}`;
    
    new bootstrap.Offcanvas(document.getElementById('cartOffcanvas')).show();
}

function changeQty(index, delta) {
    if (!cart[index]) return;
    cart[index].quantity = Math.max(1, (cart[index].quantity || 1) + delta);
    showCart();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) return;
    alert("🎉 Thank you for shopping at Fashion Store!\n\nThis is a Full Stack Development demo.");
    cart = [];
    updateCartCount();
    bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas')).hide();
}

function showToast(message) {
    const toastHTML = `
    <div class="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3" role="alert">
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    </div>`;
    const container = document.createElement('div');
    container.innerHTML = toastHTML;
    document.body.appendChild(container.firstElementChild);
    const toast = new bootstrap.Toast(container.querySelector('.toast'));
    toast.show();
    setTimeout(() => container.remove(), 3000);
}

// Filter Products
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const sortType = document.getElementById('sortSelect').value;

    let filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    if (sortType === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortType === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sortType === 'discount') filtered.sort((a, b) => b.discount - a.discount);

    renderProducts(filtered);
}

function filterByCategory(cat) {
    document.querySelectorAll('.category-chip').forEach(chip => chip.classList.remove('active'));
    
    if (cat === 'all') {
        document.getElementById('cat-all').classList.add('active');
        document.getElementById('sectionTitle').textContent = 'Trending This Season';
        renderProducts(products);
        return;
    }
    
    document.getElementById(`cat-${cat}`).classList.add('active');
    
    const filtered = products.filter(p => p.category === cat);
    renderProducts(filtered);
    
    const titles = {
        men: "Men's Collection",
        women: "Women's Collection",
        kids: "Kids Fashion",
        footwear: "Footwear",
        ethnic: "Ethnic Wear",
        winter: "Winter Collection"
    };
    document.getElementById('sectionTitle').textContent = titles[cat] || "Collection";
}

function showWishlist() {
    alert("❤️ Wishlist feature coming soon!\n\n(Full Stack Development Demo)");
}

// Initialize
window.onload = function() {
    renderProducts(products);
    console.log('%c✅ Fashion Store loaded successfully!', 'color:#e91e63; font-size:16px; font-weight:bold');
};
