const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;

            // Replace 'http://localhost:3001/api/...' -> `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/...`
            content = content.replace(/'http:\/\/localhost:3001([^']+)'/g, (match, p1) => {
                updated = true;
                return "`\\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}" + p1 + "`";
            });

            // Replace `http://localhost:3001/api/...${...}` -> `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/...${...}`
            content = content.replace(/`http:\/\/localhost:3001([^`]+)`/g, (match, p1) => {
                updated = true;
                return "`\\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}" + p1 + "`";
            });

            if (updated) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

processDir('e:/Users/PC/Documents/ANTIGRAVITY/BISNOTEKA/src');
