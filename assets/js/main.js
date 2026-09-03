// MEP Magyarország — alap interakciók (mobil menü, scroll reveal, ajánlatkérő form, FAQ)
(function(){
  "use strict";

  // Mobil hamburger menü
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
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

  // Ajánlatkérő űrlap — kliensoldali validáció + demo visszajelzés
  // MISSING DATA: nincs backend / email-küldő szolgáltatás bekötve. Ez csak a frontend
  // viselkedést demonstrálja; éles működéshez szerver oldali endpoint (form-handler,
  // spam-védelem, e-mail küldés info@btkkft.hu / balazs.bajzath@btkkft.hu / gabor.bajzath@btkkft.hu felé) szükséges.
  var quoteForm = document.querySelector("#quote-form");
  if (quoteForm) {
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
      if (!requiredOk) {
        status.textContent = "Kérjük, töltsd ki a kötelező mezőket, és fogadd el az adatkezelési tájékoztatót.";
        status.classList.add("error", "visible");
        return;
      }
      status.textContent = "Köszönjük! Ez egy demó űrlap — élesítéskor az ajánlatkérés e-mailben megérkezik a BTK Kft. munkatársaihoz.";
      status.classList.add("success", "visible");
      quoteForm.reset();
    });
  }

  // Év a lábléchez
  var yearEl = document.querySelector("#current-year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
