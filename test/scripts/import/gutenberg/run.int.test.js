const mongoose = require("mongoose");
const sinon = require("sinon");
const { join } = require("path");
const { keys, isArray } = require("lodash");

const { expect } = require("../../../helpers/chai");
const { Book } = require("../../../../src/models/Book.model");
const { run } = require("../../../../scripts/import/gutenberg/run");

describe("Run script - integration test", () => {
  beforeEach(() => {
    sinon.restore();
    sinon.stub(console, "log");
  });

  afterEach(async () => {
    // Clean up created data and close database connection
    await Book.deleteMany({});
    mongoose.connection.close();
  });

  it("Runs underlying commands properly and saves book data", async () => {
    const output = await run(
      join(__dirname, "..", "..", "..", "fixtures", "book-1.rdf"),
    );

    const book = await Book.findOne({ id: output.id });

    for (const key of keys(output)) {
      const currentValue = output[key];

      if (isArray(currentValue)) {
        expect(Array.from(book[key])).to.deep.equal(currentValue);
      } else {
        expect(book[key]).to.deep.equal(currentValue);
      }
    }
  });
});
