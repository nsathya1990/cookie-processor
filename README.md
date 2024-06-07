# Cookie Processor

This project provides a command line tool to process cookie logs and determine the most active cookie for a specified date.

## Requirements

- Node.js (version 12.x or higher)
- npm (version 6.x or higher)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/nsathya1990/cookie-processor.git
    cd cookie-processor
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

To find the most active cookie for a specific date, use the following command:

```sh
node index.js -f cookie_log.csv -d 2018-12-09
