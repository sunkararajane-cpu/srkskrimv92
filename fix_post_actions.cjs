const fs = require('fs');
let code = fs.readFileSync('src/screens/PulseScreen.tsx', 'utf-8');

const replacement = `
        {/* Reshare */}
        <button onClick={() => onShare(post.id, 'reshare')} className="flex items-center gap-1.5 group" title="Reshare Pulse">
          <Repeat2 className="w-6 h-6 text-white group-hover:text-[#B026FF] transition-colors" />
          <span className="text-xs text-gray-300">{fmt(post.shares)}</span>
        </button>
        {/* Send */}
        <button onClick={() => onShare(post.id, 'send')} className="flex items-center gap-1.5 group" title="Send Pulse">
          <Send className="w-5 h-5 text-white group-hover:text-[#00F0FF] transition-colors" />
        </button>
`;

code = code.replace(/\{\/\* Share \*\/\}\s*<button onClick=\{\(\) => onShare\(post\.id, 'send'\)\}[\s\S]*?<\/svg>\s*<span className="text-xs text-gray-300">\{fmt\(post\.shares\)\}<\/span>\s*<\/button>/, replacement);

fs.writeFileSync('src/screens/PulseScreen.tsx', code);
console.log("Fixed PostActions");
