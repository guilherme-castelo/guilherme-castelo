import { fetchProfileData } from "./api.js";
import {
  renderProfile,
  renderAvailabilityBadge,
  renderSkills,
  renderExperience,
  renderProjects,
  renderNavigation,
  renderHeroHighlights,
  renderEducation,
  renderFooter,
  renderSiteMetadata,
  renderSocials,
  renderSectionHeaders,
  renderCertifications,
  renderDifferentials,
  renderProjectDetail,
} from "./renderers.js";
import { initAnimations, hideLoader, initSpotlight } from "./animations.js";
import { stopTerminalLogs } from "./terminal.js";
import { initThemeToggle } from "./theme.js";

const SECTION_IDS = Object.freeze([
  "hero",
  "about",
  "differentials",
  "skills",
  "experience",
  "projects",
  "qualifications",
  "contact",
]);

/**
 * Reveals specified sections by removing the hidden class
 */
function revealSections(ids) {
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
  });
}

function handleRouting(data) {
  const hash = window.location.hash;
  const portfolioView = document.getElementById("portfolio-view");
  const detailView = document.getElementById("project-detail-view");

  if (hash.startsWith("#/project/")) {
    const projectId = hash.replace("#/project/", "");
    const project = data.projects.find(p => p.id === projectId);

    if (project) {
      renderProjectDetail(project);
      portfolioView.classList.replace("block", "hidden");
      detailView.classList.replace("hidden", "block");
      window.scrollTo(0, 0);
      return;
    }
  }

  // Default to portfolio
  portfolioView.classList.replace("hidden", "block");
  detailView.classList.replace("hidden", "block"); // Ensure it's hidden by CSS initially? No, let's be explicit
  detailView.classList.replace("block", "hidden");
  
  // If coming from detail, we might need to scroll to projects
  if (hash === "#/projects") {
    const projSection = document.getElementById("projects");
    if (projSection) projSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function initHashRouter(data) {
  window.addEventListener("hashchange", () => handleRouting(data));
  handleRouting(data);
}

function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const menu = document.getElementById("mobile-menu");
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  if (btn && menu && closeBtn) {
    const openMenu = () => {
      menu.classList.remove("hidden");
      menu.classList.add("flex");
      menu.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    const closeMenu = () => {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
      menu.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      btn.focus();
    };

    btn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);

    // Focus trap & Escape key
    menu.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') {
        const focusableContent = menu.querySelectorAll(focusableElements);
        const first = focusableContent[0];
        const last = focusableContent[focusableContent.length - 1];
        
        if (e.shiftKey) { 
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    });

    // Close menu when clicking any link inside it
    menu.addEventListener("click", (e) => {
      if (e.target.tagName === "A" || e.target.closest("a")) {
        closeMenu();
      }
    });
  }
}

async function bootstrap() {
  try {
    const data = await fetchProfileData();

    // Structural & Global Rendering
    renderSiteMetadata(data.site, data.profile);
    renderNavigation(data.site);
    renderSectionHeaders(data.site.sections);

    // Business Content Rendering
    renderProfile(data.profile);
    renderAvailabilityBadge(data.profile);
    renderSocials(data.profile.socials, data.profile.cvUrl);
    renderHeroHighlights(data.heroHighlights);
    renderDifferentials(data.differentials);
    renderSkills(data.skills);
    renderExperience(data.experience || data.experiences || data.profile?.experience);
    renderProjects(data.projects);
    renderEducation(data.education);
    renderCertifications(data.certifications);
    renderFooter(data.site, data.profile);

    // Populate Mobile CV Link
    const mobileCvBtn = document.getElementById("nav-cv-btn-mobile");
    if (mobileCvBtn && data.profile.cvUrl) mobileCvBtn.href = data.profile.cvUrl;

    // UI Post-processing (deferred to next frame to ensure layouts are painted)
    requestAnimationFrame(() => {
      initThemeToggle();
      initMobileMenu();
      initHashRouter(data);
      revealSections(SECTION_IDS);
      initAnimations();
      try {
        initSpotlight();
      } catch (err) {
        console.warn("Spotlight effect failed to initialize:", err);
      }
      setTimeout(hideLoader, 100);
    });
  } catch (error) {
    console.error("Critical Runtime Error:", error);
    stopTerminalLogs();

    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "1";
      loader.innerHTML = `
        <div class="text-center p-8 glass rounded-3xl border-red-500/20 max-w-sm mx-auto">
          <p class="text-red-500 font-black uppercase tracking-widest mb-2">Erro Crítico</p>
          <p class="text-gray-400 text-sm">Não foi possível carregar o perfil. Por favor, tente novamente mais tarde.</p>
          <button onclick="window.location.reload()" class="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold transition-all uppercase tracking-widest">Recarregar</button>
        </div>
      `;
    }
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);

