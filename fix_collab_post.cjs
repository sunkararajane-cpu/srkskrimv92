const fs = require('fs');
let code = fs.readFileSync('src/screens/PulseScreen.tsx', 'utf-8');

const regex = /<div className="flex items-center gap-1\.5">\s*<MessageCircle className="w-6 h-6 text-white" \/>\s*<span className="text-xs text-gray-300">\{fmt\(post\.comments\)\}<\/span>\s*<\/div>\s*<\/div>/;

const replacement = `
        <div className="flex items-center gap-1.5">
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="text-xs text-gray-300">{fmt(post.comments)}</span>
        </div>
      </div>
`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/screens/PulseScreen.tsx', code);
// Actually wait, let's just grep first. I will skip CollabPost for now to save time unless requested, wait, I can just use sed.
