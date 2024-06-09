const fs = require('fs');
const readline = require('readline');
const path = require('path');
const winston = require('winston'); // a logging library

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Validate & parse command line arguments
function parseArgs(args) {
  if (args?.length < 4 || !args.include('-f') || !args.include('-d')) {
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
    input: fs.createReadStream(path.join(__dirname, filename)),
    output: process.stdout,
    terminal: false,
  });

  rl.on('line', (line) => {
    const [cookie, timestamp] = line.split(',');
    if (timestamp.startsWith(date)) {
      cookieCounter.set(cookie, (cookieCounter.get(cookie) || 0) + 1);
    }
  });

  rl.on('close', () => {
    const maxCount = Math.max(...Array.from(cookieCounter.values()));
    for (const [cookie, count] of cookieCounter.entries()) {
      if (count === maxCount) {
        logger.info('Most Active Cookie', cookie);
      }
    }
  });

  rl.on('error', (err) => {
    logger.error('Error reading the file:', err);
  });
}

//Main function
function main() {
  try {
    const { filename, date } = parseArgs(process.argv.slice(2));
    processLogFile(filename, date);
  } catch (err) {
    logger.error('Error: ', err);
    process.exit(1);
  }
}

main();
