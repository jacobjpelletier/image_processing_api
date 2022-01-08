"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* TESTS FOR INDEX.js*/
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = __importDefault(require("fs"));
const request = (0, supertest_1.default)(index_1.default);
describe("Test endpoint responses", () => {
    it("get welcome endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/");
        expect(response.status).toBe(200);
    }));
    it("get the api endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/resize");
        expect(response.status).toBe(200);
    }));
    // test piping
    it("invalid valid file, no dimensions", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/resize/?filename=m");
        expect(response.status).toBe(200);
    }));
    it("invalid valid file, width and height", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/resize/?filename=m&width=100&height=100");
        expect(response.status).toBe(200);
    }));
    it("valid file, no dimensions", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/resize/?filename=mario");
        expect(response.status).toBe(200);
    }));
    it("valid file, invalid dimensions (NaN)", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/resize/?filename=mario&width=abc&height=def");
        expect(response.status).toBe(200);
    }));
    it("valid file, invalid dimensions (<= 0)", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/resize/?filename=mario&width=0&height=-1");
        expect(response.status).toBe(200);
    }));
    it("valid file, width and height", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/resize/?filename=mario&width=100&height=100");
        expect(response.status).toBe(200);
    }));
});
describe("Test file system operations", () => {
    it("read from file system", () => {
        expect(fs_1.default.existsSync("src/images/mario.jpg")).toBeTrue();
    });
    it("write if file does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        /* assumes src/resizedImages/mario-100-100.jpg does not exist */
        const response = yield request.get("/resize/?filename=mario&width=123&height=123");
        expect(response.status).toBe(200);
        expect(fs_1.default.existsSync("src/resizedImages/mario-123-123.jpg"));
    }));
    it("read if file does exist", () => __awaiter(void 0, void 0, void 0, function* () {
        /* assumes src/resizedImages/mario-100-100.jpg does exist */
        const response = yield request.get("/resize/?filename=mario&width=123&height=123");
        expect(response.status).toBe(200);
        expect(fs_1.default.existsSync("src/resizedImages/mario-100-100.jpg"));
    }));
});
//# sourceMappingURL=indexSpec.js.map