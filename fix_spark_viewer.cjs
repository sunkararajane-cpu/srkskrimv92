const fs = require('fs');
let code = fs.readFileSync('src/components/SparkViewer.tsx', 'utf-8');

if (!code.includes('PulseSendSheet')) {
  code = code.replace(
    "import { AvatarWithRing } from './BadgeComponents';",
    "import { AvatarWithRing } from './BadgeComponents';\nimport { PulseSendSheet } from './PulseSheets';"
  );
  
  // Find the Sheet layout and inject PulseSendSheet
  code = code.replace(
    /\{\/\* Share Sheet \*\/\}\s*\{activeSheet === "share" && \([\s\S]*?\}\s*\{\/\* Connect Share Sheet \*\/\}\s*\{activeSheet === "connect" && \([\s\S]*?<\/AnimatePresence>/,
    `</AnimatePresence>
        {activeSheet === "share" || activeSheet === "connect" ? (
          <PulseSendSheet
            isOpen={true}
            onClose={() => setActiveSheet(null)}
            post={activeSpark}
            onShareComplete={() => setActiveSheet(null)}
          />
        ) : null}`
  );

  fs.writeFileSync('src/components/SparkViewer.tsx', code);
  console.log("Fixed SparkViewer");
}
