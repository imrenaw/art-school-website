// Анимация появления секций, изображений и плиток
function revealOnScroll() {
  const reveal = (selector, className = 'visible') => {
    document.querySelectorAll(selector).forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add(className);
      }
    });
  };
  reveal('section');
  reveal('.intro-image');
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();

  // Плавный скролл для меню
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        if (window.innerWidth < 700) {
          document.querySelector('.nav').classList.remove('open');
        }
      }
    });
  });

  // Мобильное меню
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.classList.toggle('open');
  });

  // Закрытие меню при клике вне
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 700 && nav.classList.contains('open')) {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('open');
        menuBtn.classList.remove('open');
      }
    }
  });

  // --- Галерея ---
  const images = [
    'images/example1.jpg',
    'images/example2.jpg',
    'images/example3.jpg',
    'images/example4.jpg',
    'images/example5.jpg',
    'images/example6.jpg',
  ];
  let current = 0;
  const mainImg = document.querySelector('.gallery-image');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const leftBtn = document.querySelector('.gallery-arrow.left');
  const rightBtn = document.querySelector('.gallery-arrow.right');
  const galleryMain = document.querySelector('.gallery-main');
  // Lightbox
  const lightbox = document.querySelector('.gallery-lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxLeft = document.querySelector('.lightbox-arrow.left');
  const lightboxRight = document.querySelector('.lightbox-arrow.right');

  function showImage(idx) {
    current = (idx + images.length) % images.length;
    mainImg.src = images[current];
    mainImg.setAttribute('data-index', current);
    thumbs.forEach(t => t.classList.remove('active'));
    if (thumbs[current]) thumbs[current].classList.add('active');
  }

  leftBtn.addEventListener('click', () => showImage(current - 1));
  rightBtn.addEventListener('click', () => showImage(current + 1));
  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => showImage(idx));
  });

  // Lightbox open
  galleryMain.addEventListener('click', () => {
    lightbox.classList.add('open');
    lightboxImg.src = images[current];
    lightboxImg.setAttribute('data-index', current);
    lightboxImg.focus();
  });
  // Lightbox close
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxShow(current - 1);
    if (e.key === 'ArrowRight') lightboxShow(current + 1);
  });
  function lightboxShow(idx) {
    current = (idx + images.length) % images.length;
    lightboxImg.src = images[current];
    lightboxImg.setAttribute('data-index', current);
    thumbs.forEach(t => t.classList.remove('active'));
    if (thumbs[current]) thumbs[current].classList.add('active');
    showImage(current);
  }
  lightboxLeft.addEventListener('click', () => lightboxShow(current - 1));
  lightboxRight.addEventListener('click', () => lightboxShow(current + 1));

  // Свайпы для мобильных
  let startX = null;
  galleryMain.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  galleryMain.addEventListener('touchend', e => {
    if (startX === null) return;
    let dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) showImage(current + 1);
      else showImage(current - 1);
    }
    startX = null;
  });
  // Свайпы в lightbox
  let lbStartX = null;
  lightboxImg.addEventListener('touchstart', e => {
    lbStartX = e.touches[0].clientX;
  });
  lightboxImg.addEventListener('touchend', e => {
    if (lbStartX === null) return;
    let dx = e.changedTouches[0].clientX - lbStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) lightboxShow(current + 1);
      else lightboxShow(current - 1);
    }
    lbStartX = null;
  });

  // Инициализация
  showImage(0);
});
