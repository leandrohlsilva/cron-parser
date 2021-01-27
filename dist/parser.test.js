"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = __importDefault(require("ramda"));
var chai_1 = require("chai");
var parser_1 = require("./parser");
describe('parser', function () {
    it('should parse all asterisks', function () {
        var expected = {
            minute: ramda_1.default.range(0, 60),
            hour: ramda_1.default.range(0, 24),
            dayOfWeek: ramda_1.default.range(1, 8),
            month: ramda_1.default.range(1, 13),
            dayOfMonth: ramda_1.default.range(1, 32),
            command: 'command',
        };
        var actual = parser_1.parser({
            minute: '*',
            hour: '*',
            dayOfWeek: '*',
            month: '*',
            dayOfMonth: '*',
            command: 'command',
        });
        chai_1.expect(actual).to.be.deep.equal(expected);
    });
    it('should parse single values', function () {
        var expected = {
            minute: [0],
            hour: [1],
            dayOfWeek: [2],
            month: [3],
            dayOfMonth: [4],
            command: 'command',
        };
        var actual = parser_1.parser({
            minute: '0',
            hour: '1',
            dayOfWeek: '2',
            month: '3',
            dayOfMonth: '4',
            command: 'command',
        });
        chai_1.expect(actual).to.be.deep.equal(expected);
    });
    it('should parse single multiple values', function () {
        var expected = {
            minute: [0, 1],
            hour: [1, 2],
            dayOfWeek: [2, 3],
            month: [3, 4],
            dayOfMonth: [4, 5],
            command: 'command',
        };
        var actual = parser_1.parser({
            minute: '0,1',
            hour: '1,2',
            dayOfWeek: '2,3',
            month: '3,4',
            dayOfMonth: '4,5',
            command: 'command',
        });
        chai_1.expect(actual).to.be.deep.equal(expected);
    });
    it('should parse a range', function () {
        var expected = {
            minute: [0, 1, 2, 3],
            hour: [1, 2, 3, 4],
            dayOfWeek: [2, 3, 4, 5],
            month: [3, 4, 5, 6],
            dayOfMonth: [4, 5, 6],
            command: 'command',
        };
        var actual = parser_1.parser({
            minute: '0-3',
            hour: '1-4',
            dayOfWeek: '2-5',
            month: '3-6',
            dayOfMonth: '4-6',
            command: 'command',
        });
        chai_1.expect(actual).to.be.deep.equal(expected);
    });
    it('should parse a repetition', function () {
        var expected = {
            minute: [0, 15, 30, 45],
            hour: [0, 4, 8, 12, 16, 20],
            dayOfWeek: [1, 3, 5, 7],
            month: [1, 7],
            dayOfMonth: [1, 6, 11, 16, 21, 26, 31],
            command: 'command',
        };
        var actual = parser_1.parser({
            minute: '*/15',
            hour: '*/4',
            dayOfWeek: '*/2',
            month: '*/6',
            dayOfMonth: '*/5',
            command: 'command',
        });
        chai_1.expect(actual).to.be.deep.equal(expected);
    });
});
