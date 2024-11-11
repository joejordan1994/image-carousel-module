// index.js

export default class ImageCarousel {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) {
      console.error(`ImageCarousel: No element found for selector ${selector}`);
      return;
    }

    // Default options
    this.options = {
      interval: options.interval || 5000,
    };

    // Carousel elements
    this.slides = this.container.querySelectorAll(".carousel-slide");
    this.currentSlide = 0;
    this.slideInterval = null;

    // Create controls
    this.createControls();

    // Show the first slide
    this.showSlide(this.currentSlide);

    // Start automatic sliding
    this.startSlideShow();
  }

  createControls() {
    // Create navigation arrows
    const prevArrow = document.createElement("button");
    prevArrow.classList.add("carousel-prev");
    prevArrow.innerHTML = "&#10094;"; // Left arrow symbol
    prevArrow.addEventListener("click", () => this.prevSlide());

    const nextArrow = document.createElement("button");
    nextArrow.classList.add("carousel-next");
    nextArrow.innerHTML = "&#10095;"; // Right arrow symbol
    nextArrow.addEventListener("click", () => this.nextSlide());

    this.container.appendChild(prevArrow);
    this.container.appendChild(nextArrow);

    // Create navigation dots
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("carousel-dots");
    this.dots = [];

    this.slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("carousel-dot");
      dot.addEventListener("click", () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });

    this.container.appendChild(dotsContainer);
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach((slide) => {
      slide.style.display = "none";
    });

    // Remove active class from all dots
    this.dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show the current slide
    this.slides[index].style.display = "block";
    this.dots[index].classList.add("active");
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.showSlide(this.currentSlide);
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.options.interval);

    // Pause on mouseover
    this.container.addEventListener("mouseenter", () => {
      clearInterval(this.slideInterval);
    });

    // Resume on mouseout
    this.container.addEventListener("mouseleave", () => {
      this.startSlideShow();
    });
  }
}
