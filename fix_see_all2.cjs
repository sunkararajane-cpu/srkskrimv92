const fs = require('fs');
let code = fs.readFileSync('src/components/PulseSheets.tsx', 'utf-8');

code = code.replace(
  `}
];

export function PulseSendSheet`,
  `},
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
];

export function PulseSendSheet`
);

fs.writeFileSync('src/components/PulseSheets.tsx', code);
console.log("Added See all back");
