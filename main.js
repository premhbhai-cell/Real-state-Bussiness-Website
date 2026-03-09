

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      navMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const residenceCards = document.querySelectorAll('.residence-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      residenceCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  const favoriteButtons = document.querySelectorAll('.residence-favorite');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      button.classList.toggle('favorited');

      const svg = button.querySelector('svg path');
      if (button.classList.contains('favorited')) {
        svg.setAttribute('fill', 'currentColor');
        svg.setAttribute('stroke', 'none');

        button.style.animation = 'heartbeat 0.6s ease';
        setTimeout(() => {
          button.style.animation = '';
        }, 600);
      } else {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
      }
    });
  });

  const valueItems = document.querySelectorAll('.value-item');
  valueItems.forEach(item => {
    const header = item.querySelector('.value-item-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      valueItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  if (valueItems.length > 0) {
    valueItems[0].classList.add('active');
  }

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.residence-card, .testimonial-card, .contact-method');
  animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  const searchInput = document.querySelector('.search-box input');
  const searchBtn = document.querySelector('.btn-search');

  const handleSearch = () => {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
      searchBtn.innerHTML = '<span>Searching...</span>';
      searchBtn.style.background = '#10b981';

      setTimeout(() => {
        const residencesSection = document.getElementById('residences');
        residencesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
          searchBtn.innerHTML = `
            <span>Search</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          searchBtn.style.background = '';
        }, 1000);
      }, 800);
    }
  };

  searchBtn.addEventListener('click', handleSearch);

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  searchInput.addEventListener('focus', () => {
    searchInput.parentElement.style.transform = 'scale(1.02)';
  });

  searchInput.addEventListener('blur', () => {
    searchInput.parentElement.style.transform = 'scale(1)';
  });

  const stats = document.querySelectorAll('.stat-item h3');

  const animateStats = () => {
    stats.forEach(stat => {
      const count = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const updateCount = () => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuad = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOutQuad * count);

        if (count >= 1000) {
          stat.textContent = Math.floor(currentCount / 1000) + 'K+';
        } else {
          stat.textContent = currentCount + '+';
        }

        if (currentStep < steps) {
          setTimeout(updateCount, stepDuration);
        } else {
          if (count >= 1000) {
            stat.textContent = Math.floor(count / 1000) + 'K+';
          } else {
            stat.textContent = count + '+';
          }
        }
      };

      updateCount();
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const residenceCards2 = document.querySelectorAll('.residence-card');
  residenceCards2.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', () => {
      card.style.zIndex = '1';
    });

    card.addEventListener('click', (e) => {
      if (!e.target.closest('.residence-favorite')) {
        const name = card.querySelector('.residence-name').textContent;
        const price = card.querySelector('.residence-price').textContent;

        const modal = document.createElement('div');
        modal.className = 'property-modal';
        modal.innerHTML = `
          <div class="modal-overlay"></div>
          <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${name}</h2>
            <p class="modal-price">${price}</p>
            <p>Property details would appear here. This is a demo modal showing interactive functionality.</p>
            <button class="btn-primary" style="margin-top: 24px;">Schedule Viewing</button>
          </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        setTimeout(() => modal.classList.add('active'), 10);

        const closeModal = () => {
          modal.classList.remove('active');
          setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
          }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
      }
    });
  });

  const ctaForm = document.querySelector('.cta-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = ctaForm.querySelector('input[type="email"]');
      const submitBtn = ctaForm.querySelector('.btn-primary');

      if (emailInput.value.trim()) {
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.textContent = '✓ Subscribed!';
          submitBtn.style.background = '#10b981';

          setTimeout(() => {
            emailInput.value = '';
            submitBtn.textContent = 'Get Started';
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 3000);
        }, 1500);
      }
    });
  }

  const contactMethods = document.querySelectorAll('.contact-method');
  contactMethods.forEach(method => {
    const btn = method.querySelector('.btn-outline');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const methodType = method.querySelector('h4').textContent;

      btn.textContent = 'Connecting...';
      btn.style.pointerEvents = 'none';

      setTimeout(() => {
        btn.textContent = `${methodType} Initiated ✓`;
        btn.style.background = 'var(--primary-color)';
        btn.style.color = 'white';

        setTimeout(() => {
          btn.textContent = btn.textContent.replace(' Initiated ✓', ' Now');
          btn.style.background = '';
          btn.style.color = '';
          btn.style.pointerEvents = '';
        }, 2000);
      }, 1000);
    });
  });

  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const partnerLogos = document.querySelectorAll('.partner-logo');
  partnerLogos.forEach((logo, index) => {
    logo.style.animation = `fadeIn 0.6s ease ${index * 0.1}s both`;
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-btn')) {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  const addParallaxEffect = () => {
    const heroImage = document.querySelector('.hero-image-wrapper');
    const valueImage = document.querySelector('.value-image-wrapper');
    const contactImage = document.querySelector('.contact-image-wrapper');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;

      if (heroImage) {
        const heroOffset = heroImage.getBoundingClientRect().top;
        if (heroOffset < window.innerHeight && heroOffset > -heroImage.offsetHeight) {
          heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
      }

      if (valueImage) {
        const valueOffset = valueImage.getBoundingClientRect().top;
        if (valueOffset < window.innerHeight && valueOffset > -valueImage.offsetHeight) {
          valueImage.style.transform = `translateY(${(scrolled - valueImage.offsetTop) * 0.05}px)`;
        }
      }

      if (contactImage) {
        const contactOffset = contactImage.getBoundingClientRect().top;
        if (contactOffset < window.innerHeight && contactOffset > -contactImage.offsetHeight) {
          contactImage.style.transform = `translateY(${(scrolled - contactImage.offsetTop) * 0.05}px)`;
        }
      }
    });
  };

  addParallaxEffect();

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes heartbeat {
      0%, 100% {
        transform: scale(1);
      }
      25% {
        transform: scale(1.3);
      }
      50% {
        transform: scale(1.1);
      }
      75% {
        transform: scale(1.2);
      }
    }

    .property-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .property-modal.active {
      opacity: 1;
    }

    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
    }

    .modal-content {
      position: relative;
      background: white;
      padding: 48px;
      border-radius: 24px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      transform: scale(0.9);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .property-modal.active .modal-content {
      transform: scale(1);
    }

    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      border: none;
      background: #f1f5f9;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .modal-close:hover {
      background: #e2e8f0;
      transform: rotate(90deg);
    }

    .modal-content h2 {
      font-size: 28px;
      margin-bottom: 12px;
      color: #0f172a;
    }

    .modal-price {
      font-size: 24px;
      font-weight: 800;
      color: #2563eb;
      margin-bottom: 20px;
    }

    .modal-content p {
      color: #64748b;
      line-height: 1.8;
    }

    .residence-favorite.favorited {
      background: #ef4444 !important;
      color: white !important;
    }
  `;
  document.head.appendChild(style);

  console.log('%c🏠 Holux Real Estate Website', 'color: #2563eb; font-size: 24px; font-weight: bold;');
  console.log('%cBuilt with modern web technologies', 'color: #64748b; font-size: 14px;');
  console.log('%cAll interactions and animations are working perfectly!', 'color: #10b981; font-size: 14px;');
});


// propert buttom 
  function sendDetails(btn){

let card = btn.closest(".residence-card");

let name = card.querySelector(".residence-name").innerText;
let price = card.querySelector(".residence-price").innerText;
let location = card.querySelector(".residence-location").innerText;

let features = card.querySelectorAll(".feature");

let beds = features[0].innerText;
let baths = features[1].innerText;
let area = features[2].innerText;

let message =
`Hello,
Mujhe is property me interest hai.

Property: ${name}
Price: ${price}
Location: ${location}

Features: ${beds}, ${baths}, ${area}

Please price, downpayment aur full details bhejiye.`;

let url="https://wa.me/918130112531?text="+encodeURIComponent(message);

window.open(url,"_blank");

}

// contact form with map

document.getElementById("whatsappForm").addEventListener("submit", function(e){

e.preventDefault();

var name=document.getElementById("name").value;
var phone=document.getElementById("phone").value;
var email=document.getElementById("email").value;
var service=document.getElementById("service").value;
var message=document.getElementById("message").value;

var text="New Property Inquiry%0A%0A"
+"Name: "+name+"%0A"
+"Phone: "+phone+"%0A"
+"Email: "+email+"%0A"
+"Service: "+service+"%0A"
+"Message: "+message;

var whatsapp="https://wa.me/919876543210?text="+text;

window.open(whatsapp,"_blank");

});

