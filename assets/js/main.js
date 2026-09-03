// MEP Magyarország — alap interakciók (mobil menü, scroll reveal, ajánlatkérő form, FAQ)
(function(){
  "use strict";

  // Sötét / világos mód kapcsoló
  (function () {
    var root = document.documentElement;
    function isDark() {
      var attr = root.getAttribute("data-theme");
      if (attr === "dark") return true;
      if (attr === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    function sync() {
      document.querySelectorAll(".theme-toggle").forEach(function (btn) {
        btn.setAttribute("aria-pressed", isDark() ? "true" : "false");
      });
    }
    sync();
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = isDark() ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("mep-theme", next); } catch (err) {}
        sync();
      });
    });
  })();

  // Lebegő nav — hamburger lenyíló panel
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.querySelector(".nav-panel");
  if (toggle && panel) {
    var closeNavPanel = function () {
      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNavPanel);
    });
    document.addEventListener("click", function (e) {
      if (!panel.contains(e.target) && e.target !== toggle) closeNavPanel();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNavPanel();
    });
  }

  // Nyelvválasztó (UI — a tartalom fordítása később készül el, jelenleg csak HU él)
  var langSwitch = document.querySelector(".lang-switch");
  if (langSwitch) {
    var langTrigger = langSwitch.querySelector(".lang-trigger");
    var langCode = langSwitch.querySelector(".lang-trigger-code");
    var closeLangMenu = function () {
      langSwitch.classList.remove("open");
      langTrigger.setAttribute("aria-expanded", "false");
    };
    langTrigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = langSwitch.classList.toggle("open");
      langTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    langSwitch.querySelectorAll(".lang-option").forEach(function (opt) {
      opt.addEventListener("click", function () {
        langSwitch.querySelectorAll(".lang-option").forEach(function (o) { o.classList.remove("is-active"); });
        opt.classList.add("is-active");
        if (langCode) langCode.textContent = opt.getAttribute("data-lang").toUpperCase();
        try { localStorage.setItem("mep-lang", opt.getAttribute("data-lang")); } catch (err) {}
        closeLangMenu();
      });
    });
    document.addEventListener("click", function (e) {
      if (!langSwitch.contains(e.target)) closeLangMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLangMenu();
    });
  }

  // Scroll reveal animáció (prefers-reduced-motion esetén azonnal látszik minden)
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // 3D tilt effekt kártyákon és a hero panelen (asztali, pointer:fine eszközökön, reduced-motion nélkül)
  if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    var tiltEls = document.querySelectorAll(".card, .product-card, .category-card, .hero-visual");
    tiltEls.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        var rx = (py * -7).toFixed(2);
        var ry = (px * 9).toFixed(2);
        el.style.transform = "perspective(1000px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  // Ajánlatkérő űrlap — kliensoldali validáció + valódi e-mail küldés (FormSubmit.co, fiók nélkül)
  var quoteForm = document.querySelector("#quote-form");
  if (quoteForm) {
    var formLoadTime = Date.now();
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = quoteForm.querySelector(".form-status");
      var requiredOk = true;
      quoteForm.querySelectorAll("[required]").forEach(function (field) {
        if (!field.value || (field.type === "checkbox" && !field.checked)) {
          requiredOk = false;
          field.style.borderColor = "#c0392b";
        } else {
          field.style.borderColor = "";
        }
      });
      if (!status) return;
      status.classList.remove("success", "error");

      // Spam-védelem: rejtett "honeypot" mező + túl gyors beküldés szűrése
      var honey = quoteForm.querySelector('[name="company_website"]');
      var submittedTooFast = Date.now() - formLoadTime < 2500;
      if ((honey && honey.value) || submittedTooFast) {
        status.textContent = "Hiba történt a küldés során. Kérjük, próbálja újra.";
        status.classList.add("error", "visible");
        return;
      }

      if (!requiredOk) {
        status.textContent = "Kérjük, töltsd ki a kötelező mezőket, és fogadd el az adatkezelési tájékoztatót.";
        status.classList.add("error", "visible");
        return;
      }

      var submitBtn = quoteForm.querySelector('button[type="submit"]');
      var submitBtnLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Küldés…"; }

      fetch(quoteForm.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(quoteForm)
      })
        .then(function (res) { return res.ok ? res.json() : Promise.reject(res); })
        .then(function () {
          status.textContent = "Köszönjük! Munkatársunk 1 munkanapon belül felveszi Önnel a kapcsolatot.";
          status.classList.add("success", "visible");
          quoteForm.reset();
        })
        .catch(function () {
          status.textContent = "Hiba történt a küldés során. Kérjük, próbálja újra, vagy írjon nekünk közvetlenül az info@btkkft.hu címre.";
          status.classList.add("error", "visible");
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtnLabel; }
        });
    });
  }

  // Cookie hozzájárulási sáv
  (function () {
    var KEY = "mep-cookie-consent";
    var banner = document.getElementById("cookie-banner");
    if (!banner) return;
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (err) {}
    window.mepConsent = stored; // "accepted" | "rejected" | null — jövőbeli analitika ez alapján dönthet
    if (!stored) {
      window.setTimeout(function () { banner.classList.add("visible"); }, 600);
    }
    function setConsent(value) {
      try { localStorage.setItem(KEY, value); } catch (err) {}
      window.mepConsent = value;
      banner.classList.remove("visible");
    }
    var acceptBtn = document.getElementById("cookie-accept");
    var rejectBtn = document.getElementById("cookie-reject");
    if (acceptBtn) acceptBtn.addEventListener("click", function () { setConsent("accepted"); });
    if (rejectBtn) rejectBtn.addEventListener("click", function () { setConsent("rejected"); });
  })();

  // Év a lábléchez
  var yearEl = document.querySelector("#current-year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
