const mongoose = require("mongoose");

/**
 * Connects to the MongoDB (to the database specified via Mongo connection string in .env file)
 */
const dbConnect = async () =>
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

module.exports = { dbConnect };
