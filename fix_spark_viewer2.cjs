const fs = require('fs');
let code = fs.readFileSync('src/components/SparkViewer.tsx', 'utf-8');

code = code.replace(
  `                )}
                </AnimatePresence>
        {activeSheet === "share" || activeSheet === "connect" ? (
          <PulseSendSheet`,
  `                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {activeSheet === "share" || activeSheet === "connect" ? (
          <PulseSendSheet`
);

fs.writeFileSync('src/components/SparkViewer.tsx', code);
console.log("Fixed SparkViewer syntax");
