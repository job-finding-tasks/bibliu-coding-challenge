require("dotenv").config();

const { argv } = require("yargs");

const { run } = require("./run");

// Run main parsing and data storing script
(async () => {
  const gutenbergFilePath = argv["file-path"];
  await run(gutenbergFilePath);
  process.exit();
})();
