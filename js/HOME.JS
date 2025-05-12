document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  const slider = document.getElementById("slides");
  const viewMoreBtn = document.querySelector(".view-more-btn");

  // Show specific slide
  function showSlide(index) {
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    if (slider) {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }

  // Auto slide
  setInterval(() => {
    showSlide(currentIndex + 1);
  }, 3000);

  // Manual nav
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  if (prevButton) prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
  if (nextButton) nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  // View more functionality
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", function () {
      const extraItems = document.querySelectorAll(".extra-item");
      extraItems.forEach(item => {
        item.style.display = "block";
      });
      this.disabled = true;
      this.textContent = "No More Animals";
    });
  }

  // Animated Counters
  const counters = document.querySelectorAll(".counter");
  const aboutSection = document.querySelector(".about-section");
  let hasAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      counter.innerText = "0";
      const target = +counter.getAttribute("data-target");

      const updateCount = () => {
        const current = +counter.innerText;
        const increment = target / 100;

        if (current < target) {
          counter.innerText = `${Math.ceil(current + increment)}`;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  }

  // Scroll to trigger counters
  window.addEventListener("scroll", () => {
    if (aboutSection && !hasAnimated) {
      const sectionTop = aboutSection.offsetTop;
      const scrollPos = window.scrollY + window.innerHeight;

      if (scrollPos > sectionTop + 100) {
        runCounters();
        hasAnimated = true;
      }
    }
  });
});
