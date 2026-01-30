/**
 * Senior-level Renderers Module (Version 2.0 - Hyper-Decoupled)
 * Responsibility: Pure UI projection from JSON state.
 * Zero hardcoded strings allowed.
 */

export function renderSiteMetadata(site, profile) {
  document.title = site.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.content = site.description;

  // Skip Link content
  const skipLink = document.querySelector('a[href="#main-content"]');
  if (skipLink) skipLink.innerText = site.skipLink;

  // Header Logo/Nickname
  const logo = document.querySelector("header .text-white");
  if (logo)
    logo.innerHTML = `${profile.nickname}<span class="text-blue-500">.</span>`;
}

export function renderNavigation(site) {
  const navContainer = document.getElementById("main-nav-links");
  if (navContainer) {
    navContainer.innerHTML = site.nav
      .map(
        (item) => `
          <a href="${item.anchor}" class="nav-link hover:text-white transition-colors">${item.label}</a>
      `,
      )
      .join("");
  }

  const contactBtn = document.querySelector('header a[href="#contact"]');
  if (contactBtn) contactBtn.innerText = site.contactBtn;
}

export function renderProfile(profile) {
  const eyebrowEl = document.querySelector("#hero h2");
  if (eyebrowEl) {
    // Keep the line/decorator span if it exists
    const decorator = eyebrowEl.querySelector("span");
    eyebrowEl.innerHTML = `${decorator ? decorator.outerHTML : ""} ${profile.heroEyebrow}`;
  }

  const nameEl = document.getElementById("user-name");
  const titleEl = document.getElementById("user-title");
  const summaryEl = document.getElementById("user-summary");

  if (nameEl) nameEl.innerText = profile.name;
  if (titleEl) titleEl.innerText = profile.title;
  if (summaryEl) summaryEl.innerText = profile.summary;
}

export function renderSocials(socials) {
  const container = document.querySelector("#hero .flex.flex-wrap.gap-6");
  if (!container) return;

  container.innerHTML = socials
    .map(
      (link) => `
    <a href="${link.url}" target="_blank" 
       class="px-10 py-5 ${link.primary ? "bg-white text-black" : "glass text-white border border-white/10 hover:border-blue-500"} font-black rounded-2xl transition-all transform hover:-translate-y-1 ${link.primary ? "shadow-2xl shadow-blue-500/10" : ""}">
       ${link.label}
    </a>
  `,
    )
    .join("");
}

export function renderHeroHighlights(highlights) {
  const container = document.getElementById("hero-highlights-grid");
  if (!container) return;

  container.innerHTML = highlights
    .map(
      (item) => `
        <article class="p-8 rounded-[2rem] glass shine-effect border-${item.color}-500/10 hover:border-${item.color}-500/40 transition-all group">
            <h3 class="text-[10px] text-${item.color}-500 uppercase tracking-widest font-black mb-3 opacity-60">${item.label}</h3>
            <p class="text-white font-extrabold text-2xl leading-none">${item.value}</p>
        </article>
    `,
    )
    .join("");
}

export function renderSkills(skills) {
  // Featured Skill Card
  const featured = skills.featured;
  const featuredEl = document.getElementById("featured-skill");
  if (featuredEl) {
    featuredEl.innerHTML = `
      <div class="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 blur-[120px] pointer-events-none"></div>
      <div class="space-y-3">
          <p class="text-blue-500 text-xs font-black uppercase tracking-[0.3em]">${featured.eyebrow}</p>
          <h3 class="text-5xl font-black text-white leading-tight">${featured.title}</h3>
      </div>
      <p class="text-gray-400 text-xl font-light leading-relaxed">${featured.description}</p>
      <div id="angular-tags" class="flex flex-wrap gap-2.5"></div>
    `;

    // Nested render for tags
    const angularTags = document.getElementById("angular-tags");
    if (angularTags) {
      angularTags.innerHTML = skills.frontend
        .map(
          (skill) =>
            `<span class="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">${skill}</span>`,
        )
        .join("");
    }
  }

  const secondaryContainer = document.getElementById("secondary-skills");
  if (!secondaryContainer) return;

  const categories = [
    { key: "frontend", label: "Frontend & UI", color: "blue" },
    { key: "backend", label: "Backend & Systems", color: "purple" },
    { key: "database", label: "Database & Data", color: "emerald" },
    { key: "others", label: "Tools & DevOps", color: "orange" },
  ];

  secondaryContainer.innerHTML = categories
    .map(
      (cat) => `
        <div class="glass p-8 rounded-3xl glass-hover transition-all duration-300 flex flex-col justify-between">
            <div class="space-y-4">
                <h4 class="text-${cat.color}-500 text-[10px] font-black uppercase tracking-[0.2em]">${cat.label}</h4>
                <div class="flex flex-wrap gap-2">
                    ${skills[cat.key]
                      .map(
                        (s) => `
                        <span class="text-white/80 text-sm font-medium flex items-center gap-2">
                            <span class="w-1 h-1 bg-${cat.color}-500 rounded-full"></span>
                            ${s}
                        </span>
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

export function renderExperience(experience) {
  const container = document.getElementById("experience-list");
  if (!container) return;

  container.innerHTML = experience
    .map(
      (exp) => `
        <article class="grid md:grid-cols-12 gap-8 items-start relative">
            <div class="md:col-span-4 sticky top-24">
                <span class="text-blue-500 font-mono text-xs mb-2 block font-bold">${exp.period}</span>
                <h4 class="text-3xl font-black text-white tracking-tight">${exp.role}</h4>
                <p class="text-blue-400 font-bold uppercase text-[10px] tracking-widest mt-1">${exp.company}</p>
            </div>
            <div class="md:col-span-8 space-y-6">
                <p class="text-gray-400 text-lg font-light leading-relaxed italic border-l-2 border-blue-500/20 pl-6">${exp.description}</p>
                <ul class="grid md:grid-cols-1 gap-4">
                    ${exp.achievements
                      .map(
                        (a) => `
                        <li class="flex items-start gap-3 p-4 rounded-2xl glass border-white/5 hover:border-white/10 transition-all">
                            <svg class="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span class="text-gray-300 text-sm leading-relaxed">${a}</span>
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
        </article>
    `,
    )
    .join("");
}

export function renderProjects(projects) {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project) => `
        <article class="glass p-10 rounded-[2.5rem] glass-hover group relative overflow-hidden flex flex-col gap-8 transition-all duration-500">
            <div class="space-y-2">
                 <div class="flex justify-between items-start">
                    <span class="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">${project.tag}</span>
                    <a href="${project.link}" target="_blank" class="w-10 h-10 rounded-full glass flex justify-center items-center group-hover:bg-white group-hover:text-black transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="View Project">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                 </div>
                <h4 class="text-4xl font-black text-white tracking-tighter">${project.name}</h4>
            </div>
            
            <div class="space-y-6">
                <div class="p-5 rounded-2xl bg-white/5 space-y-2">
                    <p class="text-xs font-bold text-white mb-1 uppercase tracking-widest opacity-50">Problem Solving</p>
                    <p class="text-sm text-gray-300 leading-relaxed font-light">${project.details.problem}</p>
                </div>
                <div class="grid grid-cols-2 gap-4 text-[11px]">
                    <div>
                        <p class="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1">Decisão</p>
                        <p class="text-gray-400 leading-snug">${project.details.decision}</p>
                    </div>
                    <div>
                        <p class="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Benefício</p>
                        <p class="text-gray-400 leading-snug">${project.details.benefit}</p>
                    </div>
                </div>
            </div>
        </article>
    `,
    )
    .join("");
}

export function renderEducation(education) {
  const container = document.getElementById("education-list");
  if (!container) return;

  container.innerHTML = education
    .map(
      (edu) => `
        <article class="flex justify-between items-center p-6 border-b border-white/5 last:border-0">
            <div>
                <h4 class="text-white font-bold">${edu.degree}</h4>
                <p class="text-gray-500 text-sm">${edu.institution}</p>
            </div>
            <span class="text-blue-500 font-mono text-xs font-bold">${edu.year}</span>
        </article>
    `,
    )
    .join("");
}

export function renderSectionHeaders(sections) {
  Object.keys(sections).forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const h2 = section.querySelector("h2");
    if (h2) {
      h2.innerHTML = `<span class="text-gray-500 font-mono text-sm mr-2">${sections[id].number}.</span> ${sections[id].title}`;
    }
  });
}

export function renderFooter(site, profile) {
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
        let href = "";
        let btnClass = "";
        let icon = "";

        switch (contact.type) {
          case "email":
            href = `mailto:${contact.value}`;
            btnClass = "btn-gmail";
            icon = `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/></svg>`;
            break;
          case "whatsapp":
            href = `https://wa.me/${contact.value}`;
            btnClass = "btn-whatsapp";
            icon = `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
            break;
          case "instagram":
            href = `https://instagram.com/${contact.value}`;
            btnClass = "btn-instagram";
            icon = `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.059 1.278.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.384 1.078 2.126 1.384c.766.297 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.148-.261 2.913-.558.788-.306 1.459-.717 2.126-1.384s1.078-1.384 1.384-2.126c.297-.766.499-1.636.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.059-1.278-.261-2.148-.558-2.913-.306-.788-.717-1.459-1.384-2.126s-1.384-1.078-2.126-1.384c-.766-.297-1.636-.499-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`;
            break;
          default:
            href = contact.value;
            btnClass = "glass text-white";
        }

        return `
          <a href="${href}" target="_blank" 
             class="brand-btn ${btnClass}"
             aria-label="${contact.label}">
             ${icon}
          </a>
        `;
      })
      .join("");
  }
}
