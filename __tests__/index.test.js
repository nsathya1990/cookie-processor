const { parseArgs, processLogFile } = require('../index');
const fs = require('fs');
const readline = require('readline');
const winston = require('winston');

jest.mock('fs');
jest.mock('readline');
jest.mock('winston');

describe('parseArgs', () => {
  it('should parse valid arguments', () => {
    const args = ['-f', 'filename', '-d', 'date'];
    const result = parseArgs(args);
    expect(result).toEqual({ filename: 'filename', date: 'date' });
  });

  it('should throw an error for invalid arguments', () => {
    const args = ['-f', '-d'];
    expect(() => parseArgs(args)).toThrow(
      'Invalid Arguments. Usage: node index.js -f filename -d date'
    );
  });
});

describe('processLogFile', () => {
  beforeEach(() => {
    fs.createReadStream.mockClear();
    readline.createInterface.mockClear();
    winston.createLogger.mockClear();
  });

  it('should count cookies correctly and log the most active cookie(s)', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const filename = 'test.log';
    const date = '2022-01-01';

    processLogFile(filename, date);

    // Check if createReadStream was called with the correct filename
    expect(fs.createReadStream).toHaveBeenCalledWith(filename);

    // Check if the correct cookies were logged
    expect(consoleSpy).toHaveBeenCalledWith('cookie1');

    consoleSpy.mockRestore();
  });
});
