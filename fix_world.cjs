const fs = require('fs');
let code = fs.readFileSync('src/screens/WorldDetailScreen.tsx', 'utf-8');

if (!code.includes('PulseSendSheet')) {
  code = code.replace(
    "import { Share2, Info, Plus, Play, MoreVertical, Flag, ChevronRight, LayoutGrid, List, MessageCircle, Star, ArrowLeft, Loader2, Sparkles, UserPlus } from 'lucide-react';",
    "import { Share2, Info, Plus, Play, MoreVertical, Flag, ChevronRight, LayoutGrid, List, MessageCircle, Star, ArrowLeft, Loader2, Sparkles, UserPlus } from 'lucide-react';\nimport { PulseSendSheet } from '../components/PulseSheets';"
  );
  
  code = code.replace(
    /const handleShareWorld = async \(\) => \{[\s\S]*?setTimeout\(\(\) => setShareToast\(null\), 2500\);\n  \};/,
    `const [showShareSheet, setShowShareSheet] = useState(false);
  const handleShareWorld = () => {
    setShowShareSheet(true);
  };`
  );

  code = code.replace(
    '      </div>\n    </div>\n  );\n}',
    `      </div>
      <PulseSendSheet
        isOpen={showShareSheet}
        onClose={() => setShowShareSheet(false)}
        post={{ id: \`world_\${world.id}\`, caption: world.name, handle: world.name, user: world.name, image: world.cover }}
        onShareComplete={() => setShowShareSheet(false)}
      />
    </div>
  );
}`
  );

  fs.writeFileSync('src/screens/WorldDetailScreen.tsx', code);
  console.log("Fixed WorldDetailScreen");
}
