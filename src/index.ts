import yargs from 'yargs';
import { parser } from './parser';
import { printer } from './printer';

//input example: ~$ ./cron-parse "*/15 0 1,15 1 1-5 /usr/bin/find"

const params = yargs.argv;

const parsedOutput = parser({
  minute: params._[0] as string,
  hour: params._[1] as string,
  dayOfMonth: params._[2] as string,
  month: params._[3] as string,
  dayOfWeek: params._[4] as string,
  command: params._[5] as string,
});

printer(parsedOutput);
