const itemsData = [
    {
        id: 1,
        name: 'produit 1',
        image:'1.png',
        price: 800,
        quantity: 0,
        liked: false,
    },
    {
        id: 2,
        name: 'produit 2',
        image: 'carte.jpeg',
        price: 950,
        quantity: 0,
        liked: true,
    },
    {
        id: 3,
        name: 'produit 3',
        image: 'casque.jpeg',
        price: 750,
        quantity: 0,
        liked: true,
    },
    {
        id: 4,
        name: 'produit 5',
        image: 'gamer.jpeg',
        price: 15,
        quantity: 0,
        liked: true,
    },
    {
        id: 5,
        name: 'produit 5',
        image: 'materiels',
        price: 20,
        quantity: 0,
        liked: true,
    },
    {
        id: 6,
        name: 'produit 6',
        image: 'clavier.jpeg',
        price: 20,
        quantity: 0,
        liked: true,
    },
    // Add more items as needed
];

// Function to render the item cards in the cart
function renderItems() {
    const itemsContainer = document.querySelector('.items');
    itemsContainer.innerHTML = '';

    itemsData.forEach((item) => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <div class="quantity">
                <button class="minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="plus" data-id="${item.id}">+</button>
            </div>
            <p class="price">$${item.price * item.quantity}</p>
            <span class="heart-icon ${item.liked ? 'liked' : ''}" data-id="${item.id}">&hearts;</span>
            <button class="delete" data-id="${item.id}">Delete</button>
        `;

        itemsContainer.appendChild(itemCard);
    });
}

// Function to update the total price
function updateTotalPrice() {
    const totalPriceSpan = document.getElementById('totalPrice');
    const totalPrice = itemsData.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalPriceSpan.textContent = `$${totalPrice}`;
}

// Event listeners for +, - buttons, like button, and delete button
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('plus')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        const item = itemsData.find((item) => item.id === itemId);
        item.quantity += 1;
        renderItems();
        updateTotalPrice();
    }

    if (event.target.classList.contains('minus')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        const item = itemsData.find((item) => item.id === itemId);
        if (item.quantity > 1) {
            item.quantity -= 1;
            renderItems();
            updateTotalPrice();
        }
    }

    if (event.target.classList.contains('heart-icon')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        const item = itemsData.find((item) => item.id === itemId);
        item.liked = !item.liked;
        renderItems();
    }

    if (event.target.classList.contains('delete')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        itemsData = itemsData.filter((item) => item.id !== itemId);
        renderItems();
        updateTotalPrice();
    }
});

// Initial rendering
renderItems();
updateTotalPrice();