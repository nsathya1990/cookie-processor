const fs = require('fs');
const readline = require('readline');
const path = require('path');

const args = process.argv.slice(2);
console.log('args', args);
const filename = args[args.indexOf('-f') + 1];
console.log('filename', filename);
const date = args[args.indexOf('-d') + 1];
console.log('date', date);

const cookieCounter = new Map();

console.log('__dirname', __dirname);
const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, filename)),
  output: process.stdout,
  terminal: false,
});
// console.log('rl', rl);

rl.on('line', (line) => {
  const [cookie, timestamp] = line.split(',');
  console.log('cookie', cookie);
  console.log('timestamp', timestamp);
  if (timestamp.startsWith(date)) {
    cookieCounter.set(cookie, (cookieCounter.get(cookie) || 0) + 1);
  }
  // console.log('cookieCounter', cookieCounter);
});
rl.on('close', () => {
  const maxCount = Math.max(...Array.from(cookieCounter.values()));
  for (const [cookie, count] of cookieCounter.entries()) {
    if (count === maxCount) {
      console.log('Most Active Cookie', cookie);
    }
  }
});
