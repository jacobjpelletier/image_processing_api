"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resize_1 = __importDefault(require("../utilities/resize"));
describe('test resize class', () => {
    // test class constructor
    const resizeTest = new resize_1.default('src/images/mario.jpg', 100, 100);
    it('initial path assignment works', () => {
        expect(resizeTest.path).toEqual('src/images/mario.jpg');
    });
    it('initial width assignment works', () => {
        expect(resizeTest.width).toEqual(100);
    });
    it('initial height assignment works', () => {
        expect(resizeTest.height).toEqual(100);
    });
});
//# sourceMappingURL=resizeSpec.js.map