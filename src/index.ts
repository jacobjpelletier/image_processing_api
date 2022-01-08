/* IMPORTS */
import express from "express";
import Resize from "./utilities/resize";
import fs from "fs";
import sharp, { Sharp } from "sharp";
import ErrnoException = NodeJS.ErrnoException;

/* DEFINE KEY VARIABLES */
// express server
const app = express();
const port = 3000;
// responses -> make logic more reader by placing content here
const welcome = `<h1>Welcome to Image Resizer API.</h1><br>To use API, use endpoint 
http://localhost:3000/resize/?filename=___&width=___&height=___  where default options for "filename" are "mario", 
"luigi", "peach", "wario", and "toad". "width" and "height" arguments must be numbers.<br>
To include your own jpg files to edit, place them in src/images in the form "image.jpg". Once the query is created,
the new image will be found in src/resizedImages`;
const invalidDimensions = `<h1>Please enter numbers for dimensions.</h1> <br> Note that API will take any number argument 
passed such that <b>"abc" is invalid</b> but <b>"10abc0" is valid</b> and the value "10" will be accepted. Numbers >= 0 only.
<br> <b>Use the following format:</b> 
http://localhost:3000/resize/?filename=___&width=___&height=___`;
const missingArguments =
  "The chosen file is valid, but please provide width and height.";

/* SHARP */
// endpoint: request '/' gets api instructions
app.get("/", (req: express.Request, res: express.Response) => {
  res.send(welcome);
});
// '/resize is API functionality
app.get("/resize", (req: express.Request, res: express.Response) => {
  // Extract the query-parameter
  const widthString = req.query.width;
  const heightString = req.query.height;
  const filename = req.query.filename;
  // convert QueryString to String to Int for use in program functions
  const width: number = parseInt(String(widthString)); // will be NaN doesn't start with number
  const height: number = parseInt(String(heightString)); // will be NaN doesn't start with number
  // image built from query
  const imageName = `src/resizedImages/${filename}-${width}-${height}.jpg`;
  // array of available images to edit
  const imgFilesAvailable: Array<string> = [];
  fs.readdirSync("src/images").forEach((img) => {
    // dont include hidden files
    if (img[0] !== ".") {
      imgFilesAvailable.push(img);
    }
  });
  // custom error message
  const missingFile = `No such file "${filename}". Leave out the file extension in the query, all are assumed to be .jpg.
<br>Please enter one of the following filenames:<br> ${imgFilesAvailable.join(
    "<br> "
  )}`;

  /** try to read file from passed argument **/
  /* must filter filename before file read else the app will crash from trying to read a file that doesn't exist in fs */
  if (imgFilesAvailable.includes(`${filename}.jpg`) === true) {
    /** if valid filename argument was passed, perform resizing filtering and API logic **/
    fs.readFile(`src/images/${filename}.jpg`, async function () {
      try {
        /** FILTERING **/
        /* 1. check if dimensions were passed */
        if (widthString === undefined || heightString === undefined) {
          // inform the user that width and height arguments are missing
          return res.send(missingArguments);
        }
        /* 2. check if dimensions given are numbers */
        if (width.toString() === "NaN" || height.toString() === "NaN") {
          return res.send(invalidDimensions);
        }
        /* 3. check if dimensions given are valid numbers */
        if (width <= 0 || height <= 0) {
          return res.send(invalidDimensions);
        }

        /** API LOGIC **/
        /* if the requested file already exists in the cache, serve the file */
        if (fs.existsSync(imageName)) {
          // asynchronously read file from cache
          await (async () => {
            // file exists, read and serve file from cache
            fs.readFile(
              `${imageName}`,
              function (err: ErrnoException | null, data: Buffer) {
                if (err) {
                  throw err;
                }
                res.header(200);
                return res.end(data);
              }
            );
          })();
        } else {
          /* if the requested file does not exist, create new file and serve asynchronously, pipe requested image to user synchronously*/
          // Create new Resize object with which to pipe back to user upon request
          const newImg = new Resize(
            `src/images/${filename}.jpg`,
            width,
            height
          );
          newImg
            .resize(`src/images/${filename}.jpg`, width, height)
            .then(async (r: Sharp | undefined) => {
              // as long as sharp object is defined
              if (r !== undefined) {
                // 1. save new file asynchronously
                await (async () => {
                  sharp(`src/images/${filename}.jpg`)
                    //
                    .resize(width, height)
                    .toFile(
                      `./src/resizedImages/${filename}-${width}-${height}.jpg`,
                      function (err) {
                        if (err) {
                          // server error, issue 500
                          return res.sendStatus(500);
                        }
                      }
                    );
                })();
                // 2. and pipe the requested image synchronously
                r.pipe(res);
              }
            });
        }
      } catch (err) {
        /** error processing query request **/
        return res.send(err);
      }
    });
  } else {
    /** unable to read file `src/images/${filename}.jpg` **/
    return res.send(missingFile);
  }
});

app.listen(port, () => {
  console.log("Server started!");
});

export default app;
