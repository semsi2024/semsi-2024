// Variáveis globais
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const container = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Função para posicionar os itens do carrossel
function positionItems() {
    const radius = 500;
    items.forEach((item, index) => {
        const angle = (360 / totalItems) * index;
        item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
}

// Função para definir o item ativo
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

// Função para mover para o slide anterior
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    setActiveItem(currentIndex);
}

// Função para mover para o próximo slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    setActiveItem(currentIndex);
}

// Função para lidar com o gesto de swipe
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

// Função para configurar o carrossel
function setupCarousel() {
    positionItems();
    setActiveItem(currentIndex);
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Navegação por toque
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

// Inicializar o carrossel quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', setupCarousel);
