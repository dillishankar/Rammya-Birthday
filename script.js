/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const CORRECT_PASSWORD = "Power3014";

/* ─────────────────────────────────────────────
   ENTRY FLOW (Heart → Password → Site)
───────────────────────────────────────────── */

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

  // ADD THIS 👇
  generateCalendar(2025, 1, "feb-grid"); // February (month index starts from 0)
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

function initGalleryPause() {
  const track = document.getElementById("gallery-track");

  if (!track) return;

  // Mobile touch pause
  track.addEventListener("touchstart", () => {
    track.style.animationPlayState = "paused";
  });

  track.addEventListener("touchend", () => {
    track.style.animationPlayState = "running";
  });
}

/* ─────────────────────────────────────────────
   SMALL UX IMPROVEMENTS
───────────────────────────────────────────── */

// Prevent zoom double tap issues
document.addEventListener("touchstart", () => { }, { passive: true });

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

    // ⭐ FEB 14
    if (year === 2025 && month === 1 && day === 14) {
      cell.classList.add("hi");
      cell.setAttribute("data-text", "First meet");
    }

    // ⭐ MARCH 31
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
   MESSAGE — Send
───────────────────────────────────────────── */
function sendMessage() {
  const name = document.getElementById("msg-name").value.trim();
  const body = document.getElementById("msg-body").value.trim();
  const success = document.getElementById("send-success");

  if (!name || !body) {
    // Shake both empty fields
    if (!name) document.getElementById("msg-name").style.borderColor = "#f0708a";
    if (!body) document.getElementById("msg-body").style.borderColor = "#f0708a";

    setTimeout(() => {
      document.getElementById("msg-name").style.borderColor = "";
      document.getElementById("msg-body").style.borderColor = "";
    }, 1200);
    return;
  }

  // Show success
  success.classList.add("show");

  // Clear fields
  document.getElementById("msg-name").value = "";
  document.getElementById("msg-body").value = "";

  // Hide success after 4 seconds
  setTimeout(() => {
    success.classList.remove("show");
  }, 4000);
}


/* ─────────────────────────────────────────────
   EMAIL JS INIT
───────────────────────────────────────────── */
emailjs.init("YOUR_PUBLIC_KEY"); // 🔁 Replace this

/* ─────────────────────────────────────────────
   EMAIL JS INIT
───────────────────────────────────────────── */
emailjs.init("5rZcaouq7MemCzsCZ");

/* ─────────────────────────────────────────────
   MESSAGE — Send via EmailJS
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