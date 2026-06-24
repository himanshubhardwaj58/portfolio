/* ===============================
   SMOOTH SCROLL NAVIGATION
================================ */
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

/* ===============================
   HERO CONTACT BUTTON
================================ */
function goContact() {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth"
  });
}

/* ===============================
   DARK MODE TOGGLE
================================ */
function toggleTheme() {
  document.body.classList.toggle("dark");

  // save preference
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
});

/* ===============================
   ACTIVE NAV LINK ON SCROLL
================================ */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ===============================
   FORM SUBMIT FEEDBACK (UI ONLY)
   (Backend handled by Node.js)
================================ */
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", () => {
    setTimeout(() => {
      alert("Message sent successfully!");
    }, 300);
  });
}
