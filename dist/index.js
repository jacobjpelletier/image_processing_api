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
/* SHARP */
// endpoint: request '/' gets image
app.get('/', (req, res) => {
    // Extract the query-parameter
    const widthString = req.query.width;
    const heightString = req.query.height;
    // Parse to integer if possible
    // set default image values - assure never undefined.
    let width = 300;
    let height = 300;
    // get new width from query
    if (widthString) {
        width = parseInt(widthString.toString());
    }
    // get new height from query
    if (heightString) {
        height = parseInt(heightString.toString());
    }
    const newImg = new resize_1.default('src/images/mario.jpg', width, height);
    // Get the resized image
    newImg.resize('src/images/mario.jpg', width, height).pipe(res);
});
app.listen(port, () => {
    console.log('Server started!');
});
exports.default = app;
//# sourceMappingURL=index.js.map