const itemsData = [
    {
        id: 1,
        name: 'produit 1',
        image:'https://skymil-informatique.com/21407-large_default/redragon-semi-mechanical-centaur-k506.jpg',
        price: 100,
        quantity: 0,
        liked: false,
    },
    {
        id: 2,
        name: 'produit 2',
        image: 'https://www.tunisianet.com.tn/187261-large/casque-gaming-spirit-of-gamer-xpert-h900-MIC-XH900.jpg',
        price: 150,
        quantity: 0,
        liked: true,
    },
    {
        id: 3,
        name: 'produit 3',
        image: 'https://www.wiki.tn/70597-large_mobi_default/pc-gamer-rou3b-1-ryzen-7-3700x-rtx-3070ti-32-g-1tb-.jpg',
        price: 250,
        quantity: 0,
        liked: true,
    },
    {
        id: 4,
        name: 'produit 5',
        image: 'https://www.tryandbuy.tn/15367-medium_default/pc-portable-gamer-msi-gl-75-Leaopard-i5-10e-gen-16go-512-go-ssd-gl7leaopard10ser-281xfr-prix-tunisie.jpg',
        price: 3500,
        quantity: 0,
        liked: true,
    },
    {
        id: 5,
        name: 'produit 5',
        image: 'https://www.cdiscount.com/pdt2/8/8/0/1/400x400/NOL0601057638880/rw/manette-ps4-sans-fil-transparente-led-rgb-10-coule.jpg',
        price: 150,
        quantity: 0,
        liked: true,
    },
    {
        id: 6,
        name: 'produit 6',
        image: 'https://apibackend.megapc.tn//uploads/gallerie/webp/1617632723977.webp',
        price: 1200,
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