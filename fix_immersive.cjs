const fs = require('fs');
let code = fs.readFileSync('src/components/ImmersivePostViewer.tsx', 'utf-8');

if (!code.includes('PulseSendSheet')) {
  code = code.replace(
    "import { BadgeRow } from './BadgeComponents';",
    "import { BadgeRow } from './BadgeComponents';\nimport { PulseSendSheet } from './PulseSheets';"
  );
  
  // Replace the entire Share Bottom Sheet
  const sheetRegex = /\{\/\* Share Bottom Sheet \*\/\}\s*<AnimatePresence>[\s\S]*?<\/AnimatePresence>/;
  code = code.replace(sheetRegex, 
    `{/* Share Bottom Sheet */}
      <PulseSendSheet 
        isOpen={showShareMenu} 
        onClose={() => setShowShareMenu(false)} 
        post={{ id: \`immers_\${currentIndex}\`, image: urls[currentIndex], user: user?.username || 'user', handle: user?.handle || 'user', avatar: user?.avatar }} 
        onShareComplete={() => setShowShareMenu(false)} 
      />`
  );
  
  fs.writeFileSync('src/components/ImmersivePostViewer.tsx', code);
  console.log("Fixed ImmersivePostViewer");
}
