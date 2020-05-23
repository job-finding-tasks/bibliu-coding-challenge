const sinon = require("sinon");
const fs = require("fs");

const { expect } = require("../../helpers/chai");
const { readFileContent } = require("../../../src/services/file.service");

describe("File service", () => {
  describe("readFileContent", () => {
    beforeEach(() => {
      sinon.restore();
      sinon.stub(fs, "readFileSync");
    });

    it("calls readFileSync method with proper parameters and default encoding", async () => {
      readFileContent("read-file-path");

      expect(fs.readFileSync).to.be.calledOnceWithExactly(
        "read-file-path",
        "utf8",
      );
    });

    it("calls readFileSync method with proper parameters and custom encoding", async () => {
      readFileContent("read-file-path", "ascii");

      expect(fs.readFileSync).to.be.calledOnceWithExactly(
        "read-file-path",
        "ascii",
      );
    });
  });
});
