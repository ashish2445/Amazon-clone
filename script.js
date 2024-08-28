// JavaScript for Enhanced Amazon Clone

// Dropdown Menu for Account & Lists
document.querySelector('.sign-in').addEventListener('mouseover', function () {
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');
    dropdownMenu.style.position = 'absolute';
    dropdownMenu.style.background = '#fff';
    dropdownMenu.style.border = '1px solid #ccc';
    dropdownMenu.style.padding = '10px';
    dropdownMenu.style.width = '200px';
    dropdownMenu.innerHTML = `
        <a href="#">Your Account</a><br>
        <a href="#">Your Orders</a><br>
        <a href="#">Your Wish List</a><br>
        <a href="#">Sign Out</a>
    `;
    this.appendChild(dropdownMenu);
});

document.querySelector('.sign-in').addEventListener('mouseleave', function () {
    const dropdownMenu = this.querySelector('.dropdown-menu');
    if (dropdownMenu) {
        this.removeChild(dropdownMenu);
    }
});

// Search Functionality with Filtering
document.querySelector('.search-icon').addEventListener('click', function () {
    const searchQuery = document.querySelector('.search-input').value.toLowerCase();
    const productTitles = document.querySelectorAll('.shop-link h3');
    
    if (searchQuery) {
        productTitles.forEach(title => {
            const productCard = title.closest('.shop-link');
            if (title.textContent.toLowerCase().includes(searchQuery)) {
                productCard.style.display = 'block';
            } else {
                productCard.style.display = 'none';
            }
        });
    } else {
        alert('Please enter a search term.');
    }
});

// Cart Functionality with Item Count and View Cart
let cartCount = 0;
let cartItems = [];

document.querySelectorAll('.shop-link a').forEach((link, index) => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const productTitle = this.closest('.shop-link').querySelector('h3').textContent;
        const productImage = this.closest('.shop-link').querySelector('img').src;
        
        cartItems.push({ title: productTitle, image: productImage });
        cartCount++;
        
        document.querySelector('.cart p').textContent = `Cart (${cartCount})`;
        alert(`${productTitle} added to cart`);
    });
});

// Display Cart Items
document.querySelector('.cart').addEventListener('click', function () {
    if (cartItems.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    
    const cartModal = document.createElement('div');
    cartModal.classList.add('cart-modal');
    cartModal.style.position = 'fixed';
    cartModal.style.top = '50%';
    cartModal.style.left = '50%';
    cartModal.style.transform = 'translate(-50%, -50%)';
    cartModal.style.background = '#fff';
    cartModal.style.border = '1px solid #ccc';
    cartModal.style.padding = '20px';
    cartModal.style.zIndex = '1000';
    cartModal.style.width = '300px';
    cartModal.style.height = '400px';
    cartModal.style.overflowY = 'scroll';
    
    const cartList = document.createElement('ul');
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.style.display = 'flex';
        cartItem.style.justifyContent = 'space-between';
        cartItem.style.alignItems = 'center';
        cartItem.style.marginBottom = '10px';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover;">
            <span>${item.title}</span>
            <button data-index="${index}">Remove</button>
        `;
        
        cartList.appendChild(cartItem);
    });
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '20px';
    closeButton.addEventListener('click', function () {
        document.body.removeChild(cartModal);
    });
    
    cartModal.appendChild(cartList);
    cartModal.appendChild(closeButton);
    document.body.appendChild(cartModal);
    
    // Remove item from cart
    cartModal.querySelectorAll('button[data-index]').forEach(button => {
        button.addEventListener('click', function () {
            const itemIndex = this.getAttribute('data-index');
            cartItems.splice(itemIndex, 1);
            cartCount--;
            document.querySelector('.cart p').textContent = `Cart (${cartCount})`;
            document.body.removeChild(cartModal);
            document.querySelector('.cart').click();
        });
    });
});

// Smooth Scrolling for Links
document.querySelectorAll('.navbar a, .banner a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const targetID = this.getAttribute('href').slice(1);
        document.getElementById(targetID).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
