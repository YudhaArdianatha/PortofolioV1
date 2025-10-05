//navbar
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("fixed");
    header.classList.remove("absolute");
  } else {
    header.classList.remove("fixed");
    header.classList.add("absolute");
  }
};

//Humburger
const humburger = document.querySelector("#humburger");
const navMenu = document.querySelector("#nav-menu");

humburger.addEventListener("click", function () {
  humburger.classList.toggle("humburger-active");
  navMenu.classList.toggle("hidden");
});

// Create stars background
function createStars() {
  const starsContainer = document.getElementById("stars");
  const numStars = 50;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 4 + "s";
    starsContainer.appendChild(star);
  }
}

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", function () {
  createStars();

  // Animate initial elements
  setTimeout(() => {
    const hiddenElements = document.querySelectorAll(".hidden-initially");
    hiddenElements.forEach((element) => {
      element.classList.add("fade-in-up");
    });
  }, 500);

  // Initialize floating labels
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    const label = document.querySelector(`label[for="${input.id}"]`);

    input.addEventListener("focus", () => {
      label.classList.add("active");
    });

    input.addEventListener("blur", () => {
      if (input.value === "") {
        label.classList.remove("active");
      }
    });

    // Check if input has value on load
    if (input.value !== "") {
      label.classList.add("active");
    }
  });
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");

      // Animate progress bars when skills section is visible
      if (entry.target.querySelector(".skill-item")) {
        const progressBars = entry.target.querySelectorAll(".progress-bar");
        setTimeout(() => {
          progressBars.forEach((bar) => {
            bar.style.width = bar.style.getPropertyValue("--progress-width");
          });
        }, 500);
      }
    }
  });
}, observerOptions);

// Observe all scroll reveal elements
document.querySelectorAll(".scroll-reveal").forEach((el) => {
  observer.observe(el);
});

// Card tilt effect
document.querySelectorAll(".card-tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.transform = "scale(1)";
  } else {
    scrollTopBtn.style.transform = "scale(0)";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
mobileMenuBtn.addEventListener("click", () => {
  // Add mobile menu functionality here if needed
  console.log("Mobile menu clicked");
});

// Form submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get("name") || document.getElementById("name").value;
  const email = formData.get("email") || document.getElementById("email").value;
  const subject = formData.get("subject") || document.getElementById("subject").value;
  const message = formData.get("message") || document.getElementById("message").value;

  // Simple form validation and feedback
  if (name && email && subject && message) {
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();

    // Reset floating labels
    document.querySelectorAll(".floating-label").forEach((label) => {
      label.classList.remove("active");
    });
  } else {
    alert("Please fill in all fields.");
  }
});

// Add typing effect restart on scroll
let typingObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const typingElement = entry.target.querySelector(".typing-text");
        if (typingElement) {
          typingElement.style.animation = "none";
          setTimeout(() => {
            typingElement.style.animation = "typing 3.5s steps(40, end), blink-caret .75s step-end infinite";
          }, 100);
        }
      }
    });
  },
  { threshold: 0.5 }
);

typingObserver.observe(document.getElementById("home"));
