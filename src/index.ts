/* IMPORTS */
import express from 'express';
import {resize} from './utilities/resize';

/* DEFINE KEY VARIABLES */
// express server
const app = express();
const port = 3000;
// sharp

/* SHARP */
// endpoint
app.get('/', (req, res) => {
    res.send('poo')
    // Extract the query-parameter
    // @ts-ignore : ignored because req.query.width cannot be undefined when used due to if
    const widthString = req.query.width.toString()
    // @ts-ignore : ignored because req.query.width cannot be undefined when used due to if
    const heightString = req.query.height.toString()
    // @ts-ignore : ignored because req.query.format cannot be undefined when used due to if
    const formatString = req.query.format.toString()

    // Parse to integer if possible
    let width, height, format
    if (widthString) {
        width = parseInt(widthString)
    }
    if (heightString) {
        height = parseInt(heightString)
    }
    if (formatString) {
        format = formatString
    }
    // Set the content-type of the response
    res.type(`image/${format || 'png'}`)

    // Get the resized image
    // @ts-ignore : ignored because req.query.width cannot be undefined when used due to if
    resize('nodejs.jpg', format, width, height).pipe(res)
})

app.listen(port, () => {
    console.log(`server started at port ${port}`);
})

/* *TESTING */
const testFunc = (num: number): number => {
    return num * num;
};

export default testFunc;

