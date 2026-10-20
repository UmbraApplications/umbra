/**
 * UMBRA - Interactive UI Enhancements
 * Script leve para interatividade e animações sutis.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------
  // 1. Header Sticky com Vidro Fosco ao Rolar
  // ---------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Executa na carga inicial
  }

  // ---------------------------------------------------------
  // 2. Scroll Reveal Suave (Surgimento Gradual das Seções e Cards)
  // ---------------------------------------------------------
  // Injeta a regra CSS dinâmica para animação sem poluir o arquivo CSS
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .reveal-on-scroll.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .card-spotlight {
      position: relative;
      overflow: hidden;
    }
    .card-spotlight::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      background: radial-gradient(
        500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        oklch(0.62 0.23 295 / 0.18),
        transparent 40%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 2;
    }
    .card-spotlight:hover::before {
      opacity: 1;
    }
  `;
  document.head.appendChild(revealStyle);

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Anima apenas uma vez para não gastar recursos
      }
    });
  }, observerOptions);

  // Elementos selecionados para surgir suavemente
  const elementsToReveal = document.querySelectorAll(
    '.why-card, .architecture-col, .product-card, .tech-layer-card, .labs-card, .metric-item, .contact-grid, .founder-photo'
  );

  elementsToReveal.forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });

  // ---------------------------------------------------------
  // 3. Efeito Spotlight (Luz Violeta Acompanhando o Mouse)
  // ---------------------------------------------------------
  const interactiveCards = document.querySelectorAll('.why-card, .architecture-col, .labs-card, .product-card');

  interactiveCards.forEach(card => {
    card.classList.add('card-spotlight');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ---------------------------------------------------------
  // 4. Arraste Fluido com Mouse/Dedo na Barra Numérica (.process-nav)
  // ---------------------------------------------------------
  const processNav = document.querySelector('.process-nav');

  if (processNav) {
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;

    processNav.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      startX = e.pageX - processNav.offsetLeft;
      scrollLeft = processNav.scrollLeft;
      processNav.style.cursor = 'grabbing';
    });

    processNav.addEventListener('mouseleave', () => {
      isMouseDown = false;
      processNav.style.cursor = 'pointer';
    });

    processNav.addEventListener('mouseup', () => {
      isMouseDown = false;
      processNav.style.cursor = 'pointer';
    });

    processNav.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - processNav.offsetLeft;
      const walk = (x - startX) * 1.8; // Fator de aceleração do arraste
      processNav.scrollLeft = scrollLeft - walk;
    });
  }

  // ---------------------------------------------------------
  // 5. Contador Animado para Métricas e Estatísticas
  // ---------------------------------------------------------
  const metricValues = document.querySelectorAll('.metric-value');

  if (metricValues.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetEl = entry.target;
          const rawText = targetEl.innerText.trim();
          
          // Extrai apenas os números da string (preserva símbolos como +, %, etc)
          const numericValue = parseInt(rawText.replace(/\D/g, ''), 10);
          const prefix = rawText.match(/^[^\d]+/)?.[0] || '';
          const suffix = rawText.match(/[^\d]+$/)?.[0] || '';

          if (!isNaN(numericValue) && numericValue > 0) {
            let start = 0;
            const duration = 1500; // 1.5 segundos
            const steps = 40;
            const increment = numericValue / steps;
            const stepTime = duration / steps;

            const timer = setInterval(() => {
              start += increment;
              if (start >= numericValue) {
                targetEl.innerText = `${prefix}${numericValue}${suffix}`;
                clearInterval(timer);
              } else {
                targetEl.innerText = `${prefix}${Math.floor(start)}${suffix}`;
              }
            }, stepTime);
          }

          observer.unobserve(targetEl);
        }
      });
    }, { threshold: 0.5 });

    metricValues.forEach(val => counterObserver.observe(val));
  }
});
