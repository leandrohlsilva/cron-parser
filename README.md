# CRON-PARSER
This module parses and prints a cron input into more readable format.

## Motivation
This is a exercise asked by Deliveroo.

## Contributing

To get started
```
yarn
yarn test
```

Used node v14.5.0 (npm v6.14.5)

## Running this project
```
./cron-parse */15 0 1,15 1 1-5 /usr/bin/find
```

Expected output:
```
./cron-parse */15 0 1,15 1 1-5 /usr/bin/find
minute        0 15 30 45
hour          0
day of month  1 15
month         1
day of week   1 2 3 4 5
command       /usr/bin/find
```
