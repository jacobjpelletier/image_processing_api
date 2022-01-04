/* IMPORTS */
import express from 'express';
import resize from './utilities/resize';

/* DEFINE KEY VARIABLES */
// express server
const app = express();
const port = 3000;
// sharp

/* SHARP */
// endpoint

app.get('/', (req, res) => {
    // Extract the query-parameter
    const widthString = req.query.width
    const heightString = req.query.height
    const format = req.query.format

    // Parse to integer if possible
    let width, height
    if (widthString) {
        // @ts-ignore
        width = parseInt(widthString)
    }
    if (heightString) {
        // @ts-ignore
        height = parseInt(heightString)
    }
    // Set the content-type of the response
    res.type(`image/${format || 'jpg'}`)

    // Get the resized image
    // @ts-ignore
    resize('src/images/mario.jpg', format, width, height).pipe(res)
})

app.listen(8000, () => {
    console.log('Server started!')
})

