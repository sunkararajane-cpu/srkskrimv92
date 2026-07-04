const fs = require('fs');
let code = fs.readFileSync('src/screens/PulseScreen.tsx', 'utf-8');

const regex = /<button onClick=\{\(\) => onShare\(post\.id, 'send'\)\} className="flex items-center gap-1\.5 group" title="Send Pulse">\s*<svg viewBox="0 0 24 24"[\s\S]*?<\/svg>\s*<\/button>/;

const replacement = `
        <button onClick={() => onShare(post.id, 'reshare')} className="flex items-center gap-1.5 group" title="Reshare Pulse">
          <Repeat2 className="w-5 h-5 text-white/50 group-hover:text-[#B026FF] transition-colors" />
        </button>
        <button onClick={() => onShare(post.id, 'send')} className="flex items-center gap-1.5 group" title="Send Pulse">
          <Send className="w-5 h-5 text-white/50 group-hover:text-[#00F0FF] transition-colors" />
        </button>
`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/screens/PulseScreen.tsx', code);
console.log("Fixed PollPost properly");
