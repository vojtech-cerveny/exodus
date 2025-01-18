import * as fs from 'fs';
import * as path from 'path';

// Read the markdown file
let markdown = fs.readFileSync('main.md', 'utf8');

markdown = markdown.replace(/\*\*Reflexe\*\*/g, '### Reflexe');
markdown = markdown.replace(/\*\*(Čtení.*)\*\*/g, '### $1');
markdown = markdown.replace(/\*\*(Úkoly.*)\*\*/g, '### $1');
// Split the file by '###'
const sections = markdown.split('### den');

// Loop through the sections and write each to a new file
sections.forEach((section, index) => {
  // Skip the first section if it's empty (i.e., the file started with '###')
  if (index === 0 && section.trim() === '') return;

  // Create a filename based on the first line of the section
  const filename = index < 10 ? `0${index}` : index;

  // Write the section to a new file
  fs.writeFileSync(path.join(__dirname, `days/${filename}.md`), `## ${section.trim()}`);
});
