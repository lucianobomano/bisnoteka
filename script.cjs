const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');
const startTag = '{/* Magazine Management */}';
const nextTag = '{/* Success Stories Management */}';
const startIndex = content.indexOf(startTag);
const nextIndex = content.indexOf(nextTag);
if (startIndex !== -1 && nextIndex !== -1) {
    const newContent = content.slice(0, startIndex) + 
        '{/* Magazine Management */}\n                {activeTab === "magazine" && <AdminMagazineTab />}\n\n                ' + 
        content.slice(nextIndex);
    fs.writeFileSync('src/pages/AdminDashboard.tsx', newContent);
    console.log('Successfully replaced Magazine Management section.');
} else {
    console.log('Tags not found.');
}
