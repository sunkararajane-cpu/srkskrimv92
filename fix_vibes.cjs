const fs = require('fs');
let code = fs.readFileSync('src/screens/VibesScreen.tsx', 'utf-8');

if (!code.includes('PulseSendSheet')) {
  code = code.replace(
    "import { assembleVibesFeed, getDefaultMood, MOODS, MOCK_USERS, type VibePost } from '../lib/mock/skrimAlgorithm';",
    "import { assembleVibesFeed, getDefaultMood, MOODS, MOCK_USERS, type VibePost } from '../lib/mock/skrimAlgorithm';\nimport { PulseSendSheet } from '../components/PulseSheets';"
  );
  
  // Replace handleShare
  code = code.replace(
    /const handleShare = \(\) => \{[\s\S]*?setTimeout\([\s\S]*?\}, 3000\);\n  \};/,
    `const [showShareSheet, setShowShareSheet] = useState(false);
  const handleShare = () => {
    setShowShareSheet(true);
  };`
  );

  // Add the sheet near the bottom (before last </div>)
  code = code.replace(
    '      </div>\n    </div>\n  );\n}',
    `      </div>
      <PulseSendSheet
        isOpen={showShareSheet}
        onClose={() => setShowShareSheet(false)}
        post={vibe}
        onShareComplete={() => setShowShareSheet(false)}
      />
    </div>
  );
}`
  );

  fs.writeFileSync('src/screens/VibesScreen.tsx', code);
  console.log("Fixed VibesScreen");
}
