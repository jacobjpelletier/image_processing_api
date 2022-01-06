/* IMPORTS */
import express from "express";
import Resize from "./utilities/resize";
import fs from "fs";

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

  console.log(`${filename}-${widthString}-${heightString}.jpg`);

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
        res.send('Please provide width and height')
      } else {
        if ('poo') {
          res.send('Please enter numbers for dimensions')
        } else {
          width = parseInt(widthString.toString())
          height = parseInt(heightString.toString())
        }
      }

      const newImg = new Resize(`src/images/${filename}.jpg`, width, height);
      // Get the resized image
      newImg.resize(`src/images/${filename}.jpg`, width, height).then((r) => {
        try {
          if (r !== undefined) {
            r.pipe(res);
          }
        } catch (err) {
          res.send(`Sorry, error occurred: ${err}`);
        }
      });
    }
  })



});

app.listen(port, () => {
  console.log("Server started!");
});

export default app;
