const fs = require('fs');
let code = fs.readFileSync('src/components/CommunityFeed.tsx', 'utf-8');

const replacement = `
      </AnimatePresence>
      <PulseSendSheet
        isOpen={!!activeSharePost}
        onClose={() => setActiveSharePost(null)}
        post={activeSharePost}
        onShareComplete={() => setActiveSharePost(null)}
      />
    </div>
  );
}

function PostCard({
`;

code = code.replace(/(\s*)<\/AnimatePresence>\s*<\/div>\s*\);\s*}\s*function PostCard\(\{/m, replacement);

fs.writeFileSync('src/components/CommunityFeed.tsx', code);
console.log("Fixed CommunityFeed.tsx");
