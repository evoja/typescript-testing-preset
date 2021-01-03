"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const add_1 = require("@evoja/typescript-testing-preset--lib/tools/add");
const AddButton_m_css_1 = __importDefault(require("./AddButton.m.css"));
function AddButton(props) {
    const { a, b, red } = props;
    return (<button className={red ? AddButton_m_css_1.default['red'] : ''}>
      {`add(${a}, ${b}) -> ${add_1.add(a, b)}`}
    </button>);
}
exports.default = AddButton;
//# sourceMappingURL=AddButton.jsx.map