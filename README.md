# Image Processing API
##  *by Jacob Pelletier* 
______________________________
This project aims to give you a real-world scenario in which you would read and write to your disk via a Node.js express 
server rather than a database. The project you create serves two purposes: to prepare you for setting up scalable code 
and architecture for real-world projects and tie together some of the most popular middleware and utilities found in 
Node.js projects. This project barely touches the surface of what is possible but will prove your ability to use what 
you’ve learned in real-world scenarios.

For this project, refactor and test as much as possible while you are building. Since you are using TypeScript and an 
unfamiliar library, it is sometimes easier to write and build in plain JS to see what your functions return; remember 
your submission needs to be in TypeScript. As your skills improve, typing in TypeScript will feel more intuitive. Make 
sure to remove any debugging code from your final submission.
_____________________________

##**Initialization**
### I. Dependencies:
### A. node
1. `npm init -y` to start new node project
### B. Typescript
1. `npm i --save-dev typescript` add typescript to dev dependencies
2. `npm i --save-dev ts-node` add ts-node to execute ts on node
3. `npm i --save-dev @types/node` type definitions
4. `npx tsc --init` add the default TypeScript configuration file.
5. `"build": "npx tsc"` add a build script to your package.json file
6. add the following to `tsconfig.json`:
```
"target": "es5",
"lib": ["ES6"],
"outDir": "./build",
"strict": true,
"noImplicitAny": true
```   
7. `"exclude": ["node_modules"]` and exclude checking of node modules by adding an "exclude" parameter
8. `npm run build` to run build script
9. `node dev/.`
### C. Express
1. `npm install express` install express
2. `npm i --save-dev @types/express`type definitions
### D. nodemon
1. `npm i --save-dev nodemon` to restart server after changes
2. add `"start": "nodemon src/index.ts"` script to run nodemon
### E. morgan (logger)
1. `npm install morgan` log server output
2.  include `app.use(morgan("common"))` to add logger to js file
### F. prettier 
1. `npm i --save-dev prettier` add prettier to dev dependencies
2. `"prettier": "prettier --config .prettierrc 'src/**/*.js' --write"` add prettier script to package.json
3. create .prettierrc file in root directory
4. run script with `npm run prettier`
### G. Eslint
1. `npm i --save-dev eslint` add to dev dependencies
2. `npm i --save-dev eslint-config-prettier` 
3. `npm i --save-dev eslint-plugin-prettier`
4. `npm i eslint-config-airbnb-base eslint-plugin-import` save airbnb style guide
5. add `"lint": "eslint 'dist/index.js'"` to scripts to run lint on index.js
6. `eslint --init`
7. run `npm run lint` to run linting
### H. Jasmine
1. `npm i jasmine ` to install jasmine
2. `npm i jasmine-spec-reporter` to add a reporter for outputting Jasmine results to the terminal
3. `npm i --save-dev @types/jasmine` to add type definitions for Jasmine 
4. **BEST PRACTICE:**
   1. When creating files for tests, a best practice is to name the .ts file the same as the .js file to be tested with 
   Spec appended to the end. The more tests needed to be run, the more test files will need to be created. Be sure to 
   follow this best practice to keep track of the test file that contains the tests for each .js file.
5. create the file structure noted below
6. include `"exclude": ["node_modules", "./dist", "spec"]` after compilerOptions in tsconfig.json because we don't want to check these for TS
7. add this to reporter.ts
```
import {DisplayProcessor, SpecReporter, StacktraceOption} from "jasmine-spec-reporter";
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `${log}`;
    }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor],
}));
```
8. and this to jasmine.json
```
{
    "spec_dir": "dist/tests",
    "spec_files": [
        "**/*[sS]pec.js"
    ],
    "helpers": [
        "helpers/**/*.js"
    ],
    "stopSpecOnExpectationFailure": false,
    "random": false
}
```
9. add the following script to build and run at the same time `"test": "npm run build && npm run jasmine"`
### I. sharp
1. https://www.npmjs.com/package/sharp
2. https://malcoded.com/posts/nodejs-image-resize-express-sharp/
3. The typical use case for this high speed Node.js module is to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP and AVIF images of varying dimensions.
4. `npm install sharp --save` 
## II. File Structure
```
├── node_modules
├── dist
│    └── index.js
│    └── tests
│    └── utilities
├── spec
│    └── support
│         └── jasmine.json
├── src
│     ├──  tests
│     │     ├── helpers
│     │     │    └── reporter.ts
│     │     └── indexSpec.ts
│     │     └── resizeSpec.ts
│     ├──  utilities
│     │     └── resize.ts
│     ├──  images
│     │     └── mario.jpg
│     └── index.ts
├── package-lock.json
├── package.json
├── .prettierrc
├── .eslintrc.js
├── README.md
├── scratch.txt
└── tsconfig.json
```

## III. Testing
### Steps
1. Install
   1. `npm i jasmine`
   2. `npm i jasmine-spec-reporter` jasmine output to console in a readable way
   3. `npm i --save-dev @types/jasmine` define type definitions
2. Add testing script
   1. `"jasmine": "jasmine"`
3. Set up file structure
   1. add spec folder at root level
   2. add subfolder to spec called support
   3. add jasmine.json file to support folder
   4. add tests folder in src folder 
   5. add indexSpec.ts file to test main index file
   6. add helpers folder
   7. add reporter.ts where Specs look for their configurations
4. Configure Jasmine
   1. use default settings for reporter.ts found at https://github.com/bcaudan/jasmine-spec-reporter/tree/master/examples/typescript
   2. add the following to jasmine.json to configure jasmine
   ```
      {
      "spec_dir": "dist/tests",
      "spec_files": [
      "**/*[sS]pec.js"
      ],
      "helpers": [
      "helpers/**/*.js"
      ],
      "stopSpecOnExpectationFailure": false,
      "random": false
      }
   ```
   3. endpoint testing
      1. install supertest
         1. `npm i supertest`
         2. `npm i --save-dev @types/supertest`
      2. add to spec file
         1. 
      3. create test
5. Create testing script
6. Create tests

## IV. Run The Project
1. compile and test typescript with `npm run test`
2. run server with `npm run start`
3. go to browser and get endpoint with `http://localhost:3000/`
4. How to write browser query commands
   1. to resize the image, two query arguments are needed: width and height. example below
   2. `http://localhost:3000/?width=100&height=100`
      1. '?' indicates query
      2. specify arguments with keywords 'width' and 'height'
      3. string two arguments together with '&'
      4. the result is a new jpg image (mario) resized to the specified dimensions