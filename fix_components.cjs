const fs = require('fs');

// 1. Fix CommunityFeed.tsx
let cf = fs.readFileSync('src/components/CommunityFeed.tsx', 'utf-8');

// Extract PulseSendSheet
const cfRegex = /<PulseSendSheet[\s\S]*?\/>/;
const cfMatch = cf.match(cfRegex);

if (cfMatch) {
  cf = cf.replace(cfRegex, '');
  // Insert it before the end of CommunityFeed component
  // We know CommunityFeed ends around line 383, before `function PostCard({`
  cf = cf.replace(/(\s*)(<\/div>\s*<\/div>\s*\);\s*}\s*function PostCard\(\{)/, `$1  ${cfMatch[0]}$1$2`);
  fs.writeFileSync('src/components/CommunityFeed.tsx', cf);
  console.log("Fixed CommunityFeed.tsx");
} else {
  console.log("Could not find PulseSendSheet in CommunityFeed.tsx");
}

// 2. Fix WorldDetailScreen.tsx
let wds = fs.readFileSync('src/screens/WorldDetailScreen.tsx', 'utf-8');
const wdsRegex = /<PulseSendSheet[\s\S]*?\/>/;
const wdsMatch = wds.match(wdsRegex);

if (wdsMatch) {
  wds = wds.replace(wdsRegex, '');
  // Insert it before the end of WorldDetailScreen component
  // WorldDetailScreen ends before `function HeroSection({`
  wds = wds.replace(/(\s*)(<\/div>\s*\);\s*}\s*function HeroSection\(\{)/, `$1  ${wdsMatch[0]}$1$2`);
  fs.writeFileSync('src/screens/WorldDetailScreen.tsx', wds);
  console.log("Fixed WorldDetailScreen.tsx");
} else {
  console.log("Could not find PulseSendSheet in WorldDetailScreen.tsx");
}

