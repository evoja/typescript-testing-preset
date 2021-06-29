"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sum_1 = require("@evoja/typescript-testing-preset--lib/tools/sum");
const SumButton_m_css_1 = __importDefault(require("./SumButton.m.css"));
function SumButton(props) {
    const { a, b, red } = props;
    return (<button className={red ? SumButton_m_css_1.default['red'] : ''}>
      {`sum(${a}, ${b}) -> ${sum_1.sum(a, b)}`}
    </button>);
}
exports.default = SumButton;
//# sourceMappingURL=SumButton.jsx.map