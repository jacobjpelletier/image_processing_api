/*
 Resize class constructor takes arguments path as string, width as number height as number
 Resize function takes an image and transforms the width, and height.
 export class
 */

// will need to reed file system
import fs from "fs";
import sharp from "sharp";

class Resize {
  public path: string;
  public width: number;
  public height: number;

  constructor(path: string, width: number, height: number) {
    this.path = path; // path of image
    this.width = width; // width of image
    this.height = height; // height of image
  }

  public async resize(path: string, width: number, height: number) {
    const readStream = fs.createReadStream(path);
    try {
      // sharp returns response asynchronously
      let transform = await sharp().resize(width, height);
      return readStream.pipe(transform);
    } catch (err) {
      console.log(err);
    }
  }
}

export = Resize;
