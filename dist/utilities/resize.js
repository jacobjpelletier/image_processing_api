"use strict";
/*
 Resize class constructor takes arguments path as string, width as number height as number
 Resize function takes an image and transforms the width, and height.
 export class
 */
// will need to reed file system
const fs = require('fs');
const sharp = require('sharp');
class Resize {
    constructor(path, width, height) {
        this.path = path; // path of image
        this.width = width; // width of image
        this.height = height; // height of image
    }
    resize(path, width, height) {
        const readStream = fs.createReadStream(path);
        let transform = sharp();
        transform = transform.resize(width, height);
        return readStream.pipe(transform);
    }
}
module.exports = Resize;
//# sourceMappingURL=resize.js.map