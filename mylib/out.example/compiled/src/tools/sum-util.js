"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add2 = void 0;
// In real life I would use local relative path './add' in this import
// but I want to demonstrate feature of my presed in using of full package name.
const sum_1 = require("@evoja/typescript-testing-preset--lib/tools/sum");
function add2(a) {
    return sum_1.sum(a, 2);
}
exports.add2 = add2;
//# sourceMappingURL=sum-util.js.map