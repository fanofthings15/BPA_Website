const switchMs = 5000;

let orderSlideshowDots;
let orderSlideshowImgs;
let activeSlide = 0;
let subtotalPrice = 0;
let taxPrice = 0;
let deliveryPrice = 5;
let totalPrice = 0;
let checkingOut = false;

localStorage.finalPage = "pickup.html";

const itemData = {
    "onionRings": {"price": 6, "title": "Onion Rings", "additions": []},
    "wingsBonein": {"price": 6, "title": "Bone-in wings", "additions": []},
    "nachos": {"price": 7, "title": "Nachos", "additions": ["Cheese"]},
    "cheeseCurds": {"price": 6, "title": "Cheese Curds", "additions": []},
    "friedPickles": {"price": 5, "title": "Fried Pickles", "additions": ["Queso Dip"]},
    "softPretzelBites": {"price": 6, "title": "Soft Pretzel Bites", "additions": ["Melted Cheese Dip"]},
    "classicCheeseburger": {"price": 14, "title": "Classic Cheeseburger", "additions": ["Fries"]},
    "mushroomSwissBurger": {"price": 15, "title": "Mushroom Swiss Burger", "additions": ["Fries"]},
    "bbqBurger": {"price": 16, "title": "BBQ Burger", "additions": ["Fries"]},
    "sliders": {"price": 12, "title": "Sliders", "additions": ["Fries"]},
    "californiaBurger": {"price": 16, "title": "California Burger", "additions": ["Fries"]},
    "veggieBurger": {"price": 15, "title": "Veggie Burger", "additions": ["Sweet Potato Fries"]},
    "kabobs": {"price": 11, "title": "Kabobs", "additions": []},
    "hotDogs": {"price": 8, "title": "Hot Dogs", "additions": []},
    "porkChops": {"price": 15, "title": "Pork Chops", "additions": ["Mashed Potatoes"]},
    "friedChicken": {"price": 14, "title": "Fried Chicken", "additions": []},
    "tacos": {"price": 12, "title": "Tacos", "additions": ["Soup"]},
    "fishAndChips": {"price": 15, "title": "Fish And Chips", "additions": ["Fries"]},
    "wingsBonein": {"price": 6, "title": "Bone-in Wings", "additions": []},
    "wingsBoneless": {"price": 6, "title": "Boneless Wings", "additions": []},
    "wingsCrispy": {"price": 6, "title": "Crispy Wings", "additions": []},
    "arnoldPalmer": {"price": 2, "title": "Arnold Palmer", "additions": []},
    "sparklingFruitPunch": {"price": 4, "title": "Sparkling Fruit Punch", "additions": []},
    "cherryLimeade": {"price": 4, "title": "Cherry Limeade", "additions": []},
    "signatureRootBeer": {"price": 3, "title": "Signature Root Beer", "additions": []},
    "soda": {"price": 2, "title": "Soda Cup", "additions": []},
    "iceCream": {"price": 5, "title": "Ice Cream", "additions": []},
    "milkshakes": {"price": 6, "title": "Milkshakes", "additions": ["Whipped Cream", "Cherry"]},
    "hotFudgeBrownie": {"price": 4, "title": "Hot Fudge Brownie", "additions": []},
    "creamPuff": {"price": 5, "title": "Cream Puff", "additions": []},
    "strawberryCheesecake": {"price": 6, "title": "Strawberry Cheesecake", "additions": []},
    "bananaSplit": {"price": 8, "title": "Banana Split", "additions": []}
}

const orderList = {};

const getElementOrParentWithClass = function(element, className) {
    let elementChecked = element;

    while (elementChecked) {
        if (elementChecked.classList.contains(className)) {
            return elementChecked;
        }

        elementChecked = elementChecked.parentElement;
    }
}

const checkIfInClass = function(element, className) {
    let elementChecked = element;

    while (elementChecked) {
        if (elementChecked.classList.contains(className)) {
            console.log(elementChecked)
            return true;
        }

        elementChecked = elementChecked.parentElement;
    }

    return false;
}

window.onload = () => {
    const subtotalPriceElement = document.getElementById("total-price");
    const mobileTotalElement = document.getElementById("mobile-total");
    const orderListElement = document.getElementById("order-list");
    
    const orderingMenu = document.getElementsByClassName(
        "ordering-menu"
    )[0];

    const orderSidebar = document.getElementsByClassName(
        "order-sidebar"
    )[0];

    const sidebarOpener = document.getElementById("sidebar-opener");

    const sidebarClose = document.getElementById("sidebar-close");

    sidebarOpener.addEventListener("click", (e) => {
        sidebarOpener.style.display = "none";

        orderingMenu.style.display = "none";
        orderSidebar.style.display = "flex";
    });

    sidebarClose.addEventListener("click", (e) => {
        sidebarOpener.style.display = "flex";

        orderingMenu.style.display = "block";
        orderSidebar.style.display = "none";
    });

    orderSlideshowDots = document
        .getElementById("order-slideshow-dots")
        .children;

    orderSlideshowImgs = document
        .getElementById("order-slideshow-imgs")
        .children;

    const leftArrow = document.getElementById("order-slideshow-left-arrow");
    const rightArrow = document.getElementById("order-slideshow-right-arrow");

    let lastChange = new Date().getTime();

    leftArrow.addEventListener("click", (e) => {
        switchSlide(-1);

        lastChange = new Date().getTime();
    });

    rightArrow.addEventListener("click", (e) => {
        switchSlide();

        lastChange = new Date().getTime();
    });

    setInterval(() => {
        const currentTime = new Date().getTime();

        if (currentTime >= lastChange + switchMs) {
            switchSlide();

            lastChange = new Date().getTime();
        }
    }, 100);

    const itemAddButtons = document.getElementsByClassName("item-add");

    for (const itemAddButton of itemAddButtons) {
        itemAddButton.addEventListener("click", (e) => {
            const item = itemData[e.target.id];

            const itemId = String(Math.floor(Math.random() * 999999));

            let additions = JSON.parse(JSON.stringify(item.additions));

            let additionsHTML = "";

            const selector = document.getElementById(e.target.id+"Selector");
            if (selector) {
                const selectedElement =
                    selector.children[selector.selectedIndex];

                // const selText = selectedElement.innerText;

                additions.push(selectedElement.innerText);

                // additionsHTML += `<span class="sm-text">- ${selText}</span>`;
            }

            for (const addition of additions) {
                additionsHTML += `<span class="sm-text">- ${addition}</span>`;
            }

            const itemBoxHTML = `<div class="order-item-box" id="item-${itemId}">
                <div class="order-main-item-info">
                    <span class="md-text">${item.title}</span>
                    ${additionsHTML}
                </div>
                <div class="order-secondary-item-info">
                    <span class="md-text">$${item.price}</span>
                    <img src="imgs/x.webp" class="symbol item-remove sm-symbol" id="${itemId}">
                </div>
            </div>`;

            orderListElement.innerHTML += itemBoxHTML;

            subtotalPrice += item.price;

            // subtotalPrice = subtotalPrice.toFixed(2);

            taxPrice = subtotalPrice * 0.06;

            totalPrice = subtotalPrice + taxPrice;

            subtotalPriceElement.innerText = `$${subtotalPrice}`;
            mobileTotalElement.innerHTML = `$${subtotalPrice}`;

            orderList[itemId] = {"title": item.title,
                                 "price": item.price,
                                 "additions": additions};
        });
    }

    document.getElementById("checkout-button").addEventListener("click",
                                                                (e) => {

        if (subtotalPrice <= 0) return;

        let receiptHTML = "";

        for (const item of Object.values(orderList)) {
            let itemHTML = `<div class="receipt-item">
                <span class="md-text black">${item.title}</span>`;

            for (const addition of item.additions) {
                itemHTML += `<span class="sm-text black">- ${addition}</span>`;
            }

            itemHTML += "</div>";

            receiptHTML += itemHTML;
        }

        document.getElementById("receipt-item-area").innerHTML = receiptHTML;

        document.getElementById("checkout-subtotal").innerText =
            `Subtotal: $${subtotalPrice.toFixed(2)}`;

        document.getElementById("checkout-tax").innerText =
            `Tax: $${taxPrice.toFixed(2)}`;

        document.getElementById("checkout-total").innerText =
            `Total: $${totalPrice.toFixed(2)}`;

        document.getElementById("modal-container").style.display = "flex";
        document.getElementById("order-modal").style.display = "flex";

        return;

        localStorage.orderList = orderList;
        localStorage.subtotalPrice = subtotalPrice;

        checkingOut = true;

        window.location.replace("/New/checkout.html");
    });

    document.getElementById("close-checkout").addEventListener("click",
                                                               (e) => {

        document.getElementById("modal-container").style.display = "none";
        document.getElementById("order-modal").style.display = "none";
    });

    document.addEventListener("click", (e) => {
        // if (e.target.classList.contains("back-to-top")) {
        //     const orderingMenu = document.getElementsByClassName(
        //         "ordering-menu"
        //     )[0];
    
        //     orderingMenu.scrollTop = 0;
        // }

        targetSwitcherOption = getElementOrParentWithClass(e.target,
                                                           "switcher-option");

        if (targetSwitcherOption) {
            const switcherRow = targetSwitcherOption.parentElement;

            for (const child of switcherRow.children) {
                if (child.classList.contains("selected-switcher-option")) {
                    child.classList.remove("selected-switcher-option");
                }
            }

            if (!targetSwitcherOption.classList.contains(
                     "selected-switcher-option")
                 ) {

                targetSwitcherOption.classList.add(
                    "selected-switcher-option"
                );
            }

            if (targetSwitcherOption.children[0].innerText == "Delivery") {
                localStorage.finalPage = "delivery.html";

                totalPrice += deliveryPrice;

                document.getElementById("checkout-delivery").innerText =
                    `Delivery: $${deliveryPrice.toFixed(2)}`;

                document.getElementById("delivery-address").style.display = "block";

                document.getElementById("checkout-pay-local").innerText = "Pay in cash"
            } else {
                localStorage.finalPage = "pickup.html";

                totalPrice -= deliveryPrice;

                document.getElementById("checkout-delivery").innerText =
                    `Delivery: $0.00`;

                document.getElementById("delivery-address").style.display = "none";

                document.getElementById("checkout-pay-local").innerText = "Pay in-store"
            }

            document.getElementById("checkout-total").innerText =
                `Total: $${totalPrice.toFixed(2)}`;
        }
    
        // item remove code
        if (!e.target.classList.contains("item-remove")) {
            return;
        }
    
        const itemId = e.target.id;
    
        document.getElementById(`item-${itemId}`).remove();
    
        const price = orderList[itemId].price;
    
        subtotalPrice -= price;

        // subtotalPrice = subtotalPrice.toFixed(2);

        taxPrice = subtotalPrice * 0.06;

        totalPrice = subtotalPrice + taxPrice;
    
        subtotalPriceElement.innerText = `$${subtotalPrice}`;
        mobileTotalElement.innerHTML = `$${subtotalPrice}`;
    
        delete orderList[itemId];
    });

    document.getElementById("checkout-pay-local").addEventListener("click", (e) => {
        checkingOut = true;

        localStorage.location = document.getElementById("location").value;
        localStorage.address = document.getElementById("delivery-address").value;
        localStorage.totalPrice = totalPrice;

        window.location.replace(localStorage.finalPage);
    });

    document.getElementById("checkout-pay-online").addEventListener("click", (e) => {
        checkingOut = true;

        localStorage.location = document.getElementById("location").value;
        localStorage.address = document.getElementById("delivery-address").value;
        localStorage.totalPrice = totalPrice;

        window.location.replace("pay.html");
    });
}

const switchSlide = (direction = 1) => {
    const currentSlideshowImg = orderSlideshowImgs[activeSlide];
    const currentSlideshowDot = orderSlideshowDots[activeSlide];

    currentSlideshowImg.classList.remove("active-slideshow-img");
    currentSlideshowDot.classList.remove("active-slideshow-dot");

    activeSlide += 1 * direction;

    if (activeSlide > orderSlideshowImgs.length - 1) {
        activeSlide = 0;
    } else if (activeSlide < 0) {
        activeSlide = orderSlideshowImgs.length - 1;
    }

    const newSlideshowImg = orderSlideshowImgs[activeSlide];
    const newSlideshowDot = orderSlideshowDots[activeSlide];

    newSlideshowImg.classList.add("active-slideshow-img");
    newSlideshowDot.classList.add("active-slideshow-dot");
}

window.addEventListener("beforeunload", (e) => {
    console.log(checkingOut, Object.values(orderList).length)
    if (!checkingOut && Object.values(orderList).length > 0) {
        e.returnValue = "You will lose your order if you leave this page!";
    }
});