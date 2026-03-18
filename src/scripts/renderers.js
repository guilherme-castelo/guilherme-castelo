import { startTerminalLogs } from "./terminal.js";

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
  ARROW_RIGHT: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`
};

const CONTACT_CONFIG = {
  email: {
    getHref: (val) => `mailto:${val}`,
    btnClass: "btn-gmail",
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/></svg>`
  },
  whatsapp: {
    getHref: (val) => `https://wa.me/${val}`,
    btnClass: "btn-whatsapp",
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
  },
  instagram: {
    getHref: (val) => `https://instagram.com/${val}`,
    btnClass: "btn-instagram",
    icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.059 1.278.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.384 1.078 2.126 1.384c.766.297 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.148-.261 2.913-.558.788-.306 1.459-.717 2.126-1.384s1.078-1.384 1.384-2.126c.297-.766.499-1.636.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.059-1.278-.261-2.148-.558-2.913-.306-.788-.717-1.459-1.384-2.126s-1.384-1.078-2.126-1.384c-.766-.297-1.636-.499-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`
  }
};

export function renderSiteMetadata(site, profile) {
  if (!site || !profile) return;
  document.title = site.title;
  
  const setMeta = (attr, key, val) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  };

  setMeta('name', 'description', site.description);
  setMeta('property', 'og:title', site.title);
  setMeta('property', 'og:description', site.description);
  setMeta('property', 'og:image', profile.avatar);
  setMeta('name', 'twitter:card', 'summary_large_image');

  const skipLink = document.querySelector('a[href="#main-content"]');
  if (skipLink) skipLink.innerText = site.skipLink;

  const logo = document.querySelector("header .text-white");
  if (logo) logo.innerHTML = `${profile.nickname}<span class="text-cyan-500">.</span>`;
}

export function renderNavigation(site) {
  if (!site?.nav) return;
  const navContainer = document.getElementById("main-nav-links");
  const mobileNavContainer = document.getElementById("main-nav-links-mobile");
  
  const navLinksHTML = site.nav
      .map(item => `<a href="${item.anchor}" class="nav-link hover:text-white transition-colors block md:inline-block">${item.label}</a>`)
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

  if (imgContainer) imgContainer.innerHTML = `<img src="${profile.avatar}" class="w-full h-full rounded-full object-cover border-4 border-cyan-500/30 z-10 relative" loading="lazy" alt="${profile.name}">`;
  if (nameEl) nameEl.innerText = profile.name;
  if (titleEl) titleEl.innerText = profile.title;
  if (summaryEl) summaryEl.innerText = profile.summary;

  startTerminalLogs();
}

export function renderSocials(socials) {
  if (!socials) return;
  const container = document.querySelector("#hero .flex.flex-wrap.gap-6");
  if (!container) return;

  container.innerHTML = socials
    .map(link => `
      <a href="${link.url}" target="_blank" 
         class="px-10 py-5 ${link.primary ? "bg-white text-black" : "glass text-white border border-white/10 hover:border-blue-500"} font-black rounded-2xl transition-all transform hover:-translate-y-1 ${link.primary ? "shadow-2xl shadow-blue-500/10" : ""}">
         ${link.label}
      </a>
    `)
    .join("");
}

export function renderHeroHighlights(highlights) {
  if (!highlights) return;
  const container = document.getElementById("hero-highlights-grid");
  if (!container) return;

  container.innerHTML = highlights
    .map(item => `
      <article class="p-8 rounded-[2rem] glass shine-effect border-${item.color}-500/10 hover:border-${item.color}-500/40 transition-all group">
          <h3 class="text-[10px] text-${item.color}-500 uppercase tracking-widest font-black mb-3 opacity-60">${item.label}</h3>
          <p class="text-white font-extrabold text-2xl leading-none">${item.value}</p>
      </article>
    `)
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
          <h3 class="text-4xl md:text-5xl font-bold text-white leading-tight">${featured.title}</h3>
      </div>
      <p class="text-gray-400 text-lg md:text-xl font-normal leading-relaxed">${featured.description}</p>
      <div class="flex flex-wrap gap-2.5">
          ${featured.principals.map(s => `<span class="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">${s}</span>`).join("")}
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
    .map(cat => `
      <div class="spotlight-card bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between">
          <div class="space-y-4">
              <h4 class="text-${cat.color}-400 text-xs font-semibold uppercase tracking-wider">${cat.label}</h4>
              <div class="flex flex-wrap gap-x-4 gap-y-3">
                  ${skills[cat.key].map(s => `
                      <p class="text-gray-300 text-sm font-medium flex items-center gap-2">
                          <span class="w-1.5 h-1.5 bg-${cat.color}-400/60 rounded-full"></span>
                          ${s}
                      </p>
                  `).join("")}
              </div>
          </div>
      </div>
    `)
    .join("");
}

export function renderExperience(experienceData) {
  try {
    const container = document.getElementById("experience-list");
    if (!container) return;

    // Tolerate multiple schemas
    const experience = experienceData || [];
    
    if (!Array.isArray(experience) || experience.length === 0) {
      container.innerHTML = '<p class="text-gray-500 italic p-6 border border-white/5 rounded-2xl">Nenhuma experiência profissional cadastrada.</p>';
      return;
    }

    container.innerHTML = experience
      .map(exp => {
        const period = exp.period || '';
        const datetime = period ? period.split(' ')[0] : '';
        const achievements = Array.isArray(exp.achievements) ? exp.achievements : [];
        
        return `
        <article class="grid md:grid-cols-12 gap-8 items-start relative section-reveal">
            <div class="md:col-span-4 md:sticky md:top-32">
                <time datetime="${datetime}" class="text-cyan-500 font-mono text-sm mb-2 block font-semibold">${period}</time>
                <h4 class="text-3xl font-bold text-white tracking-tight">${exp.role || 'Cargo não definido'}</h4>
                <p class="text-cyan-400 font-semibold uppercase text-xs tracking-wider mt-1">${exp.company || ''}</p>
            </div>
            <div class="md:col-span-8 space-y-6">
                <p class="text-gray-400 text-base md:text-lg font-normal leading-relaxed italic border-l-2 border-cyan-500/20 pl-6">${exp.description || ''}</p>
                <ul class="grid gap-4">
                    ${achievements.map(a => `
                        <li class="flex items-start gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/20 transition-all">
                            ${ICONS.CHECK}
                            <span class="text-gray-300 text-sm leading-relaxed">${a}</span>
                        </li>
                    `).join("")}
                </ul>
            </div>
        </article>
      `}).join("");
  } catch (err) {
    console.error("Error rendering experience:", err);
    const container = document.getElementById("experience-list");
    if (container) container.innerHTML = '<p class="text-red-500 italic p-6">Erro ao carregar seção de experiência.</p>';
  }
}

export function renderProjects(projects) {
  if (!projects) return;
  const container = document.getElementById("projects-grid");
  if (!container) return;

  container.innerHTML = projects
    .map(project => {
      // Safe fallback extraction for legacy keys
      const stack = project.tech_stack || (project.tag ? project.tag.split('+') : []);
      const context = project.context || project.details?.problem || '';
      const impacts = project.business_impact || (project.details?.benefit ? [project.details.benefit] : []);
      const liveLink = project.links?.live || project.link || '';
      const githubLink = project.links?.github || '';

      // Determine single link behavior
      const isSameLink = liveLink === githubLink;
      
      return `
      <article class="spotlight-card bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02] group overflow-hidden flex flex-col gap-6">
          <div class="space-y-4">
              <div class="flex justify-between items-start gap-4">
                  <div class="flex flex-wrap gap-2 flex-1">
                      ${stack.map(tech => `<span class="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold tracking-wider rounded-full border border-cyan-500/20">${tech.trim()}</span>`).join('')}
                  </div>
                  <div class="flex gap-2 shrink-0">
                      ${githubLink ? `<a href="${githubLink}" target="_blank" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex justify-center items-center hover:bg-slate-800 transition-all hover:scale-110" aria-label="Ver Repositório GitHub"><svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12"/></svg></a>` : ''}
                      ${liveLink && !isSameLink ? `<a href="${liveLink}" target="_blank" class="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex justify-center items-center hover:bg-cyan-500 hover:text-slate-900 hover:border-transparent transition-all hover:scale-110" aria-label="Ver Aplicação em Produção">${ICONS.ARROW_RIGHT}</a>` : ''}
                      ${liveLink && isSameLink && !githubLink ? `<a href="${liveLink}" target="_blank" class="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex justify-center items-center hover:bg-cyan-500 hover:text-slate-900 transition-all hover:scale-110" aria-label="Ver Projeto">${ICONS.ARROW_RIGHT}</a>` : ''}
                  </div>
              </div>
              <h4 class="text-3xl font-bold text-white tracking-tight leading-tight">${project.title || project.name}</h4>
          </div>
          
          <div class="space-y-6 pt-4 border-t border-white/5 mt-auto flex-1 flex flex-col justify-between">
              <div>
                  <p class="text-[15px] text-gray-300 leading-relaxed font-normal">${context}</p>
              </div>
              
              <div class="space-y-4 pt-4 border-t border-white/5">
                  <p class="text-xs font-semibold uppercase tracking-wider text-white mb-3">Impacto no Negócio</p>
                  <ul class="space-y-3">
                      ${impacts.map(impact => impact ? `
                          <li class="flex items-start gap-3">
                              <svg class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                              <span class="text-sm text-gray-400 leading-relaxed">${impact}</span>
                          </li>
                      ` : '').join("")}
                  </ul>
              </div>
          </div>
      </article>
      `;
    })
    .join("");
}

function renderListItem(item) {
  return `
    <article class="grid-cols-12 gap-2 md:flex-row justify-between items-start md:items-center p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
        <div class="col-span-9">
            <h4 class="text-white font-bold">${item.degree || item.name}</h4>
            <p class="text-gray-500 text-sm">${item.institution}</p>
            ${item.description ? `<p class="text-gray-400 text-sm mt-2">${item.description}</p>` : ""}
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
  if (container) container.innerHTML = education.map(edu => renderListItem(edu)).join("");
}

export function renderCertifications(certifications) {
  if (!certifications) return;
  const container = document.getElementById("certification-list");
  if (container) container.innerHTML = certifications.map(cert => renderListItem(cert)).join("");
}

export function renderSectionHeaders(sections) {
  if (!sections) return;
  Object.keys(sections).forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const h2 = section.querySelector("h2");
      if (h2) h2.innerHTML = `<span class="text-gray-500 font-mono text-sm mr-2">${sections[id].number}.</span> ${sections[id].title}`;
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
      .map(contact => {
        const config = CONTACT_CONFIG[contact.type] || {
          getHref: (v) => v,
          btnClass: "glass text-white",
          icon: ""
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
