document.addEventListener("DOMContentLoaded", () => {
  // Slider galerija
  const slides = document.querySelectorAll('.slide');
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  document.querySelector('.prev').addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  document.querySelector('.next').addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  // Automatski slider
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 5000);

  // Forma rezervacije
  const bookingForm = document.getElementById("bookingForm");
  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Hvala! Vaš zahtev za rezervaciju je poslat. Uskoro ćemo vas kontaktirati.");
  });
});
