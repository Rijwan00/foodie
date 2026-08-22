// slectidcalsss 

const cartIcon = document.querySelector(".cart-icon");
const cartOrderPartBag = document.querySelector(".cartorderpartbag");
const closeBtn = document.querySelector(".closebtn");

const cartList = document.querySelector(".cartlist");
const cartValue = document.querySelector(".cart-value");
const totalPrice = document.querySelector(".totalprice");


// productdat

let productlist = [];

let cart = [];

const menulist = document.querySelector(".menulist");
// const menulist = document.getElementsByClassName("menulist");
// console.log(menulist.innerText)


// ======================================================
// FETCH PRODUCTS FROM JSON
// ======================================================

const inheritcard = () => {

    fetch("./product.json")

        .then(response => {

            return response.json();
        })

        .then(data => {

            productlist = data;

            console.log("Products:", productlist);

            showCard();
        })

        .catch(error => {

            console.error("Error:", error);

        });

};


// ======================================================
// SHOW PRODUCT CARDS
// ======================================================

const showCard = () => {

    menulist.innerHTML = "";

    productlist.forEach(product => {

        const burger = document.createElement("div");

        burger.classList.add("burger");

        try {
            burger.innerHTML = `
            
            <img 
                src="${product.image}" 
                alt="${product.name}"
            >

            <h3 class="food-caption">
                ${product.name}
            </h3>

            <p class="price">
                $${product.price}
            </p>

            <a 
                href="#" 
                class="cart-btn"
                data-id="${product.id}"
            >
                Add to Cart
            </a>

        `;
        } catch(err) {
            burger.innerHTML = `Errorrr`;
        }

        menulist.appendChild(burger);

    });

};


// ======================================================
// ADD TO CART
// ======================================================

menulist.addEventListener("click", (event) => {

    const button = event.target.closest(".cart-btn");

    if (!button) {
        return;
    }

    event.preventDefault();

    const productId = Number(button.dataset.id);

    addToCart(productId);

});


// ======================================================
// ADD PRODUCT
// ======================================================

const addToCart = (productId) => {

    const product = productlist.find(
        product => Number(product.id) === productId
    );

    if (!product) {
        return;
    }


    const existingProduct = cart.find(
        item => Number(item.id) === productId
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    // Open cart after adding
    cartOrderPartBag.classList.add(
        "cartorderpartbag-active"
    );

};


// ======================================================
// UPDATE CART
// ======================================================

const updateCart = () => {

    showCartItems();

    updateCartCount();

    updateTotal();

};


// ======================================================
// SHOW CART ITEMS
// ======================================================

const showCartItems = () => {

    cartList.innerHTML = "";


    if (cart.length === 0) {

        cartList.innerHTML = `
            <p class="empty-cart">
                Your cart is empty
            </p>
        `;

        return;
    }


    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.classList.add("cartlist");


        cartItem.innerHTML = `

            <div class="cart-item">

                <img 
                    src="${item.image}" 
                    alt="${item.name}"
                >

            </div>


            <div class="itemdetails">

                <h4>
                    ${item.name}
                </h4>

                <h4 class="item-orice">
                    $${item.price}
                </h4>

            </div>


            <div class="itemplusminusbtn">

                <a 
                    href="#"
                    class="minus-btn"
                    data-id="${item.id}"
                >
                    <i class="fa-solid fa-minus"></i>
                </a>


                <h4 class="itemvalue">
                    ${item.quantity}
                </h4>


                <a 
                    href="#"
                    class="plus-btn"
                    data-id="${item.id}"
                >
                    <i class="fa-solid fa-plus"></i>
                </a>

            </div>

        `;


        cartList.appendChild(cartItem);

    });

};


// ======================================================
// PLUS / MINUS BUTTON
// ======================================================

cartList.addEventListener("click", (event) => {

    event.preventDefault();


    const plusButton = event.target.closest(".plus-btn");

    const minusButton = event.target.closest(".minus-btn");


    // PLUS

    if (plusButton) {

        const productId = Number(
            plusButton.dataset.id
        );

        changeQuantity(productId, 1);

    }


    // MINUS

    if (minusButton) {

        const productId = Number(
            minusButton.dataset.id
        );

        changeQuantity(productId, -1);

    }

});


// ======================================================
// CHANGE QUANTITY
// ======================================================

const changeQuantity = (productId, amount) => {

    const product = cart.find(
        item => Number(item.id) === productId
    );


    if (!product) {
        return;
    }


    product.quantity += amount;


    // Remove item if quantity becomes 0

    if (product.quantity <= 0) {

        cart = cart.filter(
            item => Number(item.id) !== productId
        );

    }


    updateCart();

};


// ======================================================
// CART COUNT
// ======================================================

const updateCartCount = () => {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    cartValue.textContent = count;

};


// ======================================================
// TOTAL PRICE
// ======================================================

const updateTotal = () => {

    const total = cart.reduce(

        (total, item) => {

            return total +
                Number(item.price) *
                item.quantity;

        },

        0

    );


    totalPrice.textContent = `$${total.toFixed(2)}`;

};


// ======================================================
// OPEN CART
// ======================================================

cartIcon.addEventListener("click", (event) => {

    event.preventDefault();

    cartOrderPartBag.classList.add(
        "cartorderpartbag-active"
    );

});


// ======================================================
// CLOSE CART
// ======================================================

closeBtn.addEventListener("click", (event) => {

    event.preventDefault();

    cartOrderPartBag.classList.remove(
        "cartorderpartbag-active"
    );

});


// ======================================================
// HAMBURGER MENU
// ======================================================

const Hamburger = document.querySelector(".hamberger");

const mobileMenu = document.querySelector(".mobibe-menu");

const hamburgerBackBtn =
    document.querySelector(".hamburgerbackbtn");


// ======================================================
// OPEN MOBILE MENU
// ======================================================

Hamburger.addEventListener("click", (event) => {

    event.preventDefault();

    mobileMenu.classList.add(
        "mobibe-menu-active"
    );

});


// ======================================================
// CLOSE MOBILE MENU
// ======================================================

hamburgerBackBtn.addEventListener("click", (event) => {

    event.preventDefault();

    mobileMenu.classList.remove(
        "mobibe-menu-active"
    );

});


// ======================================================
// MOBILE MENU LINKS
// ======================================================

const mobileLinks =
    mobileMenu.querySelectorAll("li a");


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove(
            "mobibe-menu-active"
        );

    });

});

// newsletter section file herstar

const emailInput = document.querySelector("#email");

const subscribeBtn =
    document.querySelector(".subscribebtn");


subscribeBtn.addEventListener("click", (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();


    if (email === "") {

        alert("Please enter your email address.");

        return;

    }


    if (!emailInput.checkValidity()) {

        alert("Please enter a valid email address.");

        return;

    }


    alert("Thank you for subscribing!");

    emailInput.value = "";

});


// checkoutbtndetails

const checkoutBtn =
    document.querySelector(".checkoutbtn");


checkoutBtn.addEventListener("click", (event) => {

    event.preventDefault();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    alert("Thank you! Your order is ready for checkout.");

});


// when no link appaer in key that websites behave preventdefault 
const emptyLinks =
    document.querySelectorAll('a[href="#"]');


emptyLinks.forEach(link => {

    link.addEventListener("click", (event) => {

       

        if (
            !link.classList.contains("cart-icon") &&
            !link.classList.contains("closebtn") &&
            !link.classList.contains("checkoutbtn") &&
            !link.classList.contains("subscribebtn") &&
            !link.classList.contains("cart-btn") &&
            !link.classList.contains("plus-btn") &&
            !link.classList.contains("minus-btn") &&
            !link.classList.contains("hamberger") &&
            !link.classList.contains("hamburgerbackbtn")
        ) {

            event.preventDefault();

        }

    });

});


// ===start functioncall 
// ======================================================

inheritcard();