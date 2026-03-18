const fs = require('fs');
const path = require('path');

const profilePath = path.join(__dirname, '../../data/profile.json');
const isDryRun = process.argv.includes('--dry-run');

// O novo esquema e preenchimento extraídos da verdade material (PDFs do LinkedIn e CV)
const NEW_PROFILE = {
  profile: {
    name: "Guilherme Castelo",
    avatar: "/src/assets/perfil.jpg",
    nickname: "GC",
    title: "Analista de Suporte | Sustentação de Sistemas | Automação e Integrações | Visão de Processos e Negócio",
    heroEyebrow: "Backend, ERPs e Automação de Processos",
    location: "Ariquemes, Rondônia, Brasil",
    summary: "Sou profissional de tecnologia com experiência sólida em suporte de TI, automação de processos, integração de sistemas e desenvolvimento de aplicações web. Atualmente trabalho como Analista de Suporte na Brasil Super Atacado, com foco na sustentação do ERP Winthor, checkouts e servidores da operação. Sou formado em Análise e Desenvolvimento de Sistemas e possuo MBA em Gerenciamento de Projetos de TI. Tenho perfil analítico e aprecio construir e transitar entre o suporte infra e a evolução do negócio, garantindo performance técnica e processos eficientes.",
    contacts: [
      { type: "email", label: "guilhermecastelo.mail@gmail.com", value: "guilhermecastelo.mail@gmail.com" },
      { type: "whatsapp", label: "WhatsApp", value: "5569999071519" },
      { type: "instagram", label: "Instagram", value: "guilherme_castelo" }
    ],
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/castelo-guilherme", primary: true },
      { label: "GitHub", url: "https://github.com/guilherme-castelo", primary: false },
      { label: "WhatsApp", url: "https://wa.me/5569999071519", primary: false }
    ]
  },
  heroHighlights: [
    { label: "Foco Principal", value: "Sustentação ERP Winthor <br/> Automações Corporativas", color: "blue" },
    { label: "Habilidades", value: "Suporte & Infraestrutura <br/> Redes & Active Directory", color: "purple" },
    { label: "Modernização", value: "Angular & Node.js <br /> Spring Boot & Oracle", color: "emerald" }
  ],
  skills: {
    featured: {
      eyebrow: "Atuação Central",
      title: "Infraestrutura & Integrações",
      description: "Atuação prática no suporte técnico especializado a usuários (N1/N2) e administração de Active Directory, combinada à criação de integrações via scripts, SQL e web, acelerando o fluxo de caixa.",
      principals: ["erp winthor", "active directory", "windows server", "oracle/scripts"]
    },
    frontend: ["Angular (v15 - v19)", "Vue.js (v2/v3)", "HTML / CSS", "TailwindCSS"],
    backend: ["Node.js (NestJS / Express)", "Spring Boot", "PHP (Refatorações)", "Integrações REST"],
    database: ["Oracle (Consultas DDL/DML)", "MySQL", "PostgreSQL"],
    others: ["Automação Linux / Shellscript / Python", "Docker", "DHCP & Redes", "Gestão de Licenciamento"]
  },
  experience: [
    {
      role: "Analista de Suporte Computacional",
      company: "Brasil Super Atacado",
      period: "Maio de 2021 - Atual",
      description: "Suporte técnico intenso aos colaboradores, manutenção de equipamentos de TI, gerenciamento do Active Directory e forte uso do ERP Winthor.",
      achievements: [
        "Integração do ERP Winthor via desenvolvimento de sistema web para automações setoriais (Spring Boot, Oracle, Angular 18/19).",
        "Migração de PDV's legado do Winthor (Rotina 2075) para o TOTVS, agilizando todo o parque de PDVs e repassando o treinamento à equipe.",
        "Redução de retrabalho desenhando scripts automatizados em Python, Shell Script e SQL (backup, remoção e migração das instâncias).",
        "Atuo transversalmente na administração diária do ambiente corporativo (GPOs, DHCP, Impressoras e Controle de Acessos)."
      ]
    },
    {
      role: "Empacotador e Atendente",
      company: "Brasil Super Atacado",
      period: "Jun 2020 - Abr 2021",
      description: "Empacotamento de compras e atendimento inicial na frente de loja.",
      achievements: []
    },
    {
      role: "Estagiário de Suporte Integrado",
      company: "Futura Info Ariquemes",
      period: "Mar 2018 - Mai 2018",
      description: "Início na área de TI prestando suporte físico, troca rápida de partes de PCs, e também atuando como Instrutor básico de Informática.",
      achievements: []
    }
  ],
  projects: [
    {
      title: "Integração ERP Winthor - Operações",
      context: "Plataforma de automação conectada ao core do Winthor na Brasil Super Atacado. Soluciona problemas de travamentos lógicos de fluxos manuais rotineiros.",
      tech_stack: ["Angular 18", "Spring Boot", "Oracle", "Tailwind", "PrimeNG"],
      business_impact: ["Eliminação de erros de digitação humana e redução de dezenas de horas operacionais."],
      links: {}
    },
    {
      title: "Automatização Base em Shell & Python",
      context: "Soluções ágeis (scripts diários) criadas devido a rotinas engessadas do parque tecnológico corporativo.",
      tech_stack: ["Shellscript", "Python", "Linux / Windows CLI"],
      business_impact: ["Previsão de backups salvando o negócio de perdas.", "Exportação limpa diária de dados estratégicos."],
      links: {}
    },
    {
      title: "Elementar Admin (Refeitório Integrado)",
      context: "Controle diário das refeições dos funcionários focado na automação de fechamento de dados do software Domínio Folha.",
      tech_stack: ["Node.js", "Angular", "Prisma"],
      business_impact: ["Centralização total da informação para o departamento pessoal", "Economia gigantesca no tempo de fechamento dos vales na folha mensal."],
      links: {
        live: "https://github.com/guilherme-castelo/elementar-admin",
        github: "https://github.com/guilherme-castelo/elementar-admin"
      }
    }
  ],
  education: [
    {
      degree: "MBA em Gerenciamento de Projetos de TI (Tecnologia da Informação)",
      institution: "Faculdade Venda Nova do Imigrante - FAVENI",
      period: "Dez 2023 - Jun 2024"
    },
    {
      degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      institution: "Unicesumar",
      period: "Fev 2021 - Jul 2023"
    },
    {
      degree: "Técnico de Ensino Médio em Manutenção e Suporte em Informática",
      institution: "IFRO - Instituto Federal de Rondônia",
      period: "Fev 2016 - Dez 2018"
    }
  ],
  certifications: [
    {
      name: "Formação Completa de Angular",
      institution: "Alura / Udemy",
      period: "Jan 2023 - Set 2023",
      description: "Integrações HTTP complexas, Pipes, Prevensão de Memory Leak, Guards, Testes e Lazy Loading."
    },
    {
      name: "Framework Vue.js 1, 2 e 3",
      institution: "Alura",
      period: "Jan 2023 - Set 2023",
      description: "Single Page Application (SPA), State Management com Vuex."
    },
    {
      name: "Administração de Banco de Dados MySQL",
      institution: "IFRO",
      period: "Ago 2020 - Dez 2020 (Carga: 200h)",
      description: "Desenho DDL, manutenção extrema DML e TCL voltado à consistência dos relacionamentos do BD."
    }
  ]
};

function runMigration() {
    console.log("=== Profile Migration v2 (Sprint 5) ===");
    console.log(`Target: ${profilePath}`);
    
    // Ler schema existente inteiro
    const currentRaw = fs.readFileSync(profilePath, 'utf-8');
    const currentJson = JSON.parse(currentRaw);

    // Validação Idempotente Simplificada usando o titulo migrado
    if (currentJson.profile?.title === NEW_PROFILE.profile?.title) {
        console.log("Migration skipped: O arquivo profile.json parece já estar na versão extraída do PDF (Idempotent). Nenhuma ação necessária.");
        return;
    }

    if (isDryRun) {
        const backupDemonstration = profilePath.replace('.json', `.backup-<timestamp>.json`);
        console.log("\n[DRY-RUN] Nenhuma alteração real feita.");
        console.log(`[DRY-RUN] Passo 1: O arquivo passaria por cópia originando: => ${backupDemonstration}`);
        console.log(`[DRY-RUN] Passo 2: Substiuiria campos vitais do 'currentJson' espelhando as informações lidas do Currículo do Guilherme.`);
        console.log(`[DRY-RUN] Alteração exemplo de Cargo: \n${currentJson.profile?.title} \n   -> ${NEW_PROFILE.profile.title}`);
        return;
    }

    // Criar backup no HD
    const backupPath = profilePath.replace('.json', `.backup-${Date.now()}.json`);
    fs.writeFileSync(backupPath, currentRaw, 'utf-8');
    console.log(`\n[+] Backup criado de segurança em: ${backupPath}`);
    
    // Manter a prop "Site" inalterada, esmagar o restolho
    const finalData = { 
        ...currentJson, 
        ...NEW_PROFILE 
    };

    fs.writeFileSync(profilePath, JSON.stringify(finalData, null, 2), 'utf-8');
    console.log("[+] Novo profile.json gravado localmente, consumindo métricas do PDF CV com sucesso!");
}

runMigration();
