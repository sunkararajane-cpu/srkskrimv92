const fs = require('fs');
let code = fs.readFileSync('src/components/SparkViewer.tsx', 'utf-8');

code = code.replace(
  /<\/AnimatePresence>\s*\{activeSheet === "share"/g,
  `  </motion.div>
            </>
          )}
        </AnimatePresence>
        {activeSheet === "share"`
);

fs.writeFileSync('src/components/SparkViewer.tsx', code);
console.log("Fixed SparkViewer syntax again");
