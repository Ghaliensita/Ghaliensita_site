(function () {
  "use strict";

  /* ---------- Preloader: se quita apenas el HTML está listo ---------- */
  function hidePreloader() {
    var preloader = document.getElementById("preloader");
    if (!preloader) return;

    preloader.style.transition = "opacity 0.3s ease";
    preloader.style.opacity = "0";

    setTimeout(function () {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 320);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hidePreloader);
  } else {
    hidePreloader();
  }

  // Seguro extra: si algo falla, el preloader nunca se queda pegado
  window.addEventListener("load", hidePreloader);

  function init() {
    var nav = document.getElementById("mainNav") || document.querySelector("nav");
    var navHeight = nav ? nav.offsetHeight : 0;

    /* ---------- Botón hamburguesa ---------- */
    var toggler = document.querySelector(".navbar-toggler");
    if (toggler && nav) {
      toggler.addEventListener("click", function () {
        nav.classList.add("navbar-reduce");
      });
    }

    /* ---------- Scroll suave + cerrar menú móvil ---------- */
    document.querySelectorAll("a.js-scroll").forEach(function (link) {
      link.addEventListener("click", function (event) {
        var href = link.getAttribute("href");
        var isToggle = link.classList.contains("dropdown-toggle");

        if (
          href &&
          href !== "#" &&
          link.hash &&
          link.pathname.replace(/^\//, "") === location.pathname.replace(/^\//, "") &&
          link.hostname === location.hostname
        ) {
          var target = null;

          try {
            target = document.querySelector(link.hash);
          } catch (error) {}

          if (target) {
            event.preventDefault();

            var top =
              target.getBoundingClientRect().top +
              window.pageYOffset -
              navHeight +
              5;

            window.scrollTo({ top: top, behavior: "smooth" });
          }
        }

        // Cierra el menú móvil (excepto al abrir un desplegable)
        if (!isToggle) {
          var openMenu = document.querySelector(".navbar-collapse.show");
          if (openMenu && window.bootstrap && window.bootstrap.Collapse) {
            window.bootstrap.Collapse.getOrCreateInstance(openMenu).hide();
          }
        }
      });
    });

    /* ---------- Botón "volver arriba" + navbar al hacer scroll ---------- */
    var backToTop = document.querySelector(".back-to-top");
    var navbar = document.querySelector(".navbar");
    var ticking = false;

    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;

      if (backToTop) {
        backToTop.style.display = y > 100 ? "block" : "none";
      }

      if (navbar) {
        if (y > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }

      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(onScroll);
        }
      },
      { passive: true }
    );

    onScroll();

    if (backToTop) {
      backToTop.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    var scrollTopMf = document.querySelector(".scrolltop-mf");
    if (scrollTopMf) {
      scrollTopMf.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* ---------- Años desde el inicio (usa la fecha real de hoy) ---------- */
    var yearsEl = document.getElementById("years");
    if (yearsEl) {
      var startDate = new Date("2016-10-23");
      var today = new Date();
      var yearsPassed = today.getFullYear() - startDate.getFullYear();
      var monthDiff = today.getMonth() - startDate.getMonth();
      var dayDiff = today.getDate() - startDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        yearsPassed--;
      }

      yearsEl.textContent = yearsPassed;
    }

    /* ---------- Slider simple (solo si existe en la página) ---------- */
    var slides = document.querySelector(".slides");
    var slideItems = document.querySelectorAll(".slide");
    var nextBtn = document.querySelector(".next");
    var prevBtn = document.querySelector(".prev");

    if (slides && slideItems.length) {
      var slideCount = slideItems.length;
      var slideIndex = 0;

      var updateSlide = function () {
        slides.style.transform = "translateX(" + -slideIndex * 100 + "%)";
      };

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          slideIndex = (slideIndex + 1) % slideCount;
          updateSlide();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          slideIndex = (slideIndex - 1 + slideCount) % slideCount;
          updateSlide();
        });
      }

      setInterval(function () {
        slideIndex = (slideIndex + 1) % slideCount;
        updateSlide();
      }, 5000);
    }

    /* ---------- Carrusel infinito de logos (solo si existe) ---------- */
    var track = document.querySelector(".carousel-track");
    var container = document.querySelector(".carousel-container");

    if (track && container) {
      var position = 0;
      var baseSpeed = 0.5;
      var speed = baseSpeed;
      var trackWidth = track.scrollWidth;
      var containerWidth = container.clientWidth;

      window.addEventListener("resize", function () {
        trackWidth = track.scrollWidth;
        containerWidth = container.clientWidth;
      });

      var animate = function () {
        position += speed;

        if (position >= trackWidth) {
          position = -containerWidth;
        }

        track.style.transform = "translateX(-" + position + "px)";
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);

      container.addEventListener("mouseenter", function () {
        speed = baseSpeed / 3;
      });

      container.addEventListener("mouseleave", function () {
        speed = baseSpeed;
      });
    }

    /* ---------- Plugins jQuery (solo en páginas que los cargan) ---------- */
    var $ = window.jQuery;

    if ($) {
      // Texto animado con Typed.js
      if (typeof window.Typed === "function" && $(".text-slider").length === 1) {
        var typedStrings = $(".text-slider-items").text();

        new window.Typed(".text-slider", {
          strings: typedStrings.split(","),
          typeSpeed: 80,
          loop: true,
          backDelay: 1100,
          backSpeed: 30
        });
      }

      // Carrusel de testimonios con Owl Carousel
      if ($.fn && $.fn.owlCarousel && $("#testimonial-mf").length) {
        $("#testimonial-mf").owlCarousel({
          margin: 20,
          autoplay: true,
          autoplayTimeout: 4000,
          autoplayHoverPause: true,
          responsive: { 0: { items: 1 } }
        });
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ---------- Carrito lateral (función global usada desde el HTML) ---------- */
function toggleCartSidebar(event) {
  if (event) event.preventDefault();

  var sidebar = document.getElementById("cart-sidebar");
  if (sidebar) sidebar.classList.toggle("open");
}