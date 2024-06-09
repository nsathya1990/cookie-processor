# Cookie Processor

This project provides a command line tool to process cookie logs and determine the most active cookie for a specified date.

## Requirements

- Node.js
- npm

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/nsathya1990/cookie-processor.git
    cd cookie-processor
    ```

2. Navigate to the project directory in your terminal
3. Install the dependencies by running the following command:
    ```sh
    npm install
    ```

## Usage

To find the most active cookie for a specific date, use the following command:

```sh
node index.js -f filename -d date
```

Replace filename with the name of your log file and the date you want to check in the format yyyy-mm-dd.
Example:

```sh
node index.js -f cookie_log.csv -d 2018-12-09
```

## Logging

The application uses the `winston` library for logging. Logs are written to `error.log` for errors and `combined.log` for all logs.
