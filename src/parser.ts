import R from 'ramda';

export type CronInput = {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
  command: string;
};

export type CronOutput = {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
  command: string;
};

type Command = {
  operation:
    | 'ALL_VALUES'
    | 'SINGLE_VALUE'
    | 'MULTIPLE_VALUES'
    | 'RANGE'
    | 'REPETITION';
  data?: number | number[];
};

const createSingleValueCommand = (data: string): Command => ({
  operation: 'SINGLE_VALUE',
  data: parseInt(data),
});

const createMultipleValuesCommand = (data: string): Command => ({
  operation: 'MULTIPLE_VALUES',
  data: data.split(',').map((n) => parseInt(n)),
});

const createRangeCommand = (data: string): Command => ({
  operation: 'RANGE',
  data: data.split('-').map((n) => parseInt(n)),
});

const createRepetitionCommand = (data: string): Command => ({
  operation: 'REPETITION',
  data: parseInt(data.slice(2)),
});

const convertToArray = [].concat.bind([]);

const isSingleValue = R.test(/^\d+$/);
const isMultipleValues = R.test(/^(:?\d+,)+\d+$/);
const isRange = R.test(/^\d+-\d+$/);
const isRepetition = R.test(/^\*\/\d+$/);

const convertToCommand = (entry: string): Command => {
  return R.cond<string, Command>([
    [R.equals('*'), R.always({ operation: 'ALL_VALUES' })],
    [isSingleValue, createSingleValueCommand],
    [isMultipleValues, createMultipleValuesCommand],
    [isRange, createRangeCommand],
    [isRepetition, createRepetitionCommand],
  ])(entry);
};

const isAllCommand = R.propEq('operation', 'ALL_VALUES');
const isSingleValueCommand = R.propEq('operation', 'SINGLE_VALUE');
const isMultipleValuesCommand = R.propEq('operation', 'MULTIPLE_VALUES');
const isRangeCommand = R.propEq('operation', 'RANGE');
const isRepetitionCommand = R.propEq('operation', 'REPETITION');

const parseEntry = R.curry((start: number, end: number, entry: string) => {
  return R.cond<Command, number[] | null>([
    [isAllCommand, R.always(R.range(start, end))],
    [isSingleValueCommand, R.compose(convertToArray, R.propOr(null, 'data'))],
    [isMultipleValuesCommand, R.propOr(null, 'data')],
    [
      isRangeCommand,
      R.compose(
        (range: number[]) => R.range(range[0], range[1] + 1),
        R.propOr(null, 'data')
      ),
    ],
    [
      isRepetitionCommand,
      R.compose(
        (divider: number) =>
          R.range(0, end - 1)
            .filter((n) => n % divider === 0)
            .map((n) => n + start),
        R.propOr(null, 'data')
      ),
    ],
    [R.T, R.always(null)],
  ])(convertToCommand(entry));
});
const parseMinute = parseEntry(0, 60);
const parseHour = parseEntry(0, 24);
const parseDayOfWeek = parseEntry(1, 8);
const parseDayOfMonth = parseEntry(1, 32);
const parseMonth = parseEntry(1, 13);

export const parser = (input: CronInput): CronOutput => {
  const output: CronOutput = {
    command: input.command,
    minute: parseMinute(input.minute),
    hour: parseHour(input.hour),
    dayOfWeek: parseDayOfWeek(input.dayOfWeek),
    dayOfMonth: parseDayOfMonth(input.dayOfMonth),
    month: parseMonth(input.month),
  };
  return output;
};