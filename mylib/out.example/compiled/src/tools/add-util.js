"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add2 = void 0;
// In real life I would use local relative path './add' in this import
// but I want to demonstrate feature of my presed in using of full package name.
const add_1 = require("@evoja/typescript-testing-preset--lib/tools/add");
function add2(a) {
    return add_1.add(a, 2);
}
exports.add2 = add2;
//# sourceMappingURL=add-util.js.map