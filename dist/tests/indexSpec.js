"use strict";
/* TESTS FOR INDEX.js*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// first, import function to test from index file
const index_1 = __importDefault(require("../index"));
it('expect testFunc(5) to equal 25', () => {
    expect((0, index_1.default)(5)).toEqual(25);
});
//# sourceMappingURL=indexSpec.js.map