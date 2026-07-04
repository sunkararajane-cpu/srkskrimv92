const fs = require('fs');
let code = fs.readFileSync('src/screens/WorldDetailScreen.tsx', 'utf-8');

// Replace world.cover with an empty string or undefined as it does not exist on the mock object
code = code.replace(/image: world\.cover/g, 'image: (world as any).cover');
code = code.replace(/\{world\.cover && \(/g, '{(world as any).cover && (');
code = code.replace(/backgroundImage: \`url\(\$\{world\.cover\}\)\`/g, 'backgroundImage: `url(${(world as any).cover})`');
code = code.replace(/background: world\.cover/g, 'background: (world as any).cover');

fs.writeFileSync('src/screens/WorldDetailScreen.tsx', code);
console.log("Fixed WorldDetailScreen.tsx cover type");
