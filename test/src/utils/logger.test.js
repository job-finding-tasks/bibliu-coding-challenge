const sinon = require("sinon");
const chalk = require("chalk");

const { expect } = require("../../helpers/chai");
const { logger } = require("../../../src/utils/logger");

let consoleLogStub;

beforeEach(() => {
  sinon.restore();
  consoleLogStub = sinon.stub(console, "log");
});

describe("logger", () => {
  describe("info", () => {
    it("calls console.log with proper parameters", () => {
      logger.info("Test info message");

      expect(consoleLogStub).to.be.calledOnceWithExactly(
        chalk.yellow("Test info message"),
      );
    });
  });

  describe("success", () => {
    it("calls console.log with proper parameters", () => {
      logger.success("Test success message");

      expect(consoleLogStub).to.be.calledOnceWithExactly(
        chalk.green("Test success message"),
      );
    });
  });

  describe("error", () => {
    it("calls console.log with proper parameters", () => {
      logger.error("Test error message");

      expect(consoleLogStub).to.be.calledOnceWithExactly(
        chalk.red("Test error message"),
      );
    });
  });
});
