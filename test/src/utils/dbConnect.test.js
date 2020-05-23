const sinon = require("sinon");
const mongoose = require("mongoose");

const { expect } = require("../../helpers/chai");
const { dbConnect } = require("../../../src/utils/dbConnect");

describe("dbConnect", () => {
  beforeEach(() => {
    sinon.restore();
    mongoose.connect = sinon.stub();
  });

  it("Calls mongoose.connect method with proper parameters", async () => {
    process.env.MONGO_CONNECTION_STRING = "test-mongo-connection-string";

    await dbConnect();

    expect(mongoose.connect).to.be.calledOnceWithExactly(
      "test-mongo-connection-string",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    );
  });
});
