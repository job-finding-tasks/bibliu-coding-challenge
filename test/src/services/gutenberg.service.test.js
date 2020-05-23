const sinon = require("sinon");
const fs = require("fs");
const { join } = require("path");

const { expect } = require("../../helpers/chai");
const { parseFileContent } = require("../../../src/services/gutenberg.service");
const {
  book1: book1DataMock,
  book2: book2DataMock,
} = require("../../fixtures/book");

describe("Gutenberg service", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("parses values correctly", async () => {
    const RDFcontent = fs.readFileSync(
      join(__dirname, "..", "..", "fixtures", "book-1.rdf"),
      "utf8",
    );
    const parsedContent = parseFileContent(RDFcontent);

    expect(parsedContent).to.deep.equal(book1DataMock);
  });

  it("parses values correctly when special cases values are present (title is an array) in the RDF file", async () => {
    const RDFcontent = fs.readFileSync(
      join(__dirname, "..", "..", "fixtures", "book-2.rdf"),
      "utf8",
    );
    const parsedContent = parseFileContent(RDFcontent);

    expect(parsedContent).to.deep.equal(book2DataMock);
  });
});
