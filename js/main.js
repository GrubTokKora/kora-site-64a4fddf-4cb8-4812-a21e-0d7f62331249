window.JAIWAI_CONFIG = {
  businessId: "64a4fddf-4cb8-4812-a21e-0d7f62331249",
  apiBaseUrl: "https://kora-agent.grubtok.com",
  recaptchaSiteKey: "6LcsdJYsAAAAAAur-h7cYlZuGJTmijNHmOi5kFH7"
};

const chiliSVG = (on) =>
  `<svg class="${on ? "chili-on" : "chili-off"}" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path stroke-width="1.5" stroke-linejoin="round" d="M7.5 8.2c-1.6.4-3 1.6-3.8 3.3-.3.6.4 1.2 1 .9.9-.5 1.9-.7 2.9-.6-.8 2.6.2 5.6 2.7 7.2 3.4 2.2 8.2 1 10.6-2.7.4-.6-.2-1.4-.9-1.2-3.6 1-7-.7-8-3.9 1.4-2 1.6-4.7.3-7-.3-.5-1-.5-1.3 0-.5.9-1.2 1.6-2 2.1-.2-1.6-1.2-3-2.7-3.7-.6-.3-1.2.4-.9 1 .6 1.2.6 2.5.1 3.7l-.7-.4z"/></svg>`;

const spiceRow = (n) =>
  n === 0
    ? `<span class="text-xs font-bold text-n-500 uppercase tracking-wide">No chili</span>`
    : Array.from({ length: 4 }, (_, i) => chiliSVG(i < n)).join("");

function parseMenuPrice(price) {
  const nums = (String(price).match(/\d+(?:\.\d+)?/g) || []).map(Number);
  return nums.length ? Math.max(...nums) : 0;
}

function getMenuCardItems(cat = "all", limit = null) {
  let items = window.JAIWAI_MENU.filter((m) => cat === "all" || m.cat === cat);

  if (limit) {
    items = [...items]
      .sort((a, b) => parseMenuPrice(b.price) - parseMenuPrice(a.price))
      .slice(0, limit);
  }

  return items;
}

function renderMenuCards(cat = "all", gridId = "menuGrid") {
  const grid = document.getElementById(gridId);
  if (!grid || !window.JAIWAI_MENU) return;

  const previewLimit = document.getElementById("menuTabs") ? null : 6;
  const items = getMenuCardItems(cat, previewLimit);
  grid.innerHTML = items
    .map(
      (m) => `
      <article class="menu-card bg-paper rounded-2xl border-2 border-ink p-5">
          <div class="flex items-baseline justify-between gap-2">
            <h3 class="font-display font-bold text-lg text-ink leading-tight">${m.name}</h3>
            <span class="font-display font-bold text-chili shrink-0">${m.price}</span>
          </div>
          ${m.th ? `<p class="font-hand text-base text-n-500 leading-none -mt-0.5">${m.th}</p>` : ""}
          <p class="text-sm text-n-600 mt-1.5 leading-snug">${m.desc}</p>
          <div class="mt-3">
            <span class="inline-flex items-center gap-0.5">${spiceRow(m.spice)}</span>
          </div>
      </article>`
    )
    .join("");

  if (window.lucide) lucide.createIcons();
}

function renderMenuList() {
  const container = document.getElementById("menuPageSections");
  if (!container || !window.JAIWAI_MENU || !window.JAIWAI_MENU_SECTIONS) return;

  container.innerHTML = window.JAIWAI_MENU_SECTIONS.map((section) => {
    const items = window.JAIWAI_MENU.filter((m) => m.cat === section.id);
    if (!items.length) return "";

    return `
      <section class="mb-14 reveal" id="${section.id}">
        <h2 class="font-display font-extrabold text-ink text-3xl sm:text-4xl mb-2 border-b-2 border-noodle pb-2">${section.title}</h2>
        ${section.note ? `<p class="text-sm text-n-600 mb-6">${section.note}</p>` : '<div class="mb-6"></div>'}
        <div class="space-y-5">
          ${items
            .map(
              (m) => `
            <div class="menu-list-item flex justify-between items-start gap-4">
              <div class="min-w-0">
                <h3 class="font-display font-bold text-lg text-ink">${m.name}</h3>
                ${m.th ? `<p class="font-hand text-base text-n-500">${m.th}</p>` : ""}
                <p class="text-sm text-n-600 mt-1">${m.desc}</p>
              </div>
              <span class="font-display font-bold text-chili shrink-0">${m.price}</span>
            </div>`
            )
            .join("")}
        </div>
      </section>`;
  }).join("");
}

function initMenuTabs() {
  const tabs = document.getElementById("menuTabs");
  if (!tabs || tabs.dataset.bound) return;
  tabs.dataset.bound = "true";

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    document.querySelectorAll("#menuTabs .tab").forEach((t) => t.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderMenuCards(btn.dataset.cat);
  });
}

function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar || navbar.dataset.scrollBound) return;
  navbar.dataset.scrollBound = "true";

  window.addEventListener(
    "scroll",
    () => {
      const s = window.scrollY > 20;
      navbar.classList.toggle("py-1.5", s);
      navbar.classList.toggle("py-2", !s);
      navbar.style.boxShadow = s ? "0 10px 30px rgba(38,24,12,.12)" : "";
    },
    { passive: true }
  );
}

function initMobileDrawer() {
  const drawer = document.getElementById("drawer");
  const scrim = document.getElementById("scrim");
  const sheet = document.getElementById("sheet");
  const burger = document.getElementById("burger");
  const closeMenu = document.getElementById("closeMenu");
  if (!drawer || !scrim || !sheet || !burger || drawer.dataset.bound) return;
  drawer.dataset.bound = "true";

  const openD = () => {
    drawer.classList.add("pointer-events-auto");
    requestAnimationFrame(() => {
      scrim.classList.add("opacity-100");
      sheet.classList.remove("opacity-0", "-translate-y-4");
    });
  };

  const closeD = () => {
    scrim.classList.remove("opacity-100");
    sheet.classList.add("opacity-0", "-translate-y-4");
    setTimeout(() => drawer.classList.remove("pointer-events-auto"), 300);
  };

  burger.addEventListener("click", openD);
  closeMenu.addEventListener("click", closeD);
  scrim.addEventListener("click", closeD);
  document.querySelectorAll(".drawer-link").forEach((a) => a.addEventListener("click", closeD));
}

function initReveal() {
  const supportsViewTimeline =
    typeof CSS !== "undefined" && CSS.supports && CSS.supports("animation-timeline: view()");

  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || supportsViewTimeline) return;

  elements.forEach((el) => el.classList.add("js-reveal-pending"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => io.observe(el));
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.remove("translate-y-24", "opacity-0");
  clearTimeout(window._jwToastTimer);
  window._jwToastTimer = setTimeout(() => toast.classList.add("translate-y-24", "opacity-0"), 3200);
}

function initBookingForm() {
  const form = document.getElementById("bookForm");
  if (!form || form.dataset.bound) return;
  form.dataset.bound = "true";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("bk-name")?.value.trim() || "there";
    showToast(`Thanks ${name.split(" ")[0]} — we'll text to confirm!`);
    form.reset();
  });
}

function initSpecialSpice() {
  const el = document.getElementById("specialSpice");
  if (!el) return;
  el.innerHTML = Array.from({ length: 4 }, (_, i) => chiliSVG(i < 2)).join("");
}

function initFaqAccordion() {
  const accordion = document.getElementById("faqAccordion");
  if (!accordion || accordion.dataset.bound) return;
  accordion.dataset.bound = "true";

  const items = Array.from(accordion.querySelectorAll(".faq-item"));

  const setOpen = (item, open) => {
    const trigger = item.querySelector(".faq-trigger");
    const panel = item.querySelector(".faq-panel");
    if (!trigger || !panel) return;

    item.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
  };

  items.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((other) => setOpen(other, false));
      setOpen(item, !isOpen);
    });
  });
}

function initLucide() {
  if (window.lucide) lucide.createIcons();
}

function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

onReady(() => {
  initNavbarScroll();
  initMobileDrawer();
  initMenuTabs();
  initReveal();
  initBookingForm();
  initSpecialSpice();
  initFaqAccordion();
  renderMenuCards("all");
  renderMenuList();
  initLucide();
});

window.addEventListener("load", initLucide);
