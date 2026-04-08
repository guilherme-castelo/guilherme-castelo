// import { startTerminalLogs } from "./terminal.js";

/**
 * Senior-level Renderers Module (Version 2.0 - Hyper-Decoupled)
 * Responsibility: Pure UI projection from JSON state.
 * Zero hardcoded strings allowed.
 */

/**
 * Icons & Constants
 */
const ICONS = {
  CHECK: `<svg class="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`,
  ARROW_RIGHT: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`,
};

const CONTACT_CONFIG = {
  email: {
    getHref: (val) => `mailto:${val}`,
    btnClass: "btn-gmail",
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/></svg>`,
  },
  whatsapp: {
    getHref: (val) => `https://wa.me/${val}`,
    btnClass: "btn-whatsapp",
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  },
  instagram: {
    getHref: (val) => `https://instagram.com/${val}`,
    btnClass: "btn-instagram",
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.059 1.278.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.384 1.078 2.126 1.384c.766.297 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.148-.261 2.913-.558.788-.306 1.459-.717 2.126-1.384s1.078-1.384 1.384-2.126c.297-.766.499-1.636.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.059-1.278-.261-2.148-.558-2.913-.306-.788-.717-1.459-1.384-2.126s-1.384-1.078-2.126-1.384c-.766-.297-1.636-.499-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
  },
};

export function renderSiteMetadata(site, profile) {
  if (!site || !profile) return;
  document.title = site.title;

  const setMeta = (attr, key, val) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", val);
  };

  setMeta("name", "description", site.description);
  setMeta("property", "og:title", site.title);
  setMeta("property", "og:description", site.description);
  setMeta("property", "og:image", profile.avatar);
  setMeta("name", "twitter:card", "summary_large_image");

  const skipLink = document.querySelector('a[href="#main-content"]');
  if (skipLink) skipLink.innerText = site.skipLink;

  const logo = document.querySelector("header nav > div:first-child");
  if (logo)
    logo.innerHTML = `${profile.nickname}<span class="text-cyan-500">.</span>`;
}

export function renderNavigation(site) {
  if (!site?.nav) return;
  const navContainer = document.getElementById("main-nav-links");
  const mobileNavContainer = document.getElementById("main-nav-links-mobile");

  const navLinksHTML = site.nav
    .map(
      (item) =>
        `<a href="${item.anchor}" class="nav-link hover:text-white transition-colors block md:inline-block">${item.label}</a>`,
    )
    .join("");

  if (navContainer) {
    navContainer.innerHTML = navLinksHTML;
  }

  if (mobileNavContainer) {
    mobileNavContainer.innerHTML = navLinksHTML;
  }

  const contactBtn = document.querySelector('header a[href="#contact"]');
  if (contactBtn) contactBtn.innerText = site.contactBtn;

  const mobileContactBtn = document.getElementById("mobile-contact-btn");
  if (mobileContactBtn) mobileContactBtn.innerText = site.contactBtn;
}

export function renderProfile(profile) {
  if (!profile) return;
  const eyebrowEl = document.querySelector("#hero h2");
  if (eyebrowEl) {
    const decorator = eyebrowEl.querySelector("span");
    eyebrowEl.innerHTML = `${decorator ? decorator.outerHTML : ""} ${profile.heroEyebrow}`;
  }

  const imgContainer = document.getElementById("user-img");
  const nameEl = document.getElementById("user-name");
  const titleEl = document.getElementById("user-title");
  const summaryEl = document.getElementById("user-summary");

  if (imgContainer)
    imgContainer.innerHTML = `<img src="${profile.avatar}" class="w-full h-full rounded-full object-cover border-4 border-cyan-500/30 z-10 relative" loading="lazy" alt="${profile.name}">`;
  if (nameEl) nameEl.innerText = profile.name;
  if (titleEl) titleEl.innerText = profile.title;
  if (summaryEl) summaryEl.innerText = profile.summary;

  // startTerminalLogs();
}

export function renderSocials(socials, cvUrl) {
  if (!socials) return;
  const container = document.getElementById("hero-social-links");
  if (!container) return;

  const cvBtn = cvUrl ? `
    <a href="${cvUrl}" target="_blank" download
       class="px-8 py-4 flex items-center gap-3 bg-cyan-500 text-slate-900 font-bold rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400">
       <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
       Baixar CV
    </a>
  ` : "";

  const socialLinks = socials
    .map(link => {
      const isLinkedIn = link.label.toLowerCase().includes("linkedin");
      const icon = isLinkedIn 
        ? `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
        : `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12"/></svg>`;

      return `
      <a href="${link.url}" target="_blank" 
         class="px-8 py-4 flex items-center gap-3 bg-white/50 dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-white transition-all transform hover:-translate-y-1 rounded-2xl font-bold">
         ${icon}
         ${link.label}
      </a>
    `})
    .join("");

  container.innerHTML = cvBtn + socialLinks;
}

export function renderHeroHighlights(highlights) {
  if (!highlights) return;
  const container = document.getElementById("hero-highlights-grid");
  if (!container) return;

  container.innerHTML = highlights
    .map(
      (item) => `
      <article class="p-4 md:p-8 rounded-2xl sm:rounded-[2rem] glass dark:bg-white/[0.03] bg-white/40 shine-effect border border-slate-200 dark:border-${item.color}-500/10 dark:hover:border-${item.color}-500/40 transition-all group">
          <h3 class="text-[10px] text-${item.color}-500 uppercase tracking-widest font-black mb-3 opacity-60">${item.label}</h3>
          <p class="text-slate-900 dark:text-white font-extrabold text-md sm:text-lg md:text-1xl lg:text-2xl leading-none">${item.value}</p>
      </article>
    `,
    )
    .join("");
}

export function renderSkills(skills) {
  if (!skills) return;

  // Featured Skill Card
  const featured = skills.featured;
  const featuredEl = document.getElementById("featured-skill");
  if (featuredEl && featured) {
    featuredEl.innerHTML = `
      <div class="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 blur-[120px] pointer-events-none"></div>
      <div class="space-y-3">
          <p class="text-cyan-500 text-xs font-semibold uppercase tracking-wider">${featured.eyebrow}</p>
          <h3 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">${featured.title}</h3>
      </div>
      <p class="text-slate-600 dark:text-gray-400 text-lg md:text-xl font-normal leading-relaxed">${featured.description}</p>
      <div class="flex flex-wrap gap-2.5">
          ${featured.principals.map((s) => `<span class="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">${s}</span>`).join("")}
      </div>
    `;
  }

  const secondaryContainer = document.getElementById("secondary-skills");
  if (!secondaryContainer) return;

  const categories = [
    { key: "frontend", label: "Frontend & UI", color: "cyan" },
    { key: "backend", label: "Backend & Systems", color: "indigo" },
    { key: "database", label: "Database & Data", color: "emerald" },
    { key: "others", label: "Tools & DevOps", color: "slate" },
  ];

  secondaryContainer.innerHTML = categories
    .map(
      (cat) => `
      <div class="spotlight-card bg-white dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 p-8 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-all duration-300 shadow-sm dark:shadow-none hover:scale-[1.02] flex flex-col justify-between">
          <div class="space-y-4">
              <h4 class="text-${cat.color}-500 dark:text-${cat.color}-400 text-xs font-semibold uppercase tracking-wider">${cat.label}</h4>
              <div class="flex flex-wrap gap-x-4 gap-y-3">
                  ${skills[cat.key]
                    .map(
                      (s) => `
                      <p class="text-slate-700 dark:text-gray-300 text-sm font-medium flex items-center gap-2">
                          <span class="w-1.5 h-1.5 bg-${cat.color}-500/40 dark:bg-${cat.color}-400/60 rounded-full"></span>
                          ${s}
                      </p>
                  `,
                    )
                    .join("")}
              </div>
          </div>
      </div>
    `,
    )
    .join("");
}

export function renderExperience(experienceData) {
  try {
    const container = document.getElementById("experience-list");
    if (!container) return;

    // Tolerate multiple schemas
    const experience = experienceData || [];

    if (!Array.isArray(experience) || experience.length === 0) {
      container.innerHTML =
        '<p class="text-gray-500 italic p-6 border border-white/5 rounded-2xl">Nenhuma experiência profissional cadastrada.</p>';
      return;
    }

    container.innerHTML = experience
      .map((exp) => {
        const period = exp.period || "";
        const datetime = period ? period.split(" ")[0] : "";
        const achievements = Array.isArray(exp.achievements)
          ? exp.achievements
          : [];

        return `
        <article class="grid md:grid-cols-12 gap-8 items-start relative section-reveal">
            <div class="md:col-span-4 md:sticky md:top-32">
                <time datetime="${datetime}" class="text-cyan-500 font-mono text-sm mb-2 block font-semibold">${period}</time>
                <h4 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">${exp.role || "Cargo não definido"}</h4>
                <p class="text-cyan-500 dark:text-cyan-400 font-semibold uppercase text-xs tracking-wider mt-1">${exp.company || ""}</p>
            </div>
            <div class="md:col-span-8 space-y-6">
                <p class="text-slate-600 dark:text-gray-400 text-base md:text-lg font-normal leading-relaxed italic border-l-2 border-cyan-500/20 pl-6">${exp.description || ""}</p>
                <ul class="grid gap-4">
                    ${achievements
                      .map(
                        (a) => `
                        <li class="flex items-start gap-3 p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-cyan-500/20 shadow-sm dark:shadow-none transition-all">
                            ${ICONS.CHECK}
                            <span class="text-slate-700 dark:text-gray-300 text-sm leading-relaxed">${a}</span>
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
        </article>
      `;
      })
      .join("");
  } catch (err) {
    console.error("Error rendering experience:", err);
    const container = document.getElementById("experience-list");
    if (container)
      container.innerHTML =
        '<p class="text-red-500 italic p-6">Erro ao carregar seção de experiência.</p>';
  }
}
export function renderProjects(projects) {
  if (!projects || projects.length === 0) return;
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((project, i) => {
      const isFeatured = i === 0;
      const stack = project.tech_stack || [];
      const context = project.context || "";
      const impacts = project.business_impact || [];
      const liveLink = project.links?.live || "";
      const githubLink = project.links?.github || "";
      const hasImage = project.images && project.images.length > 0;
      const imageUrl = hasImage ? project.images[0] : "";

      return `
      <article class="spotlight-card bg-white/90 dark:bg-[#0A0F1C]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 md:p-10 rounded-[2.5rem] flex flex-col gap-6 transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-2xl hover:shadow-cyan-500/5 ${isFeatured ? 'md:col-span-2 featured-project-card' : ''}">
        <div class="flex flex-col md:flex-row justify-between items-start gap-6">
          <div class="space-y-4 flex-1">
            <div class="flex flex-wrap gap-2">
              ${stack.map((tech) => `<span class="px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold tracking-wider rounded-full border border-cyan-500/20">${tech}</span>`).join("")}
            </div>
            <h4 class="${isFeatured ? "text-4xl md:text-5xl" : "text-3xl"} font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">${project.title}</h4>
          </div>
          
          <div class="flex gap-3 shrink-0">
             ${hasImage ? `<button aria-label="Visualizar Imagem" class="view-image-trigger w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex justify-center items-center hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white transition-all" data-index="${i}"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></button>` : ""}
             ${githubLink ? `<a href="${githubLink}" target="_blank" class="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10 flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"><svg class="w-6 h-6 text-slate-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12"/></svg></a>` : ""}
             ${liveLink ? `<a href="${liveLink}" target="_blank" class="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex justify-center items-center hover:bg-cyan-500 text-cyan-600 dark:text-white hover:text-white transition-all"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>` : ""}
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 pt-6 border-t border-slate-200 dark:border-white/5">
          <div class="space-y-4">
            <p class="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white opacity-40">Contexto</p>
            <p class="text-[15px] text-slate-600 dark:text-gray-400 leading-relaxed">${context}</p>
          </div>
          <div class="space-y-4">
             <p class="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white opacity-40">Impacto no Negócio</p>
             <ul class="space-y-3">
                ${impacts
                  .map(
                    (impact) => `
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                    <span class="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">${impact}</span>
                  </li>
                `,
                  )
                  .join("")}
             </ul>
          </div>
        </div>
      </article>
    `;
    })
    .join("");

  // Handle modal trigger for images
  grid.querySelectorAll(".view-image-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-index");
      const project = projects[idx];
      if (project && project.images) {
        openProjectImageModal(project.images);
      }
    });
  });
}

function renderListItem(item) {
  return `
    <article class="grid-cols-12 gap-2 md:flex-row justify-between items-start md:items-center p-6 border-b border-slate-200 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
        <div class="col-span-9">
            <h4 class="text-slate-900 dark:text-white font-bold">${item.degree || item.name}</h4>
            <p class="text-slate-600 dark:text-gray-500 text-sm">${item.institution}</p>
            ${item.description ? `<p class="text-slate-500 dark:text-gray-400 text-sm mt-2">${item.description}</p>` : ""}
        </div>
        <div class="col-span-3 text-right w-full">
          <span class="text-blue-500 font-mono text-xs font-bold">${item.year || item.period}</span>
        </div>
    </article>
  `;
}

export function renderEducation(education) {
  if (!education) return;
  const container = document.getElementById("education-list");
  if (container)
    container.innerHTML = education.map((edu) => renderListItem(edu)).join("");
}

export function renderCertifications(certifications) {
  if (!certifications) return;
  const container = document.getElementById("certification-list");
  if (container)
    container.innerHTML = certifications
      .map((cert) => renderListItem(cert))
      .join("");
}

export function renderSectionHeaders(sections) {
  if (!sections) return;
  Object.keys(sections).forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      const h2 = section.querySelector("h2");
      if (h2)
        h2.innerHTML = `<span class="text-slate-400 dark:text-gray-500 font-mono text-sm mr-2">${sections[id].number}.</span> <span class="text-slate-900 dark:text-white font-bold">${sections[id].title}</span>`;
    }
  });
}

export function renderFooter(site, profile) {
  if (!site || !profile) return;
  const contactSection = document.getElementById("contact");
  if (!contactSection) return;

  const titleEl = contactSection.querySelector("h2");
  const subEl = contactSection.querySelector("p");
  const copyrightEl = contactSection.querySelector("p:last-child");

  if (titleEl) titleEl.innerHTML = site.cta;
  if (subEl) subEl.innerText = site.ctaSub;
  if (copyrightEl) copyrightEl.innerText = site.footerCopyright;

  const contactsContainer = document.getElementById("contact-links");
  if (contactsContainer && profile.contacts) {
    contactsContainer.innerHTML = profile.contacts
      .map((contact) => {
        const config = CONTACT_CONFIG[contact.type] || {
          getHref: (v) => v,
          btnClass:
            "bg-white/50 border border-slate-200 text-slate-700 hover:bg-white dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10",
          icon: "",
        };

        return `
          <a href="${config.getHref(contact.value)}" target="_blank" 
             class="brand-btn ${config.btnClass}"
             aria-label="${contact.label}">
             ${config.icon}
          </a>
        `;
      })
      .join("");
  }
}

// Global Image Modal Component for Projects
let currentModalImages = [];
let currentModalImageIndex = 0;

function updateModalImage() {
  const modal = document.getElementById("project-image-modal");
  if (!modal) return;
  const imgEl = modal.querySelector("#modal-image-img");
  const indexEl = modal.querySelector("#modal-image-counter");
  const prevBtn = modal.querySelector("#modal-prev-btn");
  const nextBtn = modal.querySelector("#modal-next-btn");

  if (currentModalImages.length > 0) {
    imgEl.src = currentModalImages[currentModalImageIndex];
  }

  if (currentModalImages.length > 1) {
    indexEl.textContent = `${currentModalImageIndex + 1} / ${currentModalImages.length}`;
    indexEl.classList.remove("hidden");
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  } else {
    indexEl.classList.add("hidden");
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
  }
}

function openProjectImageModal(images) {
  if (!images || images.length === 0) return;
  currentModalImages = images;
  currentModalImageIndex = 0;

  let modal = document.getElementById("project-image-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "project-image-modal";
    modal.className =
      "fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0A0F1C]/90 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300";
    modal.innerHTML = `
      <div class="relative max-w-6xl w-full flex flex-col items-center justify-center transform scale-95 opacity-0 transition-all duration-300 ease-out h-[90vh]" id="project-image-modal-content">
        <button id="close-image-modal" class="absolute -top-10 md:-top-4 right-0 md:-right-12 bg-white/10 hover:bg-white/30 hover:scale-110 text-white w-10 h-10 rounded-full flex justify-center items-center backdrop-blur-md transition-all shadow-lg border border-white/20 z-[210]" aria-label="Fechar galeria de imagem">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div class="relative w-full h-full flex items-center justify-center group">
            <button id="modal-prev-btn" class="absolute left-2 md:-left-12 z-[210] bg-slate-900/50 hover:bg-slate-900/80 hover:scale-110 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center backdrop-blur-md transition-all shadow-lg border border-white/10 hidden" aria-label="Imagem anterior">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <img id="modal-image-img" src="" alt="Screenshot do Projeto" class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-slate-200/20 dark:border-white/10 relative z-[205] select-none">
            <button id="modal-next-btn" class="absolute right-2 md:-right-12 z-[210] bg-slate-900/50 hover:bg-slate-900/80 hover:scale-110 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center backdrop-blur-md transition-all shadow-lg border border-white/10 hidden" aria-label="Próxima imagem">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </div>
        
        <div id="modal-image-counter" class="absolute -bottom-8 md:-bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-900/60 text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm hidden z-[210]">
           1 / 3
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal
      .querySelector("#close-image-modal")
      .addEventListener("click", () => closeProjectImageModal());
    modal.addEventListener("click", (e) => {
      // Close only if clicking the background, not the image itself or buttons
      if (e.target === modal || e.target === modal.firstElementChild) {
        closeProjectImageModal();
      }
    });

    modal.querySelector("#modal-prev-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      currentModalImageIndex =
        currentModalImageIndex === 0
          ? currentModalImages.length - 1
          : currentModalImageIndex - 1;
      updateModalImage();
    });
    modal.querySelector("#modal-next-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      currentModalImageIndex =
        currentModalImageIndex === currentModalImages.length - 1
          ? 0
          : currentModalImageIndex + 1;
      updateModalImage();
    });

    document.addEventListener("keydown", (e) => {
      if (modal.classList.contains("pointer-events-none")) return;
      if (e.key === "Escape") {
        closeProjectImageModal();
      } else if (e.key === "ArrowLeft") {
        if (currentModalImages.length > 1) {
          currentModalImageIndex =
            currentModalImageIndex === 0
              ? currentModalImages.length - 1
              : currentModalImageIndex - 1;
          updateModalImage();
        }
      } else if (e.key === "ArrowRight") {
        if (currentModalImages.length > 1) {
          currentModalImageIndex =
            currentModalImageIndex === currentModalImages.length - 1
              ? 0
              : currentModalImageIndex + 1;
          updateModalImage();
        }
      }
    });
  }

  updateModalImage();

  // Animation frames for entry
  requestAnimationFrame(() => {
    modal.classList.remove("opacity-0", "pointer-events-none");
    modal.classList.add("opacity-100", "pointer-events-auto");

    const content = modal.querySelector("#project-image-modal-content");
    content.classList.remove("scale-95", "opacity-0");
    content.classList.add("scale-100", "opacity-100");
  });
}

function closeProjectImageModal() {
  let modal = document.getElementById("project-image-modal");
  if (!modal) return;
  modal.classList.remove("opacity-100", "pointer-events-auto");
  modal.classList.add("opacity-0", "pointer-events-none");

  const content = modal.querySelector("#project-image-modal-content");
  if (content) {
    content.classList.remove("scale-100", "opacity-100");
    content.classList.add("scale-95", "opacity-0");
  }

  setTimeout(() => {
    const imgEl = modal.querySelector("#modal-image-img");
    if (imgEl) imgEl.src = "";
  }, 300);
}
