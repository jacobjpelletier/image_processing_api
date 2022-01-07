/* IMPORTS */
import express from "express";
import Resize from "./utilities/resize";
import fs, {readFile} from "fs";
import sharp, {Sharp} from "sharp";
import ErrnoException = NodeJS.ErrnoException;

/* DEFINE KEY VARIABLES */
// express server
const app = express();
const port = 3000;

const invalidDimensions = `<h1>Please enter numbers for dimensions.</h1> <br> Note that API will take any number argument 
passed such that <b>"abc" is invalid</b> but <b>"10abc0" is valid</b> and the value "10" will be
accepted. <br> <b>Use the following format:</b> 
http://localhost:3000/resize/?filename=___&width=___&height=___`

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
  // convert QueryString to String to Int for use in program functions
  const width = parseInt(String(widthString)) // will be NaN doesn't start with number
  const height = parseInt(String(heightString)) // will be NaN doesn't start with number
  // image built from query
  const imageName = `src/resizedImages/${filename}-${width}-${height}.jpg`;

  fs.readFile(`src/images/${filename}.jpg`, async function (err: unknown, data: unknown) {

    /** if file from query exists in filesystem, serve file **/
    try {

      /** FILTERING **/
      /* 1. check if dimensions were passed */
      if (widthString === undefined || heightString === undefined) {
        // inform the user that width and height arguments are missing
        res.send('The chosen file is valid, but please provide width and height.')
      }
      /* 2. check if dimensions given can be used for width and height */
      if (width.toString() === 'NaN' || height.toString() === 'NaN') {
        res.send(invalidDimensions);
      }

      /** API LOGIC **/
      /* if the file exists in the file system, serve that file */
      if (fs.existsSync(imageName)) {
        // asynchronously read file from cache
        await (async () => {
          // file exists, read and serve file from cache
          fs.readFile(`${imageName}`, function (err:ErrnoException|null, data:Buffer) {
            if (err) { throw err }
            res.end(data);
          });
        })();
      }
      /* if the requested file does not exist, create new file and serve, pipe requested image to user synchronously*/
      else {
        // Create new Resize object with which to pipe back to user upon request
        const newImg = new Resize(`src/images/${filename}.jpg`, width, height);
        newImg.resize(`src/images/${filename}.jpg`, width, height).then(async (r:Sharp|undefined) => {
          // as long as sharp object is defined
          if (r !== undefined) {
            // save new file asynchronously
            await (async () => {
              sharp(`src/images/${filename}.jpg`)
                    //
                    .resize(width, height)
                    .toFile(`./src/resizedImages/${filename}-${width}-${height}.jpg`, function (err) {
                      if (err) {
                        res.sendStatus(500);
                        return;
                      }
                    })
              })()
              // while waiting on write operation, serve user their image via pipe
              r.pipe(res);
          }
        });
      }
    }

    /** if file from query does not exist in filesystem, let user know **/
    catch (err) {
      res.send(err)
    }
  });
})

app.listen(port, () => {
  console.log("Server started!");
});

export default app;
