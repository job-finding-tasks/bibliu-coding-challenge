const { extname } = require("path");
const { isEmpty } = require("lodash");

// Utils
const { logger } = require("../../../src/utils/logger");
const { dbConnect } = require("../../../src/utils/dbConnect");

// Services
const { readFileContent } = require("../../../src/services/file.service");
const { parseFileContent } = require("../../../src/services/gutenberg.service");
const { createBook } = require("../../../src/services/book.service");

const run = async (filePath) => {
  try {
    // Enforce file path specifying
    if (isEmpty(filePath)) throw "You have to specify file path.";

    // Enforce proper file type (we accept only RDF files)
    if (extname(filePath) !== ".rdf")
      throw "Please specify proper file path to the RDF file.";

    // Connect to the database
    await dbConnect();

    // Get and parse file content
    const fileContent = await readFileContent(filePath);
    const parsedContent = await parseFileContent(fileContent);

    // Save parsed data
    await createBook(parsedContent);

    logger.success("Book data has been successfully parsed and saved:");
    // Output saved data (formatted JSON)
    logger.info(JSON.stringify(parsedContent, null, 3));

    return parsedContent;
  } catch (error) {
    logger.error("An error occurred while parsing and saving book data.");
    logger.error(error.message || error);
  }
};

module.exports = { run };
