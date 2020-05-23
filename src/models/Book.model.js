const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, min: 1 },
    title: { type: String, index: true, required: true },
    author: { type: String, index: true, required: true },
    publisher: String,
    publicationDate: { type: Date, index: true },
    language: String,
    subjects: [String],
    licenseRights: String,
  },
  {
    timestamps: true,
  },
);

const Book = mongoose.model("Book", BookSchema);

module.exports = { Book };
