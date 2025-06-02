(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);




  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Para activar dropdown en móviles al hacer click
  dropdowns.forEach(drop => {
    drop.addEventListener('click', () => {
      drop.classList.toggle('active');
    });
  });


  const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;
let index = 0;

document.querySelector('.next').addEventListener('click', () => {
  index = (index + 1) % slideCount;
  updateSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
  index = (index - 1 + slideCount) % slideCount;
  updateSlide();
});

function updateSlide() {
  slides.style.transform = `translateX(${-index * 100}%)`;
}

// Opcional: Autoplay
setInterval(() => {
  index = (index + 1) % slideCount;
  updateSlide();
}, 5000);



  const startDate = new Date('2016-10-23'); // Fecha inicial: 23 de octubre de 2016
  const today = new Date('2025-05-31'); // Fecha actual: 31 de mayo de 2025

  let yearsPassed = today.getFullYear() - startDate.getFullYear();

  // Ajustar si el mes y el día actuales no han pasado todavía
  const monthDiff = today.getMonth() - startDate.getMonth();
  const dayDiff = today.getDate() - startDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    yearsPassed--;
  }

  // Mostrar el resultado en el HTML
  document.getElementById('years').textContent = yearsPassed;


document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.carousel-track');
  const container = document.querySelector('.carousel-container');

  let position = 0;
  let baseSpeed = 0.5; // Velocidad normal (ajústala a gusto)
  let speed = baseSpeed;

  function animate() {
    const trackWidth = track.scrollWidth;
    const containerWidth = container.clientWidth;

    position += speed;

    if (position >= trackWidth) {
      position = -containerWidth; // Reinicia al llegar al final
    }

    track.style.transform = `translateX(-${position}px)`;

    requestAnimationFrame(animate);
  }

  animate();

  // Evento para reducir velocidad al pasar mouse
  container.addEventListener('mouseenter', () => {
    speed = baseSpeed / 3; // Más lento
  });

  container.addEventListener('mouseleave', () => {
    speed = baseSpeed; // Velocidad normal
  });
});


