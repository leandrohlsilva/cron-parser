import { CronOutput } from "./parser";

const join = (data: number[]) => data.join(' ');

export const printer = (output: CronOutput) => {
  console.log(`minute        ${join(output.minute)}`);
  console.log(`hour          ${join(output.hour)}`);
  console.log(`day of month  ${join(output.dayOfMonth)}`);
  console.log(`month         ${join(output.month)}`);
  console.log(`day of week   ${join(output.dayOfWeek)}`);
  console.log(`command       ${output.command}`);
};
