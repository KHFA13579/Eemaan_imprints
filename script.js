const body = document.querySelector('body'),
    html = document.querySelector('html'),
    navbar = document.querySelector('.navbar'),
    nav = document.querySelector('.nav-menu'),
    menuBar = document.querySelector('.menu-bar'),
    dropContainer = document.querySelector('.drop-container'),
    dropLink = document.querySelector('.drop-container .nav-link'),
    loading = document.querySelector('.loading');
window.onscroll = () => {
    nav.classList.remove('active');
    menuBar.classList.remove('active');
    dropContainer.classList.remove('active');
}
menuBar.onclick = () => {
    menuBar.classList.toggle('active');
    nav.classList.toggle('active');
}
let windowWidth = window.innerWidth;
window.onresize = () => {
    windowWidth = window.innerWidth;
}
setInterval(() => {
    if (window.innerWidth < 951) {
        navbar.classList.add('active');
        dropContainer.onclick = (e) => {
            dropContainer.classList.toggle('active');
        }
    } else {
        window.onscroll = () => {
            this.scrollY > 60 ? navbar.classList.add('active') : navbar.classList.remove('active');
        }
        this.scrollY > 60 ? navbar.classList.add('active') : navbar.classList.remove('active');
    }
}, 100)
window.onresize = () => {
    if (window.innerWidth > 951 && window.scrollY < 20) {
        navbar.classList.remove('active');
    }
}

html.style.overflow = 'hidden';

body.onload = () => {
    html.style.overflowY = 'auto';
    loading.style.display = 'none';
}

let allProducts = []; // To store products globally

// Function to display products
function displayProducts() {
    const productContainer = document.querySelector('.product-container');
    if (!productContainer) return;

    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(products => {
            allProducts = products; // Store products globally
            let productsHTML = '';
            products.forEach(product => {
                productsHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price">Price: ₹${product.price}</p>
                        <button class="buy-now-btn" data-id="${product.id}">Buy Now</button>
                    </div>
                `;
            });
            productContainer.innerHTML = productsHTML;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            const productContainer = document.querySelector('.product-container');
            if(productContainer) {
                productContainer.innerHTML = '<p>Could not load products. Please try again later.</p>';
            }
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', displayProducts);

// =================================
//    Purchase Modal Logic
// =================================

const modal = document.getElementById('purchase-modal');
const closeModalBtn = document.querySelector('.close-btn');
const productContainer = document.querySelector('.product-container');
const purchaseForm = document.getElementById('purchase-form');
const productIdInput = document.getElementById('product-id-input');

function openModal() {
    if (modal) modal.classList.add('show');
}

function closeModal() {
    if (modal) modal.classList.remove('show');
}

if (productContainer) {
    productContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('buy-now-btn')) {
            const productId = e.target.getAttribute('data-id');
            if (productIdInput) {
                productIdInput.value = productId;
            }
            openModal();
        }
    });
}

// Close modal when close button is clicked
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close modal when user clicks outside of the modal content
window.addEventListener('click', function(e) {
    if (e.target == modal) {
        closeModal();
    }
});

// Handle form submission for WhatsApp redirection
if (purchaseForm) {
    purchaseForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // !!! IMPORTANT: Replace this with your own WhatsApp number !!!
        // Use your country code, but do NOT include the '+' sign. For example: 919876543210
        const yourWhatsAppNumber = '919876543210';

        const customerName = document.getElementById('customer-name').value;
        const customerPhone = document.getElementById('customer-phone').value;
        const productId = productIdInput.value;

        const product = allProducts.find(p => p.id == productId);

        if (!product) {
            alert('Something went wrong. Could not find product. Please try again.');
            return;
        }

        const message = `Hello, I'm interested in purchasing this product:\n\n*Product:* ${product.name}\n*Price:* ₹${product.price}\n\n*My Details:*\n*Name:* ${customerName}\n*Phone:* ${customerPhone}`;

        const whatsappUrl = `https://wa.me/${yourWhatsAppNumber}?text=${encodeURIComponent(message)}`;

        // Redirect to WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

        closeModal();
        purchaseForm.reset();
    });
}