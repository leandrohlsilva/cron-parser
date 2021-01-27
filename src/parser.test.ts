import R from 'ramda';
import { expect } from 'chai';
import { parser, CronInput, CronOutput } from './parser';


describe('parser', () => {
  it('should parse all asterisks', () => {
    const expected: CronOutput = {
      minute: R.range(0, 60),
      hour: R.range(0, 24),
      dayOfWeek: R.range(1, 8),
      month: R.range(1, 13),
      dayOfMonth: R.range(1, 32),
      command: 'command',
    };
    const actual = parser({
      minute: '*',
      hour: '*',
      dayOfWeek: '*',
      month: '*',
      dayOfMonth: '*',
      command: 'command',
    });
    expect(actual).to.be.deep.equal(expected);
  });

  it('should parse single values', () => {
    const expected: CronOutput = {
      minute: [0],
      hour: [1],
      dayOfWeek: [2],
      month: [3],
      dayOfMonth: [4],
      command: 'command',
    };
    const actual = parser({
      minute: '0',
      hour: '1',
      dayOfWeek: '2',
      month: '3',
      dayOfMonth: '4',
      command: 'command',
    });
    expect(actual).to.be.deep.equal(expected);
  });

  it('should parse single multiple values', () => {
    const expected: CronOutput = {
      minute: [0, 1],
      hour: [1, 2],
      dayOfWeek: [2, 3],
      month: [3, 4],
      dayOfMonth: [4, 5],
      command: 'command',
    };
    const actual = parser({
      minute: '0,1',
      hour: '1,2',
      dayOfWeek: '2,3',
      month: '3,4',
      dayOfMonth: '4,5',
      command: 'command',
    });
    expect(actual).to.be.deep.equal(expected);
  });

  it('should parse a range', () => {
    const expected: CronOutput = {
      minute: [0, 1, 2, 3],
      hour: [1, 2, 3, 4],
      dayOfWeek: [2, 3, 4, 5],
      month: [3, 4, 5, 6],
      dayOfMonth: [4, 5, 6],
      command: 'command',
    };
    const actual = parser({
      minute: '0-3',
      hour: '1-4',
      dayOfWeek: '2-5',
      month: '3-6',
      dayOfMonth: '4-6',
      command: 'command',
    });
    expect(actual).to.be.deep.equal(expected);
  });

  it('should parse a repetition', () => {
    const expected: CronOutput = {
      minute: [0, 15, 30, 45],
      hour: [0, 4, 8, 12, 16, 20],
      dayOfWeek: [1, 3, 5, 7],
      month: [1, 7],
      dayOfMonth: [1, 6, 11, 16, 21, 26, 31],
      command: 'command',
    };
    const actual = parser({
      minute: '*/15',
      hour: '*/4',
      dayOfWeek: '*/2',
      month: '*/6',
      dayOfMonth: '*/5',
      command: 'command',
    });
    expect(actual).to.be.deep.equal(expected);
  });
});
