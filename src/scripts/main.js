import { fetchProfileData } from "./api.js";
import {
  renderProfile,
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
} from "./renderers.js";
import { initAnimations, hideLoader } from "./animations.js";
import { stopTerminalLogs } from "./terminal.js";

const SECTION_IDS = Object.freeze([
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "education-section",
  "certification-section",
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

async function bootstrap() {
  try {
    const data = await fetchProfileData();

    // Structural & Global Rendering
    renderSiteMetadata(data.site, data.profile);
    renderNavigation(data.site);
    renderSectionHeaders(data.site.sections);

    // Business Content Rendering
    renderProfile(data.profile);
    renderSocials(data.profile.socials);
    renderHeroHighlights(data.heroHighlights);
    renderSkills(data.skills);
    renderExperience(data.experience);
    renderProjects(data.projects);
    renderEducation(data.education);
    renderCertifications(data.certifications);
    renderFooter(data.site, data.profile);

    // UI Post-processing
    revealSections(SECTION_IDS);
    hideLoader();
    initAnimations();
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

