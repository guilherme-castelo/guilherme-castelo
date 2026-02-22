/**
 * Handles scroll reveal and loader transitions
 */

export function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealElements = document.querySelectorAll(".reveal");
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

  // Fade out using CSS transition
  loader.style.opacity = "0";
  loader.style.pointerEvents = "none";

  // Completely remove or hide after transition finish
  loader.addEventListener("transitionend", () => {
    loader.classList.add("hidden");
  }, { once: true });
}

