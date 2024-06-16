// GSAP animations
gsap.registerPlugin(ScrollTrigger);

gsap.from("header", {
    duration: 0.5,
    y: -50,
    opacity: 0,
    ease: "power2.out"
});

gsap.from(".sticky-button", {
    opacity: 0,
    y: -10,
    duration: 0.5,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".sticky-buttons",
        start: "top top",
        toggleActions: "play none none reverse"
    }
});

// Animaciones para las secciones
gsap.from(".title h1", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".title",
        start: "top 80%",
        end: "bottom 60%",
        scrub: true
    }
});

gsap.from(".keywords span", {
    duration: 1,
    x: -50,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".title",
        start: "top 80%",
        end: "bottom 60%",
        scrub: true
    }
});

document.querySelectorAll(".content-section").forEach(section => {
    gsap.from(section.querySelectorAll(".text-content, .img-content, .video-content"), {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true
        }
    });
});

// Parallax efecto
document.querySelectorAll('.parallax').forEach(parallaxElement => {
    gsap.to(parallaxElement, {
        y: -50,
        ease: "none",
        scrollTrigger: {
            trigger: parallaxElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP animations for content-sections with ScrollTrigger
gsap.from("#seccion-1 text-content, #seccion-1 img-content", {
    scrollTrigger: {
        trigger: "#seccion-1",
        start: "top 80%", 
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out"
});

gsap.from("#seccion-2 .img-content", {
    scrollTrigger: {
        trigger: "#seccion-2",
        start: "top 80%", 
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out"
});

gsap.from("#seccion-2 .text-content", {
    scrollTrigger: {
        trigger: "#seccion-2",
        start: "top 75%", 
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.3
});

gsap.from("#seccion-3 .product", {
    scrollTrigger: {
        trigger: "#seccion-3",
        start: "top 80%", 
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 50,
    duration: 0.7,
    ease: "power2.out",
    delay: 0.4
});

gsap.from("#seccion-5", {
    scrollTrigger: {
        trigger: "#seccion-5",
        start: "top 90%", 
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out"
});

gsap.from("#seccion-8 div", {
    scrollTrigger: {
        trigger: "#seccion-8", 
        start: "top 80%", 
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.2
});

document.querySelector('.back-to-top a').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Anima las imágenes dentro de la sección #seccion-4
const section4Images = gsap.utils.toArray('#seccion-4 img, #seccion-4 .parrafos, #seccion-6 img, #seccion-7 img');

section4Images.forEach((image, index) => {
    gsap.from(image, {
        scrollTrigger: {
            trigger: image,
            start: 'top 80%', 
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
        delay: index * 0.2 
    });
});

ScrollTrigger.refresh();

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.glide__slide');
    let currentSlide = 0;

    // Función para cambiar la diapositiva
    function changeSlide(index) {
        if (index >= 0 && index < slides.length) {
            slides.forEach(slide => {
                gsap.set(slide, { opacity: 0, display: 'none' });
            });

            gsap.set(slides[index], { display: 'block' });
            gsap.to(slides[index], { opacity: 1, duration: 0.8, ease: 'power2.out' });

            currentSlide = index;
            updateArrowsState();
        }
    }

    // Función para actualizar el estado de las flechas
    function updateArrowsState() {
        const prevButton = document.querySelector('.glide__arrow--left');
        const nextButton = document.querySelector('.glide__arrow--right');

        // Habilitar o deshabilitar las flechas según la posición actual
        if (currentSlide === 0) {
            prevButton.setAttribute('disabled', true);
        } else {
            prevButton.removeAttribute('disabled');
        }

        if (currentSlide === slides.length - 1) {
            nextButton.setAttribute('disabled', true);
        } else {
            nextButton.removeAttribute('disabled');
        }
    }

    // Función para navegar a la diapositiva anterior o siguiente
    function navigateSlider(direction) {
        if (direction === 'prev') {
            changeSlide(currentSlide - 1);
        } else if (direction === 'next') {
            changeSlide(currentSlide + 1);
        }
    }

    // Event listeners para los botones de navegación
    const prevButton = document.querySelector('.glide__arrow--left');
    const nextButton = document.querySelector('.glide__arrow--right');

    prevButton.addEventListener('click', () => navigateSlider('prev'));
    nextButton.addEventListener('click', () => navigateSlider('next'));

    // Inicializar con la primera diapositiva visible y las flechas actualizadas
    changeSlide(0);
});

const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });