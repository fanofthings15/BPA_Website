const switchMs = 5000;

let orderSlideshowDots;
let orderSlideshowImgs;
let activeSlide = 0;

const items = {
    "onionRings": {"price": 6, "title": "Onion Rings", "additions": []},
    "wingsBonein": {"price": 6, "title": "Bone-in wings", "additions": ["Plain"]},
    "nachos": {"price": 7, "title": "Nachos", "secondary": ["Cheese"]},
    "cheeseCurds": {"price": 6, "title": "Cheese Curds", "secondary": []},
    "friedPickles": {"price": 5, "title": "Fried Pickles", "secondary": ["Queso Dip"]},
    "softPretzelBites": {"price": 6, "title": "Soft Pretzel Bites", "secondary": ["Queso Dip"]},
    "classicCheeseburger": {"price": 14, "title": "Classic Cheeseburger", "secondary": []},
    "mushroomSwissBurger": {"price": 15, "title": "Mushroom Swiss Burger", "secondary": []},
    "bbqBurger": {"price": 16, "title": "BBQ Burger", "secondary": []}
}

window.onload = () => {
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
            console.log(e.target.id)
        })
    }
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