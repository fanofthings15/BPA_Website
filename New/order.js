const switchMs = 5000;

let orderSlideshowDots;
let orderSlideshowImgs;
let activeSlide = 0;
let totalPrice = 0;
let checkingOut = false;

const itemData = {
    "onionRings": {"price": 6, "title": "Onion Rings", "additions": []},
    "wingsBonein": {"price": 6, "title": "Bone-in wings", "additions": ["Plain"]},
    "nachos": {"price": 7, "title": "Nachos", "additions": ["Cheese"]},
    "cheeseCurds": {"price": 6, "title": "Cheese Curds", "additions": []},
    "friedPickles": {"price": 5, "title": "Fried Pickles", "additions": ["Queso Dip"]},
    "softPretzelBites": {"price": 6, "title": "Soft Pretzel Bites", "additions": ["Melted Cheese Dip"]},
    "classicCheeseburger": {"price": 14, "title": "Classic Cheeseburger", "additions": []},
    "mushroomSwissBurger": {"price": 15, "title": "Mushroom Swiss Burger", "additions": []},
    "bbqBurger": {"price": 16, "title": "BBQ Burger", "additions": []},
    "sliders": {"price": 12, "title": "Sliders", "additions": ["Plain"]},
    "californiaBurger": {"price": 16, "title": "California Burger", "additions": []},
    "veggieBurger": {"price": 15, "title": "Veggie Burger", "additions": []},
    "kabobs": {"price": 11, "title": "Kabobs", "additions": ["Chicken"]},
    "hotDogs": {"price": 8, "title": "Hot Dogs", "additions": ["Plain"]},
    "porkChops": {"price": 15, "title": "Pork Chops", "additions": ["Mashed Potatoes"]},
    "friedChicken": {"price": 14, "title": "Fried Chicken", "additions": ["Dipping Sauce"]},
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
    "iceCream": {"price": 5, "title": "Ice Cream", "additions": ["Select flavor in-store"]},
    "milkshakes": {"price": 6, "title": "Milkshakes", "additions": ["Whipped Cream", "Sprinkles", "Select flavor in-store"]},
    "hotFudgeBrownie": {"price": 4, "title": "Hot Fudge Brownie", "additions": []},
    "creamPuff": {"price": 5, "title": "Cream Puff", "additions": []},
    "strawberryCheesecake": {"price": 6, "title": "Strawberry Cheesecake", "additions": []},
    "bananaSplit": {"price": 8, "title": "Banana Split", "additions": ["Select flavors in-store"]}
}

const orderList = {};

window.onload = () => {
    const totalPriceElement = document.getElementById("total-price");
    const orderListElement = document.getElementById("order-list");

    orderSlideshowDots = document.getElementById("order-slideshow-dots").children;
    orderSlideshowImgs = document.getElementById("order-slideshow-imgs").children;

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

            let additionsHTML = "";

            const selector = document.getElementById(e.target.id+"Selector");
            if (selector) {
                const selectedElement =
                    selector.children[selector.selectedIndex];

                const selText = selectedElement.innerText;

                additionsHTML += `<span class="sm-text">- ${selText}</span>`;
            }

            for (const addition of item.additions) {
                additionsHTML += `<span class="sm-text">- ${addition}</span>`;
            }

            const itemBoxHTML = `<div class="order-item-box" id="item-${itemId}">
                <div class="order-main-item-info">
                    <span class="md-text">${item.title}</span>
                    ${additionsHTML}
                </div>
                <div class="order-secondary-item-info">
                    <span class="md-text">$${item.price}</span>
                    <span class="symbol item-remove" id="${itemId}">X</span>
                </div>
            </div>`;

            orderListElement.innerHTML += itemBoxHTML;

            totalPrice += item.price;

            totalPriceElement.innerText = `$${totalPrice}`;

            orderList[itemId] = Object.keys(itemData)[Object.values(itemData).indexOf(item)];
        });
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("back-to-top")) {
            const orderingMenu = document.getElementsByClassName(
                "ordering-menu"
            )[0];

            orderingMenu.scrollTop = 0;
        }

        // item remove code
        if (!e.target.classList.contains("item-remove")) {
            return;
        }

        const itemId = e.target.id;

        document.getElementById(`item-${itemId}`).remove();

        const price = itemData[orderList[itemId]].price;

        totalPrice -= price;

        totalPriceElement.innerText = `$${totalPrice}`;

        delete orderList[itemId];
    });

    document.getElementById("checkout-button").addEventListener("click", (e) => {
        localStorage.orderList = orderList;
        localStorage.totalPrice = totalPrice;

        checkingOut = true;

        window.location.replace("/New/checkout.html");
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