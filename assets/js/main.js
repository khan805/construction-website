/**
 * Construction Company Template - Main JavaScript
 * Bootstrap 5.3.8 / Vanilla JS / Swiper / GLightbox / AOS
 */

// ========================================
// Initialize AOS safely
// ========================================
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
  });

  window.addEventListener('load', function() {
    AOS.refresh();
  });
}

// ========================================
// Main Initialization
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  initPreloader();
  initDataBackground();
  initActiveMenu();
  initMobileMenu();
  initStickyHeader();
  initHeroSlider();
  initTestimonialSlider();
  initGallerySlider();
  initCounters();
  initScrollUp();
  initLightbox();
});

// ========================================
// Active Menu Based on Current Page
// ========================================
function initActiveMenu() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('#navigation > li > a');

  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');

    // Check for exact match or index page
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.parentElement.classList.add('active');
    }

    // Check for detail pages (e.g., single-blog.html should highlight Blog)
    if (currentPage === 'single-blog.html' && href === 'blog.html') {
      link.parentElement.classList.add('active');
    }
    if (currentPage === 'project_details.html' && href === 'project.html') {
      link.parentElement.classList.add('active');
    }
    if (currentPage === 'services_details.html' && href === 'services.html') {
      link.parentElement.classList.add('active');
    }

    // Check submenu items
    var submenu = link.parentElement.querySelector('.submenu');
    if (submenu) {
      var submenuLinks = submenu.querySelectorAll('a');
      submenuLinks.forEach(function(subLink) {
        if (subLink.getAttribute('href') === currentPage) {
          link.parentElement.classList.add('active');
        }
      });
    }
  });
}

// ========================================
// Preloader
// ========================================
function initPreloader() {
  var preloader = document.getElementById('preloader-active');
  if (!preloader) return;

  setTimeout(function() {
    preloader.style.transition = 'opacity 0.45s ease';
    preloader.style.opacity = '0';
    document.body.style.overflow = 'visible';
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 450);
  }, 450);
}

// ========================================
// Data Background Handler (WebP for all modern browsers)
// ========================================
function initDataBackground() {
  // All modern browsers (Chrome 32+, Firefox 65+, Safari 14+, Edge 18+) support WebP
  // No detection needed for latest 2-3 browser versions
  document.querySelectorAll('[data-background]').forEach(function(el) {
    var bg = el.getAttribute('data-background');
    bg = bg.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    el.style.backgroundImage = 'url(' + bg + ')';
  });
}

// ========================================
// Mobile Menu (replaces SlickNav)
// ========================================
function initMobileMenu() {
  var nav = document.querySelector('ul#navigation');
  var mobileContainer = document.querySelector('.mobile_menu');
  if (!nav || !mobileContainer) return;

  var toggleBtn = mobileContainer.querySelector('.mobile-menu-toggle');
  var mobileNav = mobileContainer.querySelector('.mobile-nav');

  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.type = 'button';
    toggleBtn.setAttribute('aria-label', 'Open navigation menu');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileContainer.appendChild(toggleBtn);
  }

  if (!mobileNav) {
    mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    mobileNav.setAttribute('aria-label', 'Mobile navigation');
    mobileContainer.appendChild(mobileNav);
  }

  if (!mobileNav.querySelector('#mobile-navigation')) {
    var mobileUl = nav.cloneNode(true);
    mobileUl.id = 'mobile-navigation';
    mobileNav.innerHTML = '';
    mobileNav.appendChild(mobileUl);
  }

  var mobileUl = mobileNav.querySelector('#mobile-navigation');

  // Handle submenu toggles
  mobileUl.querySelectorAll('li').forEach(function(li) {
    var submenu = li.querySelector(':scope > .submenu');
    if (!submenu || li.querySelector(':scope > .submenu-toggle')) return;

    var toggle = document.createElement('button');
    toggle.className = 'submenu-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Toggle submenu');
    toggle.textContent = '+';
    li.insertBefore(toggle, submenu);

    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      var isOpen = submenu.classList.toggle('open');
      li.classList.toggle('is-open', isOpen);
      toggle.textContent = isOpen ? '-' : '+';
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });

  function closeMenu() {
    mobileContainer.classList.remove('open');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('mobile-menu-open');
  }

  toggleBtn.addEventListener('click', function() {
    var isOpen = mobileContainer.classList.toggle('open');
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('mobile-menu-open', isOpen);
  });

  mobileUl.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  document.addEventListener('click', function(event) {
    var clickedInsideMenu = mobileNav.contains(event.target);
    var clickedToggle = toggleBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth >= 992) {
      closeMenu();
    }
  });
}

// ========================================
// Sticky Header
// ========================================
function initStickyHeader() {
  var header = document.querySelector('.header-sticky');
  if (!header) return;

  var scrollThreshold = 245;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('sticky-bar', 'sticky');
    } else {
      header.classList.remove('sticky-bar', 'sticky');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ========================================
// Hero Slider (Swiper with animations)
// ========================================
function initHeroSlider() {
  var sliderEl = document.querySelector('.slider-active');
  if (!sliderEl || typeof Swiper === 'undefined') return;

  // Wrap slides for Swiper
  wrapSwiperSlides(sliderEl);

  var heroSwiper = new Swiper('.slider-active', {
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    on: {
      init: function() {
        triggerSlideAnimations(this.slides[this.activeIndex]);
      },
      slideChangeTransitionStart: function() {
        // Reset all animations
        this.slides.forEach(function(slide) {
          var animatedEls = slide.querySelectorAll('[data-animation]');
          animatedEls.forEach(function(el) {
            el.classList.remove('animated', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight', 'zoomIn');
            el.style.opacity = '0';
          });
        });
      },
      slideChangeTransitionEnd: function() {
        triggerSlideAnimations(this.slides[this.activeIndex]);
      }
    }
  });

  function triggerSlideAnimations(slide) {
    var animatedEls = slide.querySelectorAll('[data-animation]');
    animatedEls.forEach(function(el) {
      var animation = el.getAttribute('data-animation');
      var delay = el.getAttribute('data-delay') || '0s';

      setTimeout(function() {
        el.style.opacity = '1';
        el.classList.add('animated', animation);
      }, parseFloat(delay) * 1000);
    });
  }
}

// ========================================
// Testimonial Slider
// ========================================
function initTestimonialSlider() {
  var testimonialEl = document.querySelector('.h1-testimonial-active');
  if (!testimonialEl || typeof Swiper === 'undefined') return;

  wrapSwiperSlides(testimonialEl);

  // Add navigation buttons
  var navWrapper = document.createElement('div');
  navWrapper.className = 'swiper-nav-wrapper';

  var prevBtn = document.createElement('div');
  prevBtn.className = 'swiper-button-prev';
  prevBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';

  var nextBtn = document.createElement('div');
  nextBtn.className = 'swiper-button-next';
  nextBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';

  navWrapper.appendChild(prevBtn);
  navWrapper.appendChild(nextBtn);
  testimonialEl.appendChild(navWrapper);

  new Swiper('.h1-testimonial-active', {
    slidesPerView: 1,
    loop: true,
    speed: 1000,
    navigation: {
      nextEl: '.h1-testimonial-active .swiper-button-next',
      prevEl: '.h1-testimonial-active .swiper-button-prev'
    }
  });
}

// ========================================
// Gallery Slider (replaces Owl Carousel)
// ========================================
function initGallerySlider() {
  var galleryEl = document.querySelector('.gallery-active');
  if (!galleryEl || typeof Swiper === 'undefined') return;

  wrapSwiperSlides(galleryEl);

  new Swiper('.gallery-active', {
    slidesPerView: 2,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    speed: 2000,
    spaceBetween: 0,
    breakpoints: {
      768: {
        slidesPerView: 3
      }
    }
  });
}

// ========================================
// Counter Animation (replaces CounterUp)
// ========================================
function initCounters() {
  var counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(counter) {
    observer.observe(counter);
  });

  function animateCounter(el) {
    var text = el.textContent.trim();
    var target = parseInt(text);
    if (isNaN(target)) return;

    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.floor(progress * target);

      // Preserve leading zeros if original had them
      if (text.length > 1 && text[0] === '0') {
        el.textContent = String(current).padStart(text.length, '0');
      } else {
        el.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = text; // Restore original format
      }
    }

    el.textContent = '0';
    requestAnimationFrame(step);
  }
}

// ========================================
// Scroll Up Button
// ========================================
function initScrollUp() {
  var scrollBtn = document.createElement('div');
  scrollBtn.id = 'scrollUp';
  scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollBtn.style.cssText = 'display:none;position:fixed;bottom:30px;right:30px;width:50px;height:50px;background:#ff5f13;color:#fff;text-align:center;line-height:50px;cursor:pointer;border-radius:4px;z-index:999;transition:all 0.3s ease;';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  scrollBtn.addEventListener('mouseenter', function() {
    scrollBtn.style.background = '#112e41';
  });

  scrollBtn.addEventListener('mouseleave', function() {
    scrollBtn.style.background = '#ff5f13';
  });
}

// ========================================
// Lightbox (GLightbox)
// ========================================
function initLightbox() {
  if (typeof GLightbox === 'undefined') return;

  // Initialize for elements with glightbox class
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true
  });

  // Also handle legacy img-pop-up class
  var popupElements = document.querySelectorAll('.img-pop-up, .single_gallery_part');
  popupElements.forEach(function(el) {
    if (!el.classList.contains('glightbox')) {
      el.classList.add('glightbox');
      if (!el.getAttribute('data-gallery')) {
        el.setAttribute('data-gallery', 'gallery');
      }
    }
  });

  if (popupElements.length > 0) {
    GLightbox({
      selector: '.img-pop-up, .single_gallery_part',
      touchNavigation: true,
      loop: true
    });
  }
}

// ========================================
// Helper: Wrap Swiper Slides
// ========================================
function wrapSwiperSlides(container) {
  if (container.querySelector('.swiper-wrapper')) return;

  var children = Array.from(container.children);
  var wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  children.forEach(function(child) {
    // Don't wrap navigation elements
    if (child.classList.contains('swiper-button-prev') ||
        child.classList.contains('swiper-button-next') ||
        child.classList.contains('swiper-pagination') ||
        child.classList.contains('swiper-nav-wrapper')) {
      return;
    }
    child.classList.add('swiper-slide');
    wrapper.appendChild(child);
  });

  container.insertBefore(wrapper, container.firstChild);
}
