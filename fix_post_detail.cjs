const fs = require('fs');
let code = fs.readFileSync('src/screens/PostDetailScreen.tsx', 'utf-8');

const regex = /<Repeat2 className="w-5 h-5 text-white\/50" \/>/;
const replacement = `
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 14.5v-3a4 4 0 0 1 4-4h7.5" />
              <path d="M13 4.5l3.5 3-3.5 3" />
              <path d="M19.5 9.5v3a4 4 0 0 1-4 4h-7.5" />
              <path d="M11 19.5l-3.5-3 3.5-3" />
            </svg>
`.trim();

code = code.replace(regex, replacement);
fs.writeFileSync('src/screens/PostDetailScreen.tsx', code);
console.log("Replaced Repeat2 in PostDetailScreen");
