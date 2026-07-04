const fs = require('fs');
let code = fs.readFileSync('src/screens/PulseScreen.tsx', 'utf-8');

const regex = /<button onClick=\{\(\) => onShare\(post\.id, 'reshare'\)\} className="flex items-center gap-1\.5 group" title="Reshare Pulse">[\s\S]*?<\/svg>\s*<span className=\{\`text-xs \$\{hasCustomColor \? 'text-black\/40' : 'text-white\/50'\}\`\}>\{fmt\(post\.shares\)\}<\/span>\s*<\/button>\s*<button onClick=\{\(\) => onShare\(post\.id, 'reshare'\)\}[\s\S]*?<Send className="w-5 h-5 text-white\/50 group-hover:text-\[#00F0FF\] transition-colors" \/>\s*<\/button>/;

const replacement = `
          <button onClick={() => onShare(post.id, 'reshare')} className="flex items-center gap-1.5 group" title="Reshare Pulse">
            <Repeat2 className={\`w-5 h-5 transition-colors \${hasCustomColor ? 'text-black/40 group-hover:text-[#B026FF]' : 'text-white/50 group-hover:text-[#B026FF]'}\`} />
            <span className={\`text-xs \${hasCustomColor ? 'text-black/40' : 'text-white/50'}\`}>{fmt(post.shares)}</span>
          </button>
          <button onClick={() => onShare(post.id, 'send')} className="flex items-center gap-1.5 group" title="Send Pulse">
            <Send className={\`w-5 h-5 transition-colors \${hasCustomColor ? 'text-black/40 group-hover:text-[#00F0FF]' : 'text-white/50 group-hover:text-[#00F0FF]'}\`} />
          </button>
`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/screens/PulseScreen.tsx', code);
console.log("Fixed TextPost");
