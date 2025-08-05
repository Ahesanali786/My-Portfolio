// DOM Elements
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const backToTop = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeTypingEffect();
  initializeCounters();
  initializeCursor();
  loadSavedTheme();
});

// Mobile Navigation
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// Theme Toggle
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  const icon = themeToggle.querySelector("i");
  icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

  // Add transition effect
  document.body.style.transition = "all 0.3s ease";
  setTimeout(() => {
    document.body.style.transition = "";
  }, 300);
}

themeToggle.addEventListener("click", toggleTheme);

// Load saved theme
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  const icon = themeToggle.querySelector("i");
  icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// Scroll Effects
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;

  // Navbar scroll effect
  if (scrolled > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Back to top button
  if (scrolled > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  // Update active nav link
  updateActiveNavLink();

  // Parallax effect for background shapes
  const shapes = document.querySelectorAll(".shape");
  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = -(scrolled * speed);
    shape.style.transform = `translateY(${yPos}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });

  lastScrollTop = scrolled;
});

// Update active navigation link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Back to top button
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Typing Effect
function initializeTypingEffect() {
  const typedTextElement = document.querySelector(".typed-text");
  const texts = [
    "Backend Developer",
    "API Architect",
    "Laravel Specialist",
    "RESTful API Expert",
    "PHP Artisan",
    "Scalable Systems Builder",
    "Backend Problem Solver",
    "Clean Code Evangelist",
    "Security-First Developer",
    "MySQL & PostgreSQL Ninja",
    "Microservices Engineer",
    "Server-Side Logic Master",
    "Laravel + MySQL",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// Counter Animation
function initializeCounters() {
  const counters = document.querySelectorAll("[data-count]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-count"));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// Skill Bar Animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  const skillsSection = document.querySelector("#skills");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              const progress = bar.getAttribute("data-progress");
              bar.style.width = progress + "%";
            }, index * 100);
          });
          observer.unobserve(skillsSection);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

// Scroll Animations
function initializeAnimations() {
  // Add animation classes to elements
  const elementsToAnimate = [
    ".hero-content",
    ".about-text",
    ".about-visual",
    ".skill-category",
    ".project-card",
    ".service-card",
    ".contact-info",
    ".contact-form",
  ];

  elementsToAnimate.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.add("animate-on-scroll");
    });
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element);
  });

  // Initialize skill bar animation
  animateSkillBars();
}

// Custom Cursor
function initializeCursor() {
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      cursorDot.style.left = x + "px";
      cursorDot.style.top = y + "px";

      cursorOutline.style.left = x + "px";
      cursorOutline.style.top = y + "px";
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll(
      "a, button, .project-card, .service-card, .tech-item"
    );

    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "scale(2)";
        cursorOutline.style.transform = "scale(1.5)";
      });

      element.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "scale(1)";
        cursorOutline.style.transform = "scale(1)";
      });
    });
  }
}

// Contact Form Validation and Submission
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + "-error");
  const field = document.getElementById(fieldId);

  if (errorElement && field) {
    errorElement.textContent = message;
    field.style.borderColor = "var(--error-color)";

    setTimeout(() => {
      errorElement.textContent = "";
      field.style.borderColor = "";
    }, 3000);
  }
}

// Enhanced Keyboard Navigation
document.addEventListener("keydown", function (e) {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }

  // Enter key on nav toggle
  if (e.key === "Enter" && e.target === navToggle) {
    navToggle.click();
  }

  // Arrow keys for navigation
  if (e.key === "ArrowUp" && e.ctrlKey) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (e.key === "ArrowDown" && e.ctrlKey) {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
});

// Focus management for accessibility
document
  .querySelectorAll("a, button, input, textarea, select")
  .forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid var(--primary-color)";
      this.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", function () {
      this.style.outline = "";
      this.style.outlineOffset = "";
    });
  });

// Performance optimization - Lazy loading for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Enhanced mobile experience
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", function (e) {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", function (e) {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up - hide mobile menu if open
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  }
}

// Dynamic copyright year
document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  const copyrightText = document.querySelector(".footer-copyright p");
  if (copyrightText) {
    copyrightText.innerHTML = copyrightText.innerHTML.replace(
      "2024",
      currentYear
    );
  }
});

// Page visibility API for performance
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.animationPlayState = "paused";
  } else {
    // Resume animations when page becomes visible
    document.body.style.animationPlayState = "running";
  }
});

// Preloader effect
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Trigger initial animations
  setTimeout(() => {
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.classList.add("animated");
    }
  }, 100);
});

// Error handling for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.style.display = "none";
    console.warn("Failed to load image:", this.src);
  });
});
