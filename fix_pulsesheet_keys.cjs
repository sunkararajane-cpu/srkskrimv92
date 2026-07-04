const fs = require('fs');
let code = fs.readFileSync('src/components/PulseSheets.tsx', 'utf-8');

code = code.replace(/\{filteredContacts\.map\(\(u\) => \(/g, '{filteredContacts.map((u, i) => (');
code = code.replace(/key=\{u\.id\}/g, 'key={`${u.id}_${i}`}');

code = code.replace(/\{filteredContacts\.map\(u => \{/g, '{filteredContacts.map((u, i) => {');

fs.writeFileSync('src/components/PulseSheets.tsx', code);
console.log("Fixed PulseSheets keys");
