const fs = require('fs');

// 1. Fix PulseSheets.tsx
let pulseSheets = fs.readFileSync('src/components/PulseSheets.tsx', 'utf-8');
pulseSheets = pulseSheets.replace(/,(\s*),\s*\{\s*id:\s*'see_all'/g, ',\n  { id: \'see_all\'');
fs.writeFileSync('src/components/PulseSheets.tsx', pulseSheets);
console.log("Fixed PulseSheets");

// 2. Fix SparkViewer.tsx duplicate keys
let sparkViewer = fs.readFileSync('src/components/SparkViewer.tsx', 'utf-8');

// Fix motion.div key={spark.id}
sparkViewer = sparkViewer.replace(/key=\{spark\.id\}/g, 'key={spark.id || sparkIndex}');

// Fix group.sparks progress bars
sparkViewer = sparkViewer.replace(/key=\{s\.highlightId \|\| s\.id \|\| i\}/g, 'key={`${s.highlightId || s.id || \'\'}_${i}`}');

// Fix taggedUsers
sparkViewer = sparkViewer.replace(/\{spark\.taggedUsers\.map\(\(u: string\) => \(/g, '{spark.taggedUsers.map((u: string, idx: number) => (');
sparkViewer = sparkViewer.replace(/key=\{u\}/g, 'key={`${u}_${idx}`}');

// Fix group map in AnimatePresence
sparkViewer = sparkViewer.replace(/key=\{group\.userId\}/g, 'key={group.userId || userIndex}');

fs.writeFileSync('src/components/SparkViewer.tsx', sparkViewer);
console.log("Fixed SparkViewer");

