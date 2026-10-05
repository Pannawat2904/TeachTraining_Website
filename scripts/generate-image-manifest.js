const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '../public/data/image-manifest.json');
const terms = ['semester-1', 'semester-2'];
const manifest = {};

for (const term of terms) {
  manifest[term] = {};
  const basePath = path.join(__dirname, `../public/images/teaching/${term}`);
  
  if (fs.existsSync(basePath)) {
    const weeks = fs.readdirSync(basePath).filter(f => fs.statSync(path.join(basePath, f)).isDirectory());
    
    for (const week of weeks) {
      const weekPath = path.join(basePath, week);
      const files = fs.readdirSync(weekPath).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      });
      
      const match = week.match(/(\d+)/);
      if (match) {
        const weekNum = match[1].padStart(2, '0');
        manifest[term][weekNum] = files.map(f => `/images/teaching/${term}/${week}/${f}`);
      }
    }
  }
}

// Ensure data dir exists
if (!fs.existsSync(path.dirname(manifestPath))) {
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Image manifest generated successfully at', manifestPath);
