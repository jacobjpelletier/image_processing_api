"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* IMPORTS */
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("./utilities/resize"));
/* DEFINE KEY VARIABLES */
// express server
const app = (0, express_1.default)();
const port = 3000;
// sharp
/* SHARP */
// endpoint
app.get('/', (req, res) => {
    // Extract the query-parameter
    const widthString = req.query.width;
    const heightString = req.query.height;
    const format = req.query.format;
    // Parse to integer if possible
    let width, height;
    if (widthString) {
        // @ts-ignore
        width = parseInt(widthString);
    }
    if (heightString) {
        // @ts-ignore
        height = parseInt(heightString);
    }
    // Set the content-type of the response
    res.type(`image/${format || 'jpg'}`);
    // Get the resized image
    // @ts-ignore
    (0, resize_1.default)('mario.jpg', format, width, height).pipe(res);
});
app.listen(8000, () => {
    console.log('Server started!');
});
//# sourceMappingURL=index.js.map