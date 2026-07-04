const fs = require('fs');
let code = fs.readFileSync('src/components/SparkViewer.tsx', 'utf-8');

code = code.replace(/group\.user\./g, 'group?.user?.');

fs.writeFileSync('src/components/SparkViewer.tsx', code);
console.log("Fixed group.user. properties");
