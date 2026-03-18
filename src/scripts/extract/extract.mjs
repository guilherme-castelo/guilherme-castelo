import fs from 'fs';
import PDFParser from 'pdf2json';

const files = [
  '.\\src\\data\\Curriculo Guilherme Castelo - Analista de Suporte Pleno - Desenvolvedor Web.pdf',
  '.\\src\\data\\Profile.pdf'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
      const pdfParser = new PDFParser(null, 1);
      pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
      pdfParser.on("pdfParser_dataReady", pdfData => {
          console.log(`\n=== CONTENT OF ${file} ===\n`);
          console.log(pdfParser.getRawTextContent());
      });
      pdfParser.loadPDF(file);
  } else {
      console.log(`File not found: ${file}`);
  }
});
