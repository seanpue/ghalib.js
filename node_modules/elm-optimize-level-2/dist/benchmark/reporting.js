"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownTable = exports.markdown = exports.terminal = void 0;
const chalk_1 = __importDefault(require("chalk"));
// Render results as markdown
const terminal = (report) => {
    let buffer = [];
    // List asset sizes
    for (let key in report.assets) {
        buffer.push(chalk_1.default.green(key + ' asset overview'));
        buffer.push('');
        report.assets[key].forEach((item) => {
            buffer.push('    ' +
                item.name.padEnd(40, ' ') +
                '' +
                humanizeNumber(roundToDecimal(1, item.bytes / Math.pow(2, 10))).padStart(10, ' ') +
                'kb');
        });
        buffer.push('');
    }
    buffer.push('');
    // List benchmarks
    for (let project in report.benchmarks) {
        buffer.push(chalk_1.default.green(project));
        buffer.push('');
        for (let benchKey in report.benchmarks[project]) {
            let bench = report.benchmarks[project][benchKey];
            let base = null;
            let browser = null;
            buffer.push(chalk_1.default.cyan(benchKey));
            bench.forEach((item) => {
                if (item.status.status == 'success') {
                    let tag = '';
                    let delta = '';
                    if (item.tag != null) {
                        tag = ', ' + item.tag;
                    }
                    if (base == null) {
                        base = item.status.runsPerSecond;
                        browser = item.browser;
                    }
                    else if (browser != item.browser) {
                        base = item.status.runsPerSecond;
                        browser = item.browser;
                    }
                    else {
                        let percentChange = (item.status.runsPerSecond / base) * 100;
                        if (percentChange > 105) {
                            delta = ' (' + chalk_1.default.green(Math.round(percentChange)) + '%)';
                        }
                        else if (percentChange < 97) {
                            delta = ' (' + chalk_1.default.red(Math.round(percentChange)) + '%)';
                        }
                        else {
                            delta = ' (' + Math.round(percentChange) + '%)';
                        }
                    }
                    const goodness = chalk_1.default.grey('(' + Math.round(item.status.goodnessOfFit * 100) + '%*)');
                    const label = '   ' + item.browser + tag + goodness;
                    const datapoint = chalk_1.default.yellow(humanizeNumber(item.status.runsPerSecond).padStart(10, ' ')) +
                        ' runs/sec ' +
                        delta;
                    buffer.push(label.padEnd(60, ' ') + datapoint);
                    if (item.v8) {
                        if (item.v8.uncalled.length + item.v8.interpreted.length + item.v8.optimized.length + item.v8.other.length + item.v8.memory.length > 0) {
                            buffer.push("");
                        }
                        if (item.v8.interpreted.length > 0) {
                            buffer.push("   " + chalk_1.default.yellow("Interpreted"));
                            buffer.push("       " + item.v8.interpreted.join("\n       "));
                            buffer.push("");
                        }
                        if (item.v8.optimized.length > 0) {
                            buffer.push("   " + chalk_1.default.green("Optimized"));
                            buffer.push("       " + item.v8.optimized.join("\n       "));
                            buffer.push("");
                        }
                        if (item.v8.other.length > 0) {
                            buffer.push("   " + chalk_1.default.green("Unknown status"));
                            for (const func of item.v8.other) {
                                buffer.push("        " + func.name + ", status: " + func.status);
                            }
                        }
                        if (item.v8.uncalled.length > 0) {
                            buffer.push("   " + chalk_1.default.yellow("Uncalled"));
                            buffer.push("       " + item.v8.uncalled.join("\n       "));
                            buffer.push("");
                        }
                        if (item.v8.memory.length > 0) {
                            buffer.push("   " + chalk_1.default.yellow("Memory representation"));
                            for (const mem of item.v8.memory) {
                                buffer.push("       " + mem.name + "\n          " + mem.representation.join("\n          "));
                                buffer.push("");
                            }
                        }
                    }
                }
                else {
                    console.log('FAILURE', item);
                }
            });
            buffer.push('');
            buffer.push('');
        }
        buffer.push('');
        buffer.push('');
    }
    return buffer.join('\n');
};
exports.terminal = terminal;
function v8MemoryDescription(representation) {
    let descriptors = [];
    for (const key in representation) {
        if (representation[key]) {
            descriptors.push(key);
        }
    }
    return descriptors;
}
// Render results as markdown
const markdown = (report) => {
    let buffer = [];
    buffer.push('# Benchmark results');
    buffer.push('');
    // List asset sizes
    for (let key in report.assets) {
        buffer.push('## ' + key + ' asset overview');
        buffer.push('');
        report.assets[key].forEach((item) => {
            buffer.push('    ' +
                item.name.padEnd(40, ' ') +
                '' +
                humanizeNumber(roundToDecimal(1, item.bytes / Math.pow(2, 10))).padStart(10, ' ') +
                'kb');
        });
        buffer.push('');
    }
    buffer.push('');
    // List benchmarks
    for (let project in report.benchmarks) {
        buffer.push('## ' + project);
        buffer.push('');
        for (let benchKey in report.benchmarks[project]) {
            let bench = report.benchmarks[project][benchKey];
            let base = null;
            let browser = null;
            buffer.push('-> ' + benchKey);
            bench.forEach((item) => {
                if (item.status.status == 'success') {
                    let tag = '';
                    let delta = '';
                    if (item.tag != null) {
                        tag = ', ' + item.tag;
                    }
                    if (base == null) {
                        base = item.status.runsPerSecond;
                        browser = item.browser;
                    }
                    else if (browser != item.browser) {
                        base = item.status.runsPerSecond;
                        browser = item.browser;
                    }
                    else {
                        let percentChange = (item.status.runsPerSecond / base) * 100;
                        delta = ' (' + Math.round(percentChange) + '%)';
                    }
                    const goodness = '(' + Math.round(item.status.goodnessOfFit * 100) + '%*)';
                    const label = '   ' + item.browser + tag + goodness;
                    const datapoint = humanizeNumber(item.status.runsPerSecond).padStart(10, ' ') +
                        ' runs/sec ' +
                        delta;
                    buffer.push(label.padEnd(40, ' ') + datapoint);
                }
                else {
                    console.log('FAILURE', item);
                }
            });
            buffer.push('');
            buffer.push('');
        }
        buffer.push('');
        buffer.push('');
    }
    buffer.push('');
    buffer.push('');
    return buffer.join('\n');
};
exports.markdown = markdown;
const markdownTable = (report) => {
    let buffer = [];
    buffer.push('# Benchmark results');
    buffer.push('');
    // List asset sizes
    for (let key in report.assets) {
        buffer.push('## ' + key + ' asset overview');
        buffer.push('');
        report.assets[key].forEach((item) => {
            buffer.push('    ' +
                item.name.padEnd(40, ' ') +
                '' +
                humanizeNumber(roundToDecimal(1, item.bytes / Math.pow(2, 10))).padStart(10, ' ') +
                'kb');
        });
        buffer.push('');
    }
    buffer.push('');
    // List benchmarks
    for (let project in report.benchmarks) {
        buffer.push('## ' + project);
        buffer.push('');
        buffer.push('|' +
            [
                'Name'.padEnd(40, ' '),
                'Transformtions'.padEnd(30, ' '),
                'Browser'.padEnd(10, ' '),
                'Ops/Second'.padEnd(14, ' '),
                '% Change'.padEnd(8, ' '),
            ].join('|') +
            '|');
        buffer.push('|' +
            [
                ''.padEnd(40, '-'),
                ''.padEnd(30, '-'),
                ''.padEnd(10, '-'),
                ''.padEnd(14, '-'),
                ''.padEnd(8, '-'),
            ].join('|') +
            '|');
        for (let benchKey in report.benchmarks[project]) {
            let bench = report.benchmarks[project][benchKey];
            let base = null;
            let browser = null;
            bench.forEach((item) => {
                if (item.status.status == 'success') {
                    let delta = '';
                    if (base == null) {
                        base = item.status.runsPerSecond;
                        browser = item.browser;
                    }
                    else if (browser != item.browser) {
                        base = item.status.runsPerSecond;
                        browser = item.browser;
                    }
                    else {
                        let percentChange = (item.status.runsPerSecond / base) * 100;
                        delta = ' (' + Math.round(percentChange) + '%)';
                    }
                    let tag = '';
                    if (item.tag != null) {
                        tag = item.tag;
                    }
                    const goodness = '(' + Math.round(item.status.goodnessOfFit * 100) + '%*)';
                    let line = [benchKey.padEnd(40, ' ')];
                    line.push(tag.padEnd(30, ' '));
                    line.push(item.browser.padEnd(10, ' '));
                    line.push(humanizeNumber(item.status.runsPerSecond).padStart(14, ' '));
                    line.push(delta.padStart(8, ' '));
                    buffer.push('| ' + line.join('|') + ' |');
                }
                else {
                    console.log('FAILURE', item);
                }
            });
            // buffer.push('');
            // buffer.push('');
        }
        buffer.push('');
        buffer.push('');
    }
    buffer.push('');
    buffer.push('');
    return buffer.join('\n');
};
exports.markdownTable = markdownTable;
// adds commas to the number so its easier to read.
function humanizeNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function roundToDecimal(level, num) {
    let factor = Math.pow(10, level);
    return Math.round(num * factor) / factor;
}
//# sourceMappingURL=reporting.js.map