"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var parser_1 = require("./parser");
var printer_1 = require("./printer");
//input example: ~$ ./cron-parse "*/15 0 1,15 1 1-5 /usr/bin/find"
var params = yargs_1.default.argv;
var parsedOutput = parser_1.parser({
    minute: params._[0],
    hour: params._[1],
    dayOfMonth: params._[2],
    month: params._[3],
    dayOfWeek: params._[4],
    command: params._[5],
});
printer_1.printer(parsedOutput);
