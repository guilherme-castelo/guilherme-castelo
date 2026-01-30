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
} from "./renderers.js";
import { initAnimations, hideLoader } from "./animations.js";

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
    renderFooter(data.site, data.profile);

    // Reveal Sections
    [
      "hero",
      "about",
      "skills",
      "experience",
      "projects",
      "education-section",
      "contact",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.remove("hidden");
    });

    // UI Post-processing
    hideLoader();
    initAnimations();
  } catch (error) {
    console.error("Critical Runtime Error:", error);
    const loader = document.getElementById("loader");
    if (loader) {
      loader.innerHTML = `
                <div class="text-center p-8 glass rounded-3xl border-red-500/20">
                    <p class="text-red-500 font-black uppercase tracking-widest mb-2">Erro Crítico</p>
                    <p class="text-gray-400 text-sm">Não foi possível carregar o perfil. Por favor, tente novamente.</p>
                </div>
            `;
    }
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
