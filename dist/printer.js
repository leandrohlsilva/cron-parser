"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printer = void 0;
var join = function (data) { return data.join(' '); };
var printer = function (output) {
    console.log("minute        " + join(output.minute));
    console.log("hour          " + join(output.hour));
    console.log("day of month  " + join(output.dayOfMonth));
    console.log("month         " + join(output.month));
    console.log("day of week   " + join(output.dayOfWeek));
    console.log("command       " + output.command);
};
exports.printer = printer;
