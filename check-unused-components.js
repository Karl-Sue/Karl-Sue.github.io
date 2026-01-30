import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uiComponentsDir = path.join(__dirname, 'src/app/components/ui');
const srcDir = path.join(__dirname, 'src');

// Get all UI component files
const uiFiles = fs.readdirSync(uiComponentsDir)
  .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
  .filter(file => !file.includes('utils') && !file.includes('use-mobile'));

// Function to search for component usage
function searchInFiles(dir, componentName, exclude) {
  let found = false;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory() && file.name !== 'node_modules' && file.name !== exclude) {
      if (searchInFiles(fullPath, componentName, exclude)) {
        found = true;
        break;
      }
    } else if (file.isFile() && (file.name.endsWith('.tsx') || file.name.endsWith('.ts') || file.name.endsWith('.jsx') || file.name.endsWith('.js'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(componentName)) {
        found = true;
        break;
      }
    }
  }
  
  return found;
}

console.log('Checking for unused UI components...\n');

const unusedComponents = [];

uiFiles.forEach(file => {
  const componentName = file.replace('.tsx', '').replace('.ts', '');
  const isUsed = searchInFiles(srcDir, componentName, 'ui');
  
  if (!isUsed) {
    unusedComponents.push(file);
  }
});

if (unusedComponents.length === 0) {
  console.log('✅ All UI components are being used!');
} else {
  console.log('❌ Unused components found:\n');
  unusedComponents.forEach(component => {
    console.log(`  - ${component}`);
  });
  console.log(`\nTotal unused: ${unusedComponents.length}/${uiFiles.length}`);
}