/* IMPORTS */
import express from 'express';
import Resize from "./utilities/resize";

/* DEFINE KEY VARIABLES */
// express server
const app = express();
const port = 3000;

/* SHARP */
// endpoint: request '/' gets image
app.get('/', (req: express.Request, res: express.Response) => {
    // Extract the query-parameter
    const widthString = req.query.width
    const heightString = req.query.height

    // Parse to integer if possible
    // set default image values - assure never undefined.
    let width: number = 300;
    let height: number = 300;
    // get new width from query
    if (widthString) {
        width = parseInt(widthString.toString())
    }
    // get new height from query
    if (heightString) {
        height = parseInt(heightString.toString())
    }

    const newImg = new Resize('src/images/mario.jpg', width, height);
    // Get the resized image
    newImg.resize('src/images/mario.jpg', width, height).then(r => {
        if (r !== undefined) {
            r.pipe(res);
        } else {
            res.send('Sorry, error occurred.');
        }
    })

})

app.listen(port, () => {
    console.log('Server started!')
})

export default app;
