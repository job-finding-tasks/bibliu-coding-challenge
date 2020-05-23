const chalk = require("chalk");

/**
 * For the development purposes we will be using console.log
 * If this was to be pushed to a remote server (such as AWS), we would replace this with real logger.
 */
const logger = {
  info: (message) => console.log(chalk.yellow(message)),
  success: (message) => console.log(chalk.green(message)),
  error: (message) => console.log(chalk.red(message)),
};

module.exports = { logger };
