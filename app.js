// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#navMenu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Current year
document.querySelector("#year").textContent = new Date().getFullYear();

// RDV form → WhatsApp message builder (no backend needed)
const form = document.querySelector("#rdvForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const phone = (data.get("phone") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const reason = (data.get("reason") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  const lines = [
    "Bonjour Dr. Abid Ahlam,",
    "",
    "Je souhaite prendre rendez-vous.",
    "",
    `Nom : ${name}`,
    `Téléphone : ${phone}`,
    email ? `Email : ${email}` : null,
    reason ? `Motif : ${reason}` : null,
    "",
    `Message : ${message}`,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  const waNumber = "212600000000"; // <-- بدلها برقم الواتساب ديال الدكتور (بلا +)
  const url = `https://wa.me/${waNumber}?text=${text}`;

  window.open(url, "_blank", "noopener,noreferrer");
  form.reset();
});
