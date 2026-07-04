const fs = require('fs');
let code = fs.readFileSync('src/components/PulseSheets.tsx', 'utf-8');

const regex = /\{ id: 'telegram'[\s\S]*?\}\s*\];/;
const replacement = `{ id: 'telegram', label: 'Telegram', bg: '#0088cc', action: (url: string) => window.open(\`https://t.me/share/url?url=\${encodeURIComponent(url)}\`, '_blank'), svg: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { 
    id: 'see_all', label: 'See all', bg: 'rgba(255,255,255,0.1)', border: true, 
    action: (url: string) => {
      if (navigator.share) {
        navigator.share({
          title: "Check out this Pulse!",
          url: url,
        }).catch(() => {});
      }
    }, 
    svg: <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> 
  }
];`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/PulseSheets.tsx', code);
console.log("Added See all using regex");
