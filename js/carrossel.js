// carousel.js
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const container = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function setupCarousel() {
    positionItems();
    setActiveItem(currentIndex);
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch navigation
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function positionItems() {
    const radius = 500;
    items.forEach((item, index) => {
        const angle = (360 / totalItems) * index;
        item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
}

function setActiveItem(index) {
    items.forEach((item, i) => {
        item.classList.remove('active');
        const angle = ((360 / totalItems) * (i - index)) % 360;
        if (i === index) {
            item.style.transform = `rotateY(0deg) translateZ(150px) scale(1.2)`;
        } else {
            item.style.transform = `rotateY(${angle}deg) translateZ(0) scale(0.8)`;
        }
    });
    items[index].classList.add('active');
}

function rotateCarousel(direction) {
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % totalItems;
    } else {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }
    setActiveItem(currentIndex);
}

function nextSlide() {
    rotateCarousel('next');
}

function prevSlide() {
    rotateCarousel('prev');
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeLength = touchEndX - touchStartX;

    if (Math.abs(swipeLength) > swipeThreshold) {
        if (swipeLength > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', setupCarousel);