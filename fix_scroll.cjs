const fs = require('fs');
let code = fs.readFileSync('src/components/PulseSheets.tsx', 'utf-8');

code = code.replace(
  `{activeView === 'share' ? (
              <div className="px-5 flex flex-col pt-4 overflow-y-auto overflow-x-hidden no-scrollbar" style={{ paddingBottom: 'env(safe-area-inset-bottom, 20px)' }}>`,
  `{activeView === 'share' ? (
              <div className="px-5 flex flex-col flex-1 min-h-0 pt-4 overflow-y-auto overflow-x-hidden no-scrollbar" style={{ paddingBottom: 'env(safe-area-inset-bottom, 20px)' }}>`
);

fs.writeFileSync('src/components/PulseSheets.tsx', code);
console.log("Fixed scroll");
