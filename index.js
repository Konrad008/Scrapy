"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
exports.run = engine_1.run;
exports.engineSubject = engine_1.engineSubject;
exports.jobSubject = engine_1.jobSubject;
exports.returnSubject = engine_1.returnSubject;
exports.puppeteerSubject = engine_1.puppeteerSubject;
exports.threadSubject = engine_1.threadSubject;
const engine = {
    run: engine_1.run,
    engineSubject: engine_1.engineSubject,
    jobSubject: engine_1.jobSubject,
    puppeteerSubject: engine_1.puppeteerSubject,
    returnSubject: engine_1.returnSubject,
    threadSubject: engine_1.threadSubject,
};
exports.scrapyjs = engine;
