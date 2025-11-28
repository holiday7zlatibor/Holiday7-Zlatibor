document.addEventListener("DOMContentLoaded", () => {
  // NAV toggle for mobile
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const visible = mainNav.style.display === 'flex';
    mainNav.style.display = visible ? 'none' : 'flex';
    mainNav.style.flexDirection = 'column';
    mainNav.style.gap = '12px';
  });

  // Slider galerija
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  let intervalId = null;
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const slidesContainer = document.querySelector('.slides-container');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    current = (index + slides.length) % slides.length;
  }

  function startAuto() {
    stopAuto();
    intervalId = setInterval(() => showSlide(current + 1), 5000);
  }

  function stopAuto() {
    if (intervalId) clearInterval(intervalId);
  }

  prevBtn.addEventListener('click', () => showSlide(current - 1));
  nextBtn.addEventListener('click', () => showSlide(current + 1));

  slidesContainer.addEventListener('mouseenter', stopAuto);
  slidesContainer.addEventListener('mouseleave', startAuto);

  // Touch / swipe support
  let startX = 0;
  slidesContainer.addEventListener('touchstart', (e) => { stopAuto(); startX = e.touches[0].clientX; }, {passive:true});
  slidesContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? showSlide(current - 1) : showSlide(current + 1);
    }
    startAuto();
  }, {passive:true});

  // Keyboard accessibility
  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.key === ' ') btn.click();
    });
  });

  // Start slider
  showSlide(0);
  startAuto();
});
