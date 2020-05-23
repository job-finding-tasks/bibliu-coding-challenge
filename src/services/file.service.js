const fs = require("fs");

/**
 * Reads content of the file specified in the parameters with encoding specified in parameters (defaults to utf8 encoding)
 *
 * @param {*} filePath
 * @param {*} encoding
 */
const readFileContent = (filePath, encoding = "utf8") =>
  fs.readFileSync(filePath, encoding);

module.exports = {
  readFileContent,
};
