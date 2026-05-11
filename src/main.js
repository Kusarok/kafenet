import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './styles/main.css';
import { servicesData } from './data/services.js';
import { popularServicesData } from './data/popular.js';

const toFa = n => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

// Render Services
const renderServices = () => {
  const container = document.getElementById('services-container');
  if (!container) return;
  
  let html = '';
  servicesData.forEach(s => {
    let content = `<h3>${s.title}</h3>`;
    
    if (s.description) {
      content += `<p>${s.description}</p>`;
    }
    if (s.list) {
      content += `<ul>${s.list.map(l => `<li>${l}</li>`).join('')}</ul>`;
    }
    if (s.price) {
      content += `<p class="pill" style="margin-top:.7rem">${s.price}</p>`;
    }
    if (s.linkText) {
      content += `<p style="margin-top:.8rem"><a href="${s.linkHref}" style="color:var(--brand);text-decoration:underline;">${s.linkText}</a></p>`;
    }
    if (s.payments) {
      content += `<div class="payments">${s.payments.map(p => `<span>${p}</span>`).join('')}</div>`;
    }
    
    let badgeHtml = s.badge ? `<span class="${s.badgeColor}">${s.badge}</span>` : '';
    
    html += `<article class="card ${s.classes || ''}">
      ${badgeHtml}
      ${content}
    </article>`;
  });
  
  container.innerHTML = html;
};

// Render Popular Services
const renderPopularServices = () => {
  const wrapper = document.getElementById('popular-wrapper');
  if (!wrapper) return;
  
  let html = '';
  popularServicesData.forEach(p => {
    html += `<div class="swiper-slide">
      <article class="card" style="height:100%;">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </article>
    </div>`;
  });
  
  wrapper.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', () => {
  // Render Dynamic Data First
  renderServices();
  renderPopularServices();

  // Intersection Observer for Numbers
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = +el.dataset.count;
      let i = 0;
      const t = setInterval(() => {
        i++;
        el.textContent = toFa(i) + (el.tagName === 'H3' || el.tagName === 'B' ? '+' : '');
        if (i >= end) clearInterval(t);
      }, 16);
      countObserver.unobserve(el);
    });
  }, { threshold: .4 });
  
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  // Inner Swiper for popular services
  const sw = new Swiper('#popularSwiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      nested: true,
      breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
  });
  document.getElementById('nextBtn')?.addEventListener('click', () => sw.slideNext());
  document.getElementById('prevBtn')?.addEventListener('click', () => sw.slidePrev());

  // Main Full-screen Gallery Swiper
  const mainSwiper = new Swiper('.main-swiper', {
      direction: 'horizontal',
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: -20,
        depth: 120,
        modifier: 1.2,
        slideShadows: false,
      },
      slidesPerView: 1.15,
      centeredSlides: true,
      mousewheel: {
        sensitivity: 0.4,
        releaseOnEdges: true,
        forceToAxis: true,
        thresholdDelta: 20
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      navigation: {
        nextEl: '.swiper-button-next.main-nav-btn',
        prevEl: '.swiper-button-prev.main-nav-btn',
      },
      speed: 800,
  });
});
