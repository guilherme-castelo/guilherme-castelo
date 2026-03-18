const fs = require('fs');
const path = require('path');

const profilePath = path.join(__dirname, '../../data/profile.json');

try {
  const data = JSON.parse(fs.readFileSync(profilePath, 'utf8'));

  if (!data.projects) {
    console.log('No projects found to migrate.');
    process.exit(0);
  }

  let migratedCount = 0;

  data.projects = data.projects.map(proj => {
    // Already new schema? Skip.
    if (proj.tech_stack && proj.business_impact) return proj;

    // Split the 'tag' string to extract the primary stack
    const stack = (proj.tag || '').split('+').map(s => s.trim()).filter(Boolean);
    
    // Build context
    const description = proj.description || '';
    const problem = proj.details?.problem || '';
    const context = `${description} ${problem}`.trim();

    // Extract business impact. Split by commas, ' e ' or periods to form a bullet list.
    let rawBenefits = proj.details?.benefit || '';
    let impacts = rawBenefits
      .split(/(?:, e | e |, )/)
      .map(s => s.trim())
      .filter(s => s.length > 3);
      
    const capitalize = s => {
      let formatted = s.charAt(0).toUpperCase() + s.slice(1);
      if (!formatted.endsWith('.')) formatted += '.';
      return formatted;
    };
    
    if (impacts.length === 0 && rawBenefits) {
      impacts = [rawBenefits];
    }
    
    impacts = impacts.map(capitalize);

    migratedCount++;

    return {
      id: proj.name ? proj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `proj-${Date.now()}`,
      title: proj.name || 'Untitled Project',
      context: context || 'Contexto não definido.',
      tech_stack: stack.length > 0 ? stack : ['Tech'],
      business_impact: impacts.length > 0 ? impacts : ['Impacto não definido.'],
      links: {
        live: proj.link || '',
        github: (proj.link || '').includes('github') ? proj.link : ''
      },
      images: []
    };
  });

  if (migratedCount > 0) {
    fs.writeFileSync(profilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Migration successful: ${migratedCount} project(s) updated to the new schema in profile.json.`);
  } else {
    console.log('No projects needed migration. All conform to the new schema.');
  }

} catch (err) {
  console.error('Failed to migrate profile.json:', err);
  process.exit(1);
}
