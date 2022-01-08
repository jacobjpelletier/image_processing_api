"use strict";
/*
 Resize class constructor takes arguments path as string, width as number height as number
 Resize function takes an image and transforms the width, and height.
 export class
 */
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
// will need to reed file system
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
class Resize {
    constructor(path, width, height) {
        this.path = path; // path of image
        this.width = width; // width of image
        this.height = height; // height of image
    }
    resize(path, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const readStream = fs_1.default.createReadStream(path);
            try {
                // create new image
                let transform = yield (0, sharp_1.default)().resize(width, height);
                // sharp returns response asynchronously
                return readStream.pipe(transform);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
module.exports = Resize;
//# sourceMappingURL=resize.js.map