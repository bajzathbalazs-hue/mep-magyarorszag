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

  // Élő, 3D-s hatású hálózat-animáció a hero háttérben (canvas)
  (function () {
    var canvases = document.querySelectorAll(".hero-bg-canvas");
    if (!canvases.length || !window.requestAnimationFrame) return;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    canvases.forEach(function (canvas) {
      var ctx = canvas.getContext("2d");
      if (!ctx) return;
      var section = canvas.closest(".hero") || canvas.parentElement;
      var particles = [];
      var width = 0, height = 0, dpr = 1;
      var mouseX = 0, mouseY = 0, rafId = null;

      function resize() {
        var rect = section.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        mouseX = width / 2;
        mouseY = height / 2;
      }

      function initParticles() {
        var count = width < 700 ? 24 : 52;
        particles = [];
        for (var i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random(),
            vx: (Math.random() - 0.5) * 0.22,
            vy: (Math.random() - 0.5) * 0.22
          });
        }
      }

      function frame() {
        ctx.clearRect(0, 0, width, height);
        var parX = (mouseX / width - 0.5) * 16;
        var parY = (mouseY / height - 0.5) * 16;

        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          p.x += p.vx; p.y += p.vy;
          if (p.x < -10) p.x = width + 10; else if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10; else if (p.y > height + 10) p.y = -10;
        }

        var maxDist = 130;
        for (var a = 0; a < particles.length; a++) {
          for (var b = a + 1; b < particles.length; b++) {
            var pa = particles[a], pb = particles[b];
            var dx = pa.x - pb.x, dy = pa.y - pb.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
              var op = (1 - dist / maxDist) * 0.32 * ((pa.z + pb.z) / 2 + 0.35);
              ctx.strokeStyle = "rgba(103,232,249," + op.toFixed(3) + ")";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(pa.x + parX * pa.z, pa.y + parY * pa.z);
              ctx.lineTo(pb.x + parX * pb.z, pb.y + parY * pb.z);
              ctx.stroke();
            }
          }
        }

        for (var j = 0; j < particles.length; j++) {
          var pt = particles[j];
          var r = 1 + pt.z * 2.2;
          ctx.beginPath();
          ctx.fillStyle = "rgba(103,232,249," + (0.35 + pt.z * 0.5).toFixed(3) + ")";
          ctx.arc(pt.x + parX * pt.z, pt.y + parY * pt.z, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      function loop() { frame(); rafId = requestAnimationFrame(loop); }
      function start() { if (!rafId) loop(); }
      function stop() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

      resize();
      initParticles();

      if (prefersReducedMotion) {
        frame();
      } else {
        start();
        if ("IntersectionObserver" in window) {
          new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) { entry.isIntersecting ? start() : stop(); });
          }, { threshold: 0 }).observe(section);
        }
      }

      window.addEventListener("resize", function () {
        resize();
        initParticles();
        if (prefersReducedMotion) frame();
      });
      section.addEventListener("mousemove", function (e) {
        var rect = section.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });
      section.addEventListener("mouseleave", function () {
        mouseX = width / 2;
        mouseY = height / 2;
      });
    });
  })();

  // Segítség-fül (call-to-action widget)
  (function () {
    var widget = document.getElementById("help-widget");
    if (!widget) return;
    var tab = document.getElementById("help-tab");
    var closeBtn = widget.querySelector(".help-panel-close");

    function openPanel() {
      widget.classList.add("open");
      if (tab) tab.setAttribute("aria-expanded", "true");
    }
    function closePanel() {
      widget.classList.remove("open");
      if (tab) tab.setAttribute("aria-expanded", "false");
    }
    if (tab) {
      tab.addEventListener("click", function () {
        if (widget.classList.contains("open")) closePanel();
        else openPanel();
      });
    }
    if (closeBtn) closeBtn.addEventListener("click", closePanel);
    document.addEventListener("click", function (e) {
      if (widget.classList.contains("open") && !widget.contains(e.target)) closePanel();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanel();
    });
  })();

  // Év a lábléchez
  var yearEl = document.querySelector("#current-year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
