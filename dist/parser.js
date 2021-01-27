"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
var ramda_1 = __importDefault(require("ramda"));
var createSingleValueCommand = function (data) { return ({
    operation: 'SINGLE_VALUE',
    data: parseInt(data),
}); };
var createMultipleValuesCommand = function (data) { return ({
    operation: 'MULTIPLE_VALUES',
    data: data.split(',').map(function (n) { return parseInt(n); }),
}); };
var createRangeCommand = function (data) { return ({
    operation: 'RANGE',
    data: data.split('-').map(function (n) { return parseInt(n); }),
}); };
var createRepetitionCommand = function (data) { return ({
    operation: 'REPETITION',
    data: parseInt(data.slice(2)),
}); };
var convertToArray = [].concat.bind([]);
var isSingleValue = ramda_1.default.test(/^\d+$/);
var isMultipleValues = ramda_1.default.test(/^(:?\d+,)+\d+$/);
var isRange = ramda_1.default.test(/^\d+-\d+$/);
var isRepetition = ramda_1.default.test(/^\*\/\d+$/);
var convertToCommand = function (entry) {
    return ramda_1.default.cond([
        [ramda_1.default.equals('*'), ramda_1.default.always({ operation: 'ALL_VALUES' })],
        [isSingleValue, createSingleValueCommand],
        [isMultipleValues, createMultipleValuesCommand],
        [isRange, createRangeCommand],
        [isRepetition, createRepetitionCommand],
    ])(entry);
};
var isAllCommand = ramda_1.default.propEq('operation', 'ALL_VALUES');
var isSingleValueCommand = ramda_1.default.propEq('operation', 'SINGLE_VALUE');
var isMultipleValuesCommand = ramda_1.default.propEq('operation', 'MULTIPLE_VALUES');
var isRangeCommand = ramda_1.default.propEq('operation', 'RANGE');
var isRepetitionCommand = ramda_1.default.propEq('operation', 'REPETITION');
var parseEntry = ramda_1.default.curry(function (start, end, entry) {
    return ramda_1.default.cond([
        [isAllCommand, ramda_1.default.always(ramda_1.default.range(start, end))],
        [isSingleValueCommand, ramda_1.default.compose(convertToArray, ramda_1.default.propOr(null, 'data'))],
        [isMultipleValuesCommand, ramda_1.default.propOr(null, 'data')],
        [
            isRangeCommand,
            ramda_1.default.compose(function (range) { return ramda_1.default.range(range[0], range[1] + 1); }, ramda_1.default.propOr(null, 'data')),
        ],
        [
            isRepetitionCommand,
            ramda_1.default.compose(function (divider) {
                return ramda_1.default.range(0, end - 1)
                    .filter(function (n) { return n % divider === 0; })
                    .map(function (n) { return n + start; });
            }, ramda_1.default.propOr(null, 'data')),
        ],
        [ramda_1.default.T, ramda_1.default.always(null)],
    ])(convertToCommand(entry));
});
var parseMinute = parseEntry(0, 60);
var parseHour = parseEntry(0, 24);
var parseDayOfWeek = parseEntry(1, 8);
var parseDayOfMonth = parseEntry(1, 32);
var parseMonth = parseEntry(1, 13);
var parser = function (input) {
    var output = {
        command: input.command,
        minute: parseMinute(input.minute),
        hour: parseHour(input.hour),
        dayOfWeek: parseDayOfWeek(input.dayOfWeek),
        dayOfMonth: parseDayOfMonth(input.dayOfMonth),
        month: parseMonth(input.month),
    };
    return output;
};
exports.parser = parser;
