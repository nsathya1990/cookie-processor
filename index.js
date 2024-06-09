const fs = require('fs');
const readline = require('readline');
const winston = require('winston'); // a logging library

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'output.log' }),
  ],
});

// Validate & parse command line arguments
function parseArgs(args) {
  if (args?.length !== 4 || args[0] !== '-f' || args[2] !== '-d') {
    throw new Error(
      'Invalid Arguments. Usage: node index.js -f filename -d date'
    );
  }
  const filename = args[args.indexOf('-f') + 1];
  const date = args[args.indexOf('-d') + 1];

  return { filename, date };
}

// Process the log file
function processLogFile(filename, date) {
  const cookieCounter = new Map();

  const rl = readline.createInterface({
    input: fs.createReadStream(filename),
  });

  rl.on('line', (line) => {
    const [cookie, timestamp] = line.split(',');
    if (timestamp.startsWith(date)) {
      cookieCounter.set(cookie, (cookieCounter.get(cookie) || 0) + 1);
    }
  });

  rl.on('close', () => {
    let maxCount = 0;
    const mostActiveCookies = [];

    for (const [cookie, count] of cookieCounter.entries()) {
      if (count > maxCount) {
        maxCount = count;
        mostActiveCookies.length = 0; // Clear the array
        mostActiveCookies.push(cookie);
      } else if (count === maxCount) {
        mostActiveCookies.push(cookie);
      }
    }

    if (mostActiveCookies.length > 0) {
      mostActiveCookies.forEach((cookie) => console.log(cookie));
      logger.info(`Most Active Cookie - ${mostActiveCookies}`);
    } else {
      logger.info('No cookies found for the given date.');
    }
  });

  rl.on('error', (err) => {
    logger.error('Error reading the file:', err);
  });
}

// Main function
function main() {
  try {
    const { filename, date } = parseArgs(process.argv.slice(2));
    processLogFile(filename, date);
  } catch (err) {
    logger.error('Error: ', err);
  }
}

main();

module.exports = { parseArgs, processLogFile };
