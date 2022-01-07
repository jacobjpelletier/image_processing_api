/* IMPORTS */
import express from "express";
import Resize from "./utilities/resize";
import fs, {readFile} from "fs";
import http from 'http';
import sharp from "sharp";

/* DEFINE KEY VARIABLES */
// express server
const app = express();
const port = 3000;

/* SHARP */
// endpoint: request '/' gets api instructions
app.get("/", (req: express.Request, res: express.Response) => {
  res.send('hello');
})
// '/resize is API functionality
app.get("/resize", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Extract the query-parameter
  const widthString = req.query.width;
  const heightString = req.query.height;
  const filename = req.query.filename;

  // if file exists, serve file
  fs.readFile(`src/images/${filename}.jpg`, async function (err: unknown, data: unknown) {
    // if no filename given to API, let user know
    if (err) {
      next(err);
    } else {
      // assess what data the user supplied
      let width = 100, height = 100, file;  // set defaults to override later (or respond with err if missing)
      // assess user query arguments
      if (widthString === undefined || heightString === undefined) {
        // inform the user that width and height arguments are missing
        res.send('The chosen file is valid, but please provide width and height.')
      } else {
        // convert QueryString to String to Int
        width = parseInt(String(widthString)) // will be NaN doesn't start with number
        height = parseInt(String(heightString)) // will be NaN doesn't start with number
        //arguments are defined, but are they valid? check by comparing to NaN
        if (width.toString() === 'NaN' || height.toString() === 'NaN') {
          res.send(`<h1>Please enter numbers for dimensions.</h1> <br> Note that API will take any number argument 
                passed such that <b>"abc" is invalid</b> but <b>"10abc0" is valid</b> and the value "10" will be 
                accepted. <br> <b>Use the following format:</b> 
                http://localhost:3000/resize/?filename=___&width=___&height=___`)
        } else {
          const imageName = `src/resizedImages/${filename}-${width}-${height}.jpg`;

          // if the file exists in the file system, serve that file
            if (fs.existsSync(imageName)) {
              // file exists, read and serve file from cache
              fs.readFile(`${imageName}`, function (err, data) {
                if (err) {
                  throw err;
                }
                res.end(data);
              });
            }
          // if the requested file does not exist, create new file and serve
          else {
            const newImg = new Resize(`src/images/${filename}.jpg`, width, height);
            // Get the resized image
            newImg.resize(`src/images/${filename}.jpg`, width, height).then((r) => {
              try {
                // as long as sharp object is defined
                if (r !== undefined) {
                 // save new file
                 sharp(`src/images/${filename}.jpg`)
                     //
                     .resize(width, height)
                     .toFile(`./src/resizedImages/${filename}-${width}-${height}.jpg`, function(err){
                       if (err) {
                         res.sendStatus(500);
                         return;
                       }
                     })
                 // serve image back to user via pipe rather than from cache
                 r.pipe(res);
                }
              }
              // issue with sharp object, let user know
              catch (err) {
                res.send(`Sorry, error occurred: ${err}`);
              }
            });
          }
        }
      }
    }
  })



});

app.listen(port, () => {
  console.log("Server started!");
});

export default app;
