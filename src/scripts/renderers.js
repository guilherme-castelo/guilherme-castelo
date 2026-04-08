/**
 * Senior-level Renderers Module (Version 3.0 — Redesign)
 * Responsibility: Pure UI projection from JSON state.
 * Zero hardcoded strings allowed.
 */

// ─── Icons & Constants ────────────────────────────────────────────────────────
const ICONS = {
  CHECK: `<svg class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`,
  ARROW_RIGHT: `<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`,
  GITHUB: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12"/></svg>`,
  LINKEDIN: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  WHATSAPP: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  EMAIL: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/></svg>`,
  LAYERS: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>`,
  PLUG: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`,
  ZAP: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"></path></svg>`,
  EXTERNAL: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`,
  DOWNLOAD: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
};

const DIFFERENTIAL_ICONS = {
  layers: ICONS.LAYERS,
  plug: ICONS.PLUG,
  zap: ICONS.ZAP,
};

const CONTACT_CONFIG = {
  email: {
    getHref: (val) => `mailto:${val}`,
    btnClass: "btn-gmail",
    icon: ICONS.EMAIL,
  },
  whatsapp: {
    getHref: (val) => `https://wa.me/${val}`,
    btnClass: "btn-whatsapp",
    icon: ICONS.WHATSAPP,
  },
};

// ─── Site Metadata ─────────────────────────────────────────────────────────────
export function renderSiteMetadata(site, profile) {
  if (!site || !profile) return;
  document.title = `${profile.name} | Backend & Infrastructure Developer`;

  const setMeta = (attr, key, val) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", val);
  };

  const desc =
    "Desenvolvedor Backend especializado em integração de sistemas, ERP Winthor, Oracle e automação de processos corporativos.";
  setMeta("name", "description", desc);
  setMeta("property", "og:title", `${profile.name} | Backend Developer`);
  setMeta("property", "og:description", desc);
  setMeta("property", "og:image", profile.avatar);
  setMeta("name", "twitter:card", "summary_large_image");

  const skipLink = document.querySelector('a[href="#main-content"]');
  if (skipLink) skipLink.innerText = site.skipLink;

  const logo = document.querySelector("header nav > div:first-child");
  if (logo)
    logo.innerHTML = `${profile.nickname}<span class="text-cyan-500">.</span>`;

  // Populate nav CV button
  const navCvBtn = document.getElementById("nav-cv-btn");
  if (navCvBtn && profile.cvUrl) navCvBtn.href = profile.cvUrl;
}

// ─── Navigation ────────────────────────────────────────────────────────────────
export function renderNavigation(site) {
  if (!site?.nav) return;
  const navContainer = document.getElementById("main-nav-links");
  const mobileNavContainer = document.getElementById("main-nav-links-mobile");

  const navLinksHTML = site.nav
    .map(
      (item) =>
        `<a href="${item.anchor}" class="nav-link hover:text-slate-900 dark:hover:text-white transition-colors block md:inline-block">${item.label}</a>`,
    )
    .join("");

  if (navContainer) navContainer.innerHTML = navLinksHTML;
  if (mobileNavContainer) mobileNavContainer.innerHTML = navLinksHTML;

  const contactBtn = document.querySelector('header a[href="#contact"]');
  if (contactBtn) contactBtn.innerText = site.contactBtn;

  const mobileContactBtn = document.getElementById("mobile-contact-btn");
  if (mobileContactBtn) mobileContactBtn.innerText = site.contactBtn;
}

// ─── Profile ───────────────────────────────────────────────────────────────────
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
    imgContainer.innerHTML = `
      <div class="relative">
        <img src="${profile.avatar}" 
             class="w-full h-full rounded-full object-cover border-[3px] border-white dark:border-white/10 shadow-xl dark:shadow-cyan-500/5 z-10 relative" 
             loading="lazy" 
             alt="Foto de perfil de ${profile.name}">
        <div class="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl"></div>
      </div>`;
  if (nameEl) nameEl.innerText = profile.name;
  if (titleEl) titleEl.innerText = profile.title;
  if (summaryEl) summaryEl.innerText = profile.summary;
}

// ─── Availability Badge ────────────────────────────────────────────────────────
export function renderAvailabilityBadge(profile) {
  const container = document.getElementById("availability-badge");
  if (!container || !profile?.available) return;

  container.innerHTML = `
    <span class="availability-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                 bg-emerald-500/10 border border-emerald-500/25 
                 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      ${profile.availableLabel || "Disponível"}
    </span>
  `;
}

// ─── Socials & CV ──────────────────────────────────────────────────────────────
export function renderSocials(socials, cvUrl) {
  if (!socials) return;
  const container = document.getElementById("hero-social-links");
  if (!container) return;

  // Primary Action: Download CV
  const cvBtn = cvUrl
    ? `
    <a href="${cvUrl}" id="hero-cv-btn" target="_blank" download
       class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-cyan-500 text-slate-900 font-bold rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 hover:shadow-cyan-400/30 text-sm">
       ${ICONS.DOWNLOAD}
       Baixar CV
    </a>
  `
    : "";

  // Secondary Actions: Social Links
  const socialLinks = socials
    .map((link) => {
      const isLinkedIn = link.label.toLowerCase().includes("linkedin");
      const isGitHub = link.label.toLowerCase().includes("github");
      const isWhatsApp = link.label.toLowerCase().includes("whatsapp");

      const icon = isLinkedIn
        ? ICONS.LINKEDIN
        : isGitHub
          ? ICONS.GITHUB
          : isWhatsApp
            ? ICONS.WHATSAPP
            : "";

      return `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer"
         class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/8 transition-all hover:-translate-y-0.5 rounded-2xl font-medium text-sm">
         ${icon}
         <span class="hidden sm:inline">${link.label}</span>
      </a>
    `;
    })
    .join("");

  container.innerHTML = `
    <div class="w-full flex flex-col sm:flex-row gap-3">
      ${cvBtn}
      <div class="flex flex-1 gap-3">
        ${socialLinks}
      </div>
    </div>
  `;
}

// ─── Hero Highlights (KPI Counters) ───────────────────────────────────────────
export function renderHeroHighlights(highlights) {
  if (!highlights) return;
  const container = document.getElementById("hero-highlights-grid");
  if (!container) return;

  container.innerHTML = highlights
    .map(
      (item) => `
      <article class="kpi-card p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-slate-200 dark:border-white/8 hover:border-cyan-500/30 dark:hover:border-cyan-500/20 transition-all group">
          <p class="text-[10px] text-cyan-600 dark:text-cyan-500 uppercase tracking-widest font-bold mb-3 opacity-70">${item.label}</p>
          <p class="text-slate-900 dark:text-white font-black text-3xl leading-none mb-1.5 ${item.animated ? "kpi-value" : ""}" data-target="${item.value}" data-animated="${item.animated}">${item.value}</p>
          <p class="text-slate-500 dark:text-gray-500 text-xs leading-snug font-mono">${item.suffix || ""}</p>
      </article>
    `,
    )
    .join("");

  // Animate numeric counters
  setTimeout(() => animateCounters(), 600);
}

function animateCounters() {
  document
    .querySelectorAll('.kpi-value[data-animated="true"]')
    .forEach((el) => {
      const raw = el.getAttribute("data-target") || "";
      const cleaned = raw.replace(/\D/g, "");
      const suffix = raw.replace(/\d/g, "");
      const target = parseInt(cleaned, 10);
      if (isNaN(target)) return;

      let current = 0;
      const duration = 1200;
      const step = duration / target;
      const timer = setInterval(() => {
        current++;
        el.textContent = `${current}${suffix}`;
        if (current >= target) clearInterval(timer);
      }, step);
    });
}

// ─── Differentials ────────────────────────────────────────────────────────────
export function renderDifferentials(differentials) {
  if (!differentials || differentials.length === 0) return;

  const section = document.getElementById("differentials");
  const grid = document.getElementById("differentials-grid");
  if (!section || !grid) return;

  section.classList.remove("hidden");

  grid.innerHTML = differentials
    .map((item, i) => {
      const icon = DIFFERENTIAL_ICONS[item.icon] || ICONS.ZAP;
      const tags = (item.tags || [])
        .map((tag) => `<span class="diff-tag">${tag}</span>`)
        .join("");

      return `
      <article class="differential-card p-8 rounded-2xl flex flex-col gap-5 reveal" style="transition-delay: ${i * 0.1}s">
        <div class="diff-icon">${icon}</div>
        <div class="space-y-2">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight">${item.title}</h3>
          <p class="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">${item.description}</p>
        </div>
        <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
          ${tags}
        </div>
      </article>
    `;
    })
    .join("");
}

// ─── Skills ────────────────────────────────────────────────────────────────────
export function renderSkills(skills) {
  if (!skills) return;

  const featured = skills.featured;
  const featuredEl = document.getElementById("featured-skill");
  if (featuredEl && featured) {
    featuredEl.innerHTML = `
      <div class="absolute -right-16 -top-16 w-64 h-64 bg-cyan-500/8 blur-[100px] pointer-events-none rounded-full"></div>
      <div class="space-y-2 relative z-10">
          <p class="text-cyan-500 text-xs font-bold uppercase tracking-widest">${featured.eyebrow}</p>
          <h3 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">${featured.title}</h3>
      </div>
      <p class="text-slate-500 dark:text-gray-400 text-base font-normal leading-relaxed relative z-10">${featured.description}</p>
      <div class="flex flex-wrap gap-2 relative z-10">
          ${featured.principals.map((s) => `<span class="px-3 py-1.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">${s}</span>`).join("")}
      </div>
    `;
  }

  const secondaryContainer = document.getElementById("secondary-skills");
  if (!secondaryContainer) return;

  const categories = [
    { key: "backend", label: "Backend & Systems", color: "indigo" },
    { key: "frontend", label: "Frontend & UI", color: "cyan" },
    { key: "database", label: "Database & Data", color: "emerald" },
    { key: "others", label: "Infrastructure & Tools", color: "slate" },
  ];

  secondaryContainer.innerHTML = categories
    .map(
      (cat) => `
      <div class="skill-card p-7 rounded-2xl flex flex-col gap-5">
          <h4 class="text-${cat.color}-600 dark:text-${cat.color}-400 text-xs font-bold uppercase tracking-widest">${cat.label}</h4>
          <div class="flex flex-wrap gap-x-4 gap-y-2.5">
              ${(skills[cat.key] || [])
                .map(
                  (s) => `
                  <p class="text-slate-600 dark:text-gray-300 text-sm font-medium flex items-center gap-2">
                      <span class="w-1.5 h-1.5 bg-${cat.color}-500/60 dark:bg-${cat.color}-400/60 rounded-full flex-shrink-0"></span>
                      ${s}
                  </p>
              `,
                )
                .join("")}
          </div>
      </div>
    `,
    )
    .join("");
}

// ─── Experience ────────────────────────────────────────────────────────────────
export function renderExperience(experienceData) {
  try {
    const container = document.getElementById("experience-list");
    if (!container) return;

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
            <div class="md:col-span-4 md:sticky md:top-32 space-y-2">
                <time datetime="${datetime}" class="font-mono text-xs text-cyan-600 dark:text-cyan-500 font-semibold block">${period}</time>
                <h4 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">${exp.role || "Cargo não definido"}</h4>
                <p class="text-slate-400 dark:text-gray-500 font-medium text-sm uppercase tracking-wider">${exp.company || ""}</p>
            </div>
            <div class="md:col-span-8 space-y-6">
                <p class="text-slate-500 dark:text-gray-400 text-base font-normal leading-relaxed border-l-2 border-cyan-500/20 pl-5 italic">${exp.description || ""}</p>
                <ul class="grid gap-3">
                    ${achievements
                      .map(
                        (a) => `
                        <li class="flex items-start gap-3 p-4 rounded-xl bg-white/70 dark:bg-white/[0.025] border border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 transition-colors">
                            ${ICONS.CHECK}
                            <span class="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">${a}</span>
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

    // Show CTA after experience
    const cta = document.getElementById("experience-cta");
    if (cta) cta.classList.remove("hidden");
  } catch (err) {
    console.error("Error rendering experience:", err);
    const container = document.getElementById("experience-list");
    if (container)
      container.innerHTML =
        '<p class="text-red-500 italic p-6">Erro ao carregar seção de experiência.</p>';
  }
}

// ─── Projects ──────────────────────────────────────────────────────────────────
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

      return `
      <article class="project-card spotlight-card ${isFeatured ? "md:col-span-2 project-card--featured" : ""} flex flex-col gap-0 overflow-hidden rounded-[2rem]">
        <div class="p-8 ${isFeatured ? "md:p-10" : ""} flex flex-col gap-5 flex-1">
          <div class="flex flex-wrap gap-1.5">
            ${stack.slice(0, 4).map((tech) => `<span class="tech-badge">${tech}</span>`).join("")}
            ${stack.length > 4 ? `<span class="tech-badge opacity-60">+${stack.length - 4}</span>` : ""}
          </div>

          <div class="space-y-1">
            <h4 class="${isFeatured ? "text-3xl md:text-5xl" : "text-2xl"} font-black text-slate-900 dark:text-white tracking-tight leading-tight">${project.title}</h4>
            ${project.subtitle ? `<p class="text-slate-500 dark:text-gray-500 text-sm font-mono">${project.subtitle}</p>` : ""}
          </div>

          <p class="text-slate-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">${context}</p>
          
          <ul class="grid gap-2 pt-2">
            ${impacts
              .slice(0, isFeatured ? 3 : 2)
              .map(
                (impact) => `
              <li class="flex items-center gap-2.5">
                ${ICONS.CHECK}
                <span class="text-slate-600 dark:text-gray-400 text-xs font-medium">${impact}</span>
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>

        <div class="px-8 pb-8 ${isFeatured ? "md:px-10 md:pb-10" : ""} pt-2">
          <a href="#/project/${project.id}" 
             class="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-all hover:gap-4 hover:shadow-xl">
            Ver detalhes do projeto
            ${ICONS.ARROW_RIGHT}
          </a>
        </div>
      </article>
    `;
    })
    .join("");
}

// ─── Project Detail View ───────────────────────────────────────────────────────
export function renderProjectDetail(project) {
  const container = document.getElementById("project-detail-content");
  if (!container || !project) return;

  const stack = project.tech_stack || [];
  const impacts = project.business_impact || [];

  container.innerHTML = `
    <nav class="flex items-center justify-between py-10 mb-8 border-b border-slate-200 dark:border-white/5">
      <a href="#/projects" class="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors text-sm font-bold group">
        <svg class="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        Voltar para o portfólio
      </a>
      
      <div class="flex items-center gap-4">
        ${project.links?.github ? `<a href="${project.links.github}" target="_blank" class="text-slate-400 hover:text-white transition-colors">${ICONS.GITHUB}</a>` : ""}
        ${project.links?.live ? `<a href="${project.links.live}" target="_blank" class="px-5 py-2 rounded-full bg-cyan-500 text-slate-900 text-xs font-bold hover:bg-cyan-400 transition-all">Ver projeto ↗</a>` : ""}
      </div>
    </nav>

    <div class="project-detail-hero space-y-6 mb-16">
      <div class="flex flex-wrap gap-2">
        ${stack.map((t) => `<span class="tech-badge">${t}</span>`).join("")}
      </div>
      <div class="space-y-4">
        <h1 class="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">${project.title}</h1>
        <p class="text-xl md:text-2xl text-slate-500 dark:text-gray-400 font-mono">${project.subtitle || ""}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
      <div class="space-y-4">
        <h3 class="text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500">O Problema</h3>
        <p class="text-lg text-slate-600 dark:text-gray-300 leading-relaxed font-normal">${project.context}</p>
      </div>
      <div class="space-y-4">
        <h3 class="text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500">A Solução</h3>
        <p class="text-lg text-slate-600 dark:text-gray-300 leading-relaxed font-normal">${project.solution}</p>
      </div>
    </div>

    <div class="space-y-10 mb-20">
      <h3 class="text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500">Impacto no Negócio</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${impacts.map((imp) => `
          <div class="impact-card flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
              ${ICONS.CHECK.replace("w-4 h-4", "w-5 h-5")}
            </div>
            <p class="text-slate-600 dark:text-gray-300 text-base leading-snug">${imp}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// ─── Education & Certifications ────────────────────────────────────────────────
function renderListItem(item) {
  return `
    <article class="flex justify-between items-start gap-4 p-5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
        <div class="space-y-0.5 flex-1">
            <h4 class="text-slate-900 dark:text-white font-semibold text-sm leading-snug">${item.degree || item.name}</h4>
            <p class="text-slate-500 dark:text-gray-500 text-xs">${item.institution}</p>
            ${item.description ? `<p class="text-slate-400 dark:text-gray-500 text-xs mt-1.5 leading-relaxed">${item.description}</p>` : ""}
        </div>
        <span class="text-cyan-600 dark:text-cyan-500 font-mono text-xs font-semibold whitespace-nowrap">${item.year || item.period}</span>
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
  if (!container) return;

  container.innerHTML = certifications
    .map((cert) => `
      <div class="accordion-item rounded-2xl overflow-hidden shadow-sm">
        <button class="accordion-trigger group" aria-expanded="false">
          <div class="flex flex-col gap-0.5">
            <span class="text-cyan-600 dark:text-cyan-500 font-mono text-[10px] font-bold tracking-widest">${cert.period}</span>
            <h4 class="text-slate-900 dark:text-white font-bold text-sm leading-tight">${cert.name}</h4>
            <p class="text-slate-400 dark:text-gray-500 text-xs">${cert.institution}</p>
          </div>
          <svg class="accordion-icon w-5 h-5 text-slate-300 dark:text-gray-600 group-hover:text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div class="accordion-content">
          <div class="px-6 pb-6 pt-0 space-y-3">
             <div class="h-[1px] w-12 bg-cyan-500/20 mb-4"></div>
             <p class="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">${cert.description}</p>
             <p class="text-[10px] font-black tracking-widest uppercase text-slate-400 dark:text-gray-500">Carga Horária: ${cert.hours}</p>
          </div>
        </div>
      </div>
    `).join("");

  // Attach accordion handlers
  const items = container.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close others (optional, common practice)
      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ─── Section Headers ───────────────────────────────────────────────────────────
export function renderSectionHeaders(sections) {
  if (!sections) return;
  Object.keys(sections).forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      const h2 = section.querySelector("h2");
      if (h2)
        h2.innerHTML = `<span class="text-slate-300 dark:text-gray-600 font-mono text-sm mr-2 font-normal">${sections[id].number}.</span><span class="text-slate-900 dark:text-white font-bold">${sections[id].title}</span>`;
    }
  });
}

// ─── Footer ────────────────────────────────────────────────────────────────────
export function renderFooter(site, profile) {
  if (!site || !profile) return;
  const contactSection = document.getElementById("contact");
  if (!contactSection) return;

  const titleEl = contactSection.querySelector("h2");
  const subEl = contactSection.querySelector("p:not(:last-child)");
  const copyrightEl = contactSection.querySelector("p:last-child");

  if (titleEl) titleEl.innerHTML = site.cta;
  if (subEl) subEl.innerText = site.ctaSub;
  if (copyrightEl) copyrightEl.innerText = site.footerCopyright;

  const contactsContainer = document.getElementById("contact-links");
  if (contactsContainer && profile.contacts) {
    // Social links in footer
    const socialLinks = (profile.socials || [])
      .map((link) => {
        const isLinkedIn = link.label.toLowerCase().includes("linkedin");
        const isGitHub = link.label.toLowerCase().includes("github");
        const isWhatsApp = link.label.toLowerCase().includes("whatsapp");
        const icon = isLinkedIn
          ? ICONS.LINKEDIN
          : isGitHub
            ? ICONS.GITHUB
            : isWhatsApp
              ? ICONS.WHATSAPP
              : "";

        return `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-2.5 px-6 py-3 bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-white rounded-2xl font-medium text-sm transition-all hover:-translate-y-0.5">
           ${icon}
           ${link.label}
        </a>
      `;
      })
      .join("");

    // Contact buttons (email, whatsapp)
    const contactBtns = profile.contacts
      .map((contact) => {
        const config = CONTACT_CONFIG[contact.type];
        if (!config) return "";
        return `
        <a href="${config.getHref(contact.value)}" 
           class="brand-btn ${config.btnClass} bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300"
           aria-label="${contact.label}">
           ${config.icon}
        </a>
      `;
      })
      .join("");

    contactsContainer.innerHTML = socialLinks + contactBtns;
  }
}

// ─── Project Image Modal ──────────────────────────────────────────────────────
let currentModalImages = [];
let currentModalImageIndex = 0;

function updateModalImage() {
  const modal = document.getElementById("project-image-modal");
  if (!modal) return;
  const imgEl = modal.querySelector("#modal-image-img");
  const indexEl = modal.querySelector("#modal-image-counter");
  const prevBtn = modal.querySelector("#modal-prev-btn");
  const nextBtn = modal.querySelector("#modal-next-btn");

  if (currentModalImages.length > 0)
    imgEl.src = currentModalImages[currentModalImageIndex];

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
