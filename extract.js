const fs = require('fs');
const pdf = require('pdf-parse');

async function extract() {
    const files = [
        './src/data/Curriculo Guilherme Castelo - Analista de Suporte Pleno - Desenvolvedor Web.pdf',
        './src/data/Profile.pdf'
    ];
    for (const file of files) {
        if (fs.existsSync(file)) {
            const dataBuffer = fs.readFileSync(file);
            try {
                const data = await pdf(dataBuffer);
                console.log(`\n\n=== CONTENT OF ${file} ===\n\n`);
                console.log(data.text);
            } catch (err) {
                console.error(`Error parsing ${file}:`, err);
            }
        } else {
            console.log(`File not found: ${file}`);
        }
    }
}
extract();
