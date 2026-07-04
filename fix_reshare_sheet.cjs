const fs = require('fs');
let code = fs.readFileSync('src/components/PulseSheets.tsx', 'utf-8');

const replacement1 = `
                {view === 'main' ? (
                  <>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#B026FF]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 14.5v-3a4 4 0 0 1 4-4h7.5" />
                      <path d="M13 4.5l3.5 3-3.5 3" />
                      <path d="M19.5 9.5v3a4 4 0 0 1-4 4h-7.5" />
                      <path d="M11 19.5l-3.5-3 3.5-3" />
                    </svg>
                    Reshare Pulse
                  </>
                ) : '💬 Quote Repost'}
`;
code = code.replace(/\{view === 'main' \? '🔁 Reshare Pulse' : '💬 Quote Repost'\}/g, replacement1.trim());

const replacement2 = `
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#B026FF]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 14.5v-3a4 4 0 0 1 4-4h7.5" />
                      <path d="M13 4.5l3.5 3-3.5 3" />
                      <path d="M19.5 9.5v3a4 4 0 0 1-4 4h-7.5" />
                      <path d="M11 19.5l-3.5-3 3.5-3" />
                    </svg>
`;
code = code.replace(/<Repeat2 className="w-6 h-6 text-\[#B026FF\]" \/>/g, replacement2.trim());

const replacement3 = `
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 14.5v-3a4 4 0 0 1 4-4h7.5" />
                      <path d="M13 4.5l3.5 3-3.5 3" />
                      <path d="M19.5 9.5v3a4 4 0 0 1-4 4h-7.5" />
                      <path d="M11 19.5l-3.5-3 3.5-3" />
                    </svg> Post Quote
`;
code = code.replace(/<Repeat2 className="w-4 h-4" \/> Post Quote/g, replacement3.trim());

const replacement4 = `
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#B026FF]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 14.5v-3a4 4 0 0 1 4-4h7.5" />
                      <path d="M13 4.5l3.5 3-3.5 3" />
                      <path d="M19.5 9.5v3a4 4 0 0 1-4 4h-7.5" />
                      <path d="M11 19.5l-3.5-3 3.5-3" />
                    </svg>
`;
code = code.replace(/<Repeat2 className="w-5 h-5 text-\[#B026FF\]" \/>/g, replacement4.trim());

code = code.replace(/close\('🔁 Reposted to your feed!'\)/g, "close('🔄 Reposted to your feed!')");
code = code.replace(/close\('🔁 Added to your Spark!'\)/g, "close('🔄 Added to your Spark!')");


fs.writeFileSync('src/components/PulseSheets.tsx', code);
console.log("Replaced Repeat2 in PulseSheets");
