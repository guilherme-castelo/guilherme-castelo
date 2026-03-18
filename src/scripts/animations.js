/**
 * Handles scroll reveal and loader transitions
 */

export function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealElements = document.querySelectorAll(".reveal, .section-reveal");
  let revealedCount = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealedCount++;

        // Stop observing once revealed
        observer.unobserve(entry.target);

        // Cleanup observer if all are revealed
        if (revealedCount === revealElements.length) {
          observer.disconnect();
        }
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

export function hideLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  requestAnimationFrame(() => {
    loader.style.transition = "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
    loader.style.opacity = "0";
    loader.style.transform = "translateY(-20px) scale(1.02) translateZ(0)";
    loader.style.pointerEvents = "none";

    loader.addEventListener("transitionend", () => {
      loader.classList.add("hidden");
    }, { once: true });
  });
}

export function initSpotlight() {
  try {
    const cards = document.querySelectorAll('.spotlight-card');
    if (!cards || cards.length === 0) return;
    
    for (const card of cards) {
      let bounds;
      
      card.addEventListener('mouseenter', () => {
        bounds = card.getBoundingClientRect();
        card.style.opacity = "1";
      }, { passive: true });

      card.addEventListener('mousemove', (e) => {
        if (!bounds) return;
        requestAnimationFrame(() => {
          const x = e.clientX - bounds.left;
          const y = e.clientY - bounds.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        bounds = null;
      }, { passive: true });
    }
  } catch (err) {
    console.warn("Spotlight effect disabled due to error:", err);
  }
}

