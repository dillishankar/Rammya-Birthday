/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const CORRECT_PASSWORD = "Power3014";

/* ─────────────────────────────────────────────
   EMAIL JS INIT  ← only once, with your real key
───────────────────────────────────────────── */
emailjs.init("5rZcaouq7MemCzsCZ");

/* ─────────────────────────────────────────────
   ENTRY FLOW (Heart → Password → Site)
───────────────────────────────────────────── */

// Force video play as soon as possible (fixes mobile/browser autoplay blocks)
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("entry-video");
  if (video) {
    video.muted = true; // ensure muted (required for autoplay)
    video.play().catch((err) => {
      console.warn("Autoplay blocked, will retry on interaction:", err);
    });
  }
});

// Retry video play on first user interaction (iOS Safari fix)
document.addEventListener("touchstart", function retryVideo() {
  const video = document.getElementById("entry-video");
  if (video && video.paused) {
    video.play().catch(() => { });
  }
  document.removeEventListener("touchstart", retryVideo);
}, { passive: true });

// Heart click → show password card
function heartClick() {
  const heartBtn = document.getElementById("heart-btn");
  const greeting = document.getElementById("entry-greeting");
  const pwdCard = document.getElementById("pwd-card");

  heartBtn.classList.add("filling");

  setTimeout(() => {
    heartBtn.classList.remove("filling");
    heartBtn.classList.add("filled");
    greeting.style.opacity = "0";

    setTimeout(() => {
      greeting.style.display = "none";
      pwdCard.classList.add("show");
      document.getElementById("pwd-input").focus();
    }, 400);
  }, 600);
}

// Password check
function checkPassword() {
  const input = document.getElementById("pwd-input");
  const error = document.getElementById("pwd-error");

  if (input.value.trim() === CORRECT_PASSWORD) {
    error.classList.remove("show");

    const entry = document.getElementById("entry-screen");
    const main = document.getElementById("main-site");

    entry.classList.add("exit");

    setTimeout(() => {
      entry.style.display = "none";
      main.style.display = "block";
      initMainSite();
    }, 700);
  } else {
    error.classList.add("show");
    input.value = "";
    input.focus();
  }
}

// Enter key support
document.getElementById("pwd-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
});

/* ─────────────────────────────────────────────
   NAVBAR (Mobile Responsive)
───────────────────────────────────────────── */

function toggleNav() {
  document.getElementById("nav-links").classList.toggle("open");
}

function closeNav() {
  document.getElementById("nav-links").classList.remove("open");
}

/* ─────────────────────────────────────────────
   MAIN INIT
───────────────────────────────────────────── */

function initMainSite() {
  initScrollReveal();
  initGalleryPause();
  generateCalendar(2025, 1, "feb-grid"); // February
  generateCalendar(2025, 2, "mar-grid"); // March
}

/* ─────────────────────────────────────────────
   SCROLL ANIMATION (Responsive)
───────────────────────────────────────────── */

function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el) => observer.observe(el));
}

/* ─────────────────────────────────────────────
   HIGHLIGHTS (Pause on touch/mobile)
───────────────────────────────────────────── */
// Add this inside your initMainSite() function or at the bottom
function initGalleryPause() {
  const track = document.getElementById("gallery-track");
  if (!track) return;

  // Pause animation on hover
  track.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });

  track.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
}

/* ─────────────────────────────────────────────
   SMALL UX IMPROVEMENTS
───────────────────────────────────────────── */

// Smooth scroll fix for mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ─────────────────────────────────────────────
   CALENDAR GENERATION
───────────────────────────────────────────── */

function generateCalendar(year, month, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("cal-day", "empty");
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("cal-day");
    cell.textContent = day;

    // Feb 14 highlight
    if (year === 2025 && month === 1 && day === 14) {
      cell.classList.add("hi");
      cell.setAttribute("data-text", "First meet");
    }

    // March 31 highlight
    if (year === 2025 && month === 2 && day === 31) {
      cell.classList.add("hi");
      cell.setAttribute("data-text", "Ends with memories");
    }

    grid.appendChild(cell);
  }
}

/* ─────────────────────────────────────────────
   DORAEMON WISH POPUP
───────────────────────────────────────────── */

function openDoraemonWish() {
  document.getElementById("wish-overlay").classList.add("open");
}

function closeDoraemonWish() {
  document.getElementById("wish-overlay").classList.remove("open");
}

/* ─────────────────────────────────────────────
   LETTER — Toggle open/close
───────────────────────────────────────────── */

function toggleLetter() {
  const envelope = document.getElementById("envelope");
  const paper = document.getElementById("letter-paper");
  envelope.classList.toggle("open");
  paper.classList.toggle("open");
}

/* ─────────────────────────────────────────────
   MESSAGE — Send via EmailJS  ← only one version
───────────────────────────────────────────── */

function sendMessage() {
  const name = document.getElementById("msg-name").value.trim();
  const body = document.getElementById("msg-body").value.trim();
  const success = document.getElementById("send-success");
  const btn = document.querySelector(".send-btn");

  // Validate
  if (!name || !body) {
    if (!name) document.getElementById("msg-name").style.borderColor = "#f0708a";
    if (!body) document.getElementById("msg-body").style.borderColor = "#f0708a";
    setTimeout(() => {
      document.getElementById("msg-name").style.borderColor = "";
      document.getElementById("msg-body").style.borderColor = "";
    }, 1200);
    return;
  }

  // Loading state
  btn.textContent = "Sending...";
  btn.disabled = true;

  emailjs.send("service_60xupfj", "template_5snu0jh", {
    name: name,
    message: body
  })
    .then(() => {
      success.classList.add("show");
      document.getElementById("msg-name").value = "";
      document.getElementById("msg-body").value = "";
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Send`;
      btn.disabled = false;
      setTimeout(() => success.classList.remove("show"), 4000);
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Send`;
      btn.disabled = false;
      alert("Something went wrong. Please try again.");
    });
}


// Function to handle the Timeline Growth
function updateTimeline() {
  const timeline = document.querySelector('.timeline-container');
  const growthLine = document.getElementById('growth-line');

  if (!timeline || !growthLine) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Calculate how much of the timeline is visible
  if (rect.top < windowHeight) {
    const visiblePart = windowHeight - rect.top;
    const totalHeight = rect.height;
    let progress = (visiblePart / totalHeight) * 100;

    // Clamp between 0 and 100
    progress = Math.min(Math.max(progress, 0), 100);
    growthLine.style.height = progress + "%";
  }
}


// Listen for scroll events
window.addEventListener('scroll', () => {
  updateTimeline();
});