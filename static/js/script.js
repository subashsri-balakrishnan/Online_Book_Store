
"use strict";

// ========================================
// BOOKNEST SHOPPING CART
// ========================================

let cart = [];

try {
    const savedCart = JSON.parse(
        localStorage.getItem("bookNestCart") || "[]"
    );

    if (Array.isArray(savedCart)) {
        cart = savedCart.filter(function(item) {
            return item &&
                typeof item.name === "string" &&
                Number.isFinite(item.price) &&
                item.price > 0 &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0;
        });
    }
} catch (error) {
    cart = [];
}

function saveCart() {
    try {
        localStorage.setItem("bookNestCart", JSON.stringify(cart));
    } catch (error) {
        console.error("Could not save cart:", error);
    }

    renderCart();
}

// ========================================
// ADD BOOK TO CART
// ========================================

function addToCart(bookName) {
    const cards = document.querySelectorAll(".book-card");
    let price = 0;

    cards.forEach(function(card) {
        const title = card.querySelector("h3");
        const priceElement = card.querySelector(".book-bottom strong");

        if (
            title &&
            priceElement &&
            title.textContent.trim() === bookName
        ) {
            price = Number(
                priceElement.textContent.replace(/[^\d.]/g, "")
            );
        }
    });

    if (!Number.isFinite(price) || price <= 0) {
        alert("Sorry, the book price could not be found.");
        return;
    }

    const existing = cart.find(function(item) {
        return item.name === bookName;
    });

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: bookName,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    alert('"' + bookName + '" added to your cart!');
}

// ========================================
// DISPLAY CART
// ========================================

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartItemCount = document.getElementById("cartItemCount");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartCount || !cartItemCount || !cartTotal) {
        return;
    }

    const totalQuantity = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    const totalPrice = cart.reduce(function(total, item) {
        return total + item.price * item.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;
    cartItemCount.textContent = totalQuantity;
    cartTotal.textContent = "₹" + totalPrice.toLocaleString("en-IN");

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty. Explore our books!</p>';
        return;
    }

    cartItems.innerHTML = cart.map(function(item, index) {
        return `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h3>${escapeHTML(item.name)}</h3>
                    <p>Price: ₹${item.price.toLocaleString("en-IN")}</p>
                    <p>Subtotal: ₹${(item.price * item.quantity).toLocaleString("en-IN")}</p>
                </div>

                <div class="quantity-controls">
                    <button type="button"
                        aria-label="Decrease quantity"
                        onclick="changeQuantity(${index}, -1)">−</button>

                    <span>${item.quantity}</span>

                    <button type="button"
                        aria-label="Increase quantity"
                        onclick="changeQuantity(${index}, 1)">+</button>
                </div>

                <button type="button" class="remove-button"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    }).join("");
}

// Escape book names before inserting them into HTML.
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function(character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

// ========================================
// CHANGE QUANTITY
// ========================================

function changeQuantity(index, amount) {
    if (!cart[index]) {
        return;
    }

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
}

// ========================================
// REMOVE BOOK
// ========================================

function removeFromCart(index) {
    if (index < 0 || index >= cart.length) {
        return;
    }

    cart.splice(index, 1);
    saveCart();
}

// ========================================
// CLEAR CART
// ========================================

function clearCart() {
    if (cart.length === 0) {
        alert("Your cart is already empty.");
        return;
    }

    if (confirm("Are you sure you want to remove all books?")) {
        cart = [];
        saveCart();
    }
}

// ========================================
// OPEN / CLOSE CART
// ========================================

function toggleCart() {
    const section = document.getElementById("cartSection");

    if (!section) {
        return;
    }

    section.hidden = !section.hidden;

    if (!section.hidden) {
        renderCart();
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// ========================================
// CHECKOUT DEMO
// ========================================

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add a book first.");
        return;
    }

    const total = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    alert(
        "Order Summary\n\n" +
        "Total books: " +
        cart.reduce(function(sum, item) {
            return sum + item.quantity;
        }, 0) +
        "\nTotal amount: ₹" +
        total.toLocaleString("en-IN") +
        "\n\nCheckout demo only. No payment has been made."
    );
}

// ========================================
// BOOK SEARCH
// ========================================

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("bookSearch");
    const searchButton = document.getElementById("searchButton");
    const searchMessage = document.getElementById("searchMessage");

    if (searchInput && searchButton && searchMessage) {
        function searchBooks() {
            const query = searchInput.value.trim().toLowerCase();
            const books = document.querySelectorAll(".book-card");
            let visibleCount = 0;

            books.forEach(function(book) {
                const text = book.textContent.toLowerCase();
                const matches = query === "" || text.includes(query);

                book.style.display = matches ? "" : "none";

                if (matches) {
                    visibleCount++;
                }
            });

            if (query === "") {
                searchMessage.textContent = "Showing all books.";
            } else if (visibleCount === 0) {
                searchMessage.textContent =
                    'No books found for "' +
                    searchInput.value.trim() +
                    '". Try another title or author.';
            } else {
                searchMessage.textContent =
                    visibleCount + " book(s) found.";
            }
        }

        searchButton.addEventListener("click", searchBooks);

        searchInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                searchBooks();
            }
        });
    }

    renderCart();
    console.log("BookNest JavaScript loaded successfully!");
});