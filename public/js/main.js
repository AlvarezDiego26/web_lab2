// --- Header con scroll ---
(function() {
    const header = document.getElementById('site-header');
    const onScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    // Año dinámico
    document.getElementById('year').textContent = new Date().getFullYear();
})();

// --- Carrusel Hero ---
const slides = document.querySelectorAll(".hero-carousel img");
let currentIndex = 0;

function changeSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
}

// Cambia cada 5 segundos
setInterval(changeSlide, 5000);

// --- Radio ---
const radioBtn = document.getElementById('radioBtn');
const radioStream = document.getElementById('radioStream');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

let isPlaying = false;

radioBtn.addEventListener('click', () => {
    if (!isPlaying) {
        radioStream.play();
        isPlaying = true;
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    } else {
        radioStream.pause();
        isPlaying = false;
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    }
});

