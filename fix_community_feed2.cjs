const fs = require('fs');
let code = fs.readFileSync('src/components/CommunityFeed.tsx', 'utf-8');

code = code.replace(
  /const \[shareToast, setShareToast\] = useState<string \| null>\(null\);[\s\S]*?setTimeout\(\(\) => setShareToast\(null\), 2500\);\n  \};/,
  `const [shareToast, setShareToast] = useState<string | null>(null);
  const [activeSharePost, setActiveSharePost] = useState<any>(null);
  const handleSharePost = (post: any) => {
    setActiveSharePost(post);
  };`
);

fs.writeFileSync('src/components/CommunityFeed.tsx', code);
console.log("Fixed CommunityFeed");
