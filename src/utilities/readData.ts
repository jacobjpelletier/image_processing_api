import fs from "fs";

module ReadData {
    function read(imageName: fs.PathLike) {
        if (fs.existsSync(imageName)) {
            // file exists, read and serve file from cache
            fs.readFile(`${imageName}`, function (err, data) {
                if (err) {
                    throw err;
                }
                return data;
            });
        }
    }
    export class Read { }
}

