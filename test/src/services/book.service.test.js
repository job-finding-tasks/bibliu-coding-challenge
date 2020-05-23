const sinon = require("sinon");
const { keys, isArray } = require("lodash");

const { expect } = require("../../helpers/chai");
const { createBook } = require("../../../src/services/book.service");
const { Book } = require("../../../src/models/Book.model");
const { book1: bookDataMock } = require("../../fixtures/book");

describe("Book service", () => {
  describe("createBook", () => {
    beforeEach(() => {
      sinon.restore();
      Book.prototype.save = sinon.stub();
    });

    it("initializes new Book model with proper parameters and calls save method", async () => {
      const createdBook = await createBook(bookDataMock);

      expect(Book.prototype.save).to.be.calledOnce;

      for (const key of keys(bookDataMock)) {
        const mockValue = bookDataMock[key];

        if (isArray(mockValue)) {
          // If we encountered array value, we have to make sure to convert CoreMongooseArray to Array
          expect(Array.from(createdBook[key])).to.deep.equal(mockValue);
        } else {
          expect(createdBook[key]).to.deep.equal(mockValue);
        }
      }
    });
  });
});
