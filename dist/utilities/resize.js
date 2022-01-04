"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const sharp = require('sharp');
function resize(path, format, width, height) {
    const readStream = fs.createReadStream(path);
    let transform = sharp();
    if (format) {
        transform = transform.toFormat(format);
    }
    if (width || height) {
        transform = transform.resize(width, height);
    }
    return readStream.pipe(transform);
}
exports.default = resize;
//# sourceMappingURL=resize.js.map