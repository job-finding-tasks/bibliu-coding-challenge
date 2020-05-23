const { Book } = require("../models/Book.model");

/**
 * Creates new book and returns saved data
 *
 * @param {*} createBookParameters
 */
const createBook = async (createBookParameters) => {
  const book = new Book(createBookParameters);
  await book.save();
  return book;
};

module.exports = { createBook };
