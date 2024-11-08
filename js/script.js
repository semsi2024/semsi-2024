// DOM Elements
const nav = document.querySelector('.main-nav');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('backToTop');
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-container');
const showSpeakersBtn = document.getElementById('showSpeakers');
const speakersPopup = document.getElementById('speakersPopup');
const closePopupBtn = document.getElementById('closePopup');
const speakerImages = document.querySelectorAll('.speaker-images img');

// Apply styles
const styles = `
    .main-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.95);
    }

    .nav-links {
        display: flex;
        gap: 2rem;
    }

    .nav-links.active {
        transform: translateX(0);
    }

    #backToTop {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;
    }

    #backToTop.visible {
        opacity: 1;
    }

    .stats-container {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .stats-container.visible {
        opacity: 1;
        transform: translateY(0);
    }

    #speakersPopup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1100;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .popup-image {
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
    }

    #closePopup {
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        font-size: 30px;
        cursor: pointer;
        background: none;
        border: none;
        padding: 10px;
    }

    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 60px;
            right: -100%;
            background: white;
            flex-direction: column;
            width: 80%;
            height: calc(100vh - 60px);
            padding: 2rem;
            transition: transform 0.3s ease-in-out;
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        }

        .nav-links.active {
            right: 0;
        }
    }
`;

// Create and append style element
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Mobile Menu Toggle
const toggleMobileMenu = () => {
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
};

// Navbar Scroll Effect
const handleNavbarScroll = () => {
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = 'none';
            }
        });
    }
};

// Smooth Scroll for Anchor Links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
};

// Back to Top Button
const initBackToTop = () => {
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.classList.remove('visible');
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// Stats Animation
const animateStats = () => {
    if (!stats.length) return;

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const steps = 60;
        const stepValue = target / steps;
        let current = 0;
        let step = 0;

        const updateCount = () => {
            if (step < steps) {
                current += stepValue;
                stat.textContent = Math.round(current);
                step++;
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });
};

// Intersection Observer for Stats
const initStatsObserver = () => {
    if (statsSection) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(statsSection);
                }
            });
        }, observerOptions);

        statsObserver.observe(statsSection);
    }
};

// Popup Functionality
const initPopup = () => {
    const speakersPopup = document.getElementById('speakersPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const speakerImages = document.querySelectorAll('.speaker-images img');
    const closeFullscreenBtn = document.querySelector('.close-fullscreen');
    const fullscreenPopup = document.getElementById('fullscreenPopup');
    const fullscreenImage = document.querySelector('.fullscreen-image');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentImageIndex = 0;  // Índice da imagem atual

    // Função para abrir a imagem em tela cheia
    const openFullscreen = (index) => {
        currentImageIndex = index;
        const imgSrc = speakerImages[index].src;
        fullscreenImage.src = imgSrc;
        fullscreenPopup.style.display = 'flex'; // Exibe a popup da imagem
        speakersPopup.style.display = 'none'; // Esconde a popup de palestrantes
        document.body.style.overflow = 'hidden'; // Desabilita o scroll
    };

    // Função para fechar a tela cheia e voltar para a popup de palestrantes
    const closeFullscreen = () => {
        fullscreenPopup.style.display = 'none'; // Esconde a popup de tela cheia
        speakersPopup.style.display = 'flex'; // Exibe a popup de palestrantes
        document.body.style.overflow = ''; // Habilita o scroll novamente
    };

    // Adiciona evento de clique em cada imagem da galeria para abrir a imagem em tela cheia
    speakerImages.forEach((img, index) => {
        img.addEventListener('click', () => openFullscreen(index));
    });

    // Funcionalidade do botão de fechar na tela cheia
    closeFullscreenBtn.addEventListener('click', closeFullscreen);

    // Funcionalidade das setas de navegação
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + speakerImages.length) % speakerImages.length; // Vai para a imagem anterior
        openFullscreen(currentImageIndex);
    });
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % speakerImages.length; // Vai para a próxima imagem
        openFullscreen(currentImageIndex);
    });

    // Popup Functionality para mostrar a galeria de palestrantes
    if (showSpeakersBtn && speakersPopup && closePopupBtn) {
        showSpeakersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            speakersPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                speakersPopup.style.opacity = '1';
            }, 10);
        });

        const closePopup = () => {
            speakersPopup.style.opacity = '0';
            setTimeout(() => {
                speakersPopup.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        };

        closePopupBtn.addEventListener('click', closePopup);

        speakersPopup.addEventListener('click', (e) => {
            if (e.target === speakersPopup) {
                closePopup();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && speakersPopup.style.display === 'flex') {
                closePopup();
            }
        });
    }
};

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    toggleMobileMenu();
    handleNavbarScroll();
    initSmoothScroll();
    initBackToTop();
    initStatsObserver();
    initPopup();
});
