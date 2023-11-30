const switchMs = 5000;

let dots;
let slideshowImgs;
let activeSlide = 0;

window.onload = () => {
    dots = document.getElementsByClassName("dot");
    slideshowImgs = document.getElementsByClassName("slideshow-img");

    const leftArrow = document.getElementById("left-arrow");
    const rightArrow = document.getElementById("right-arrow");

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
}

const switchSlide = (direction = 1) => {
    const currentSlideshowImg = slideshowImgs[activeSlide];
    const currentDot = dots[activeSlide];

    currentSlideshowImg.classList.remove("active-slideshow-img");
    currentDot.classList.remove("active-dot");

    activeSlide += 1 * direction;

    if (activeSlide > slideshowImgs.length - 1) {
        activeSlide = 0;
    } else if (activeSlide < 0) {
        activeSlide = slideshowImgs.length - 1;
    }

    const newSlideshowImg = slideshowImgs[activeSlide];
    const newDot = dots[activeSlide];

    newSlideshowImg.classList.add("active-slideshow-img");
    newDot.classList.add("active-dot");
}