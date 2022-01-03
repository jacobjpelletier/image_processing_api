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
4. run `npm run lint` to run linting
### H. Jasmine
1. `npm i jasmine ` to install jasmine
2. `npm i jasmine-spec-reporter` to add a reporter for outputting Jasmine results to the terminal
3. `npm i --save-dev @types/jasmine` to add type definitions for Jasmine 
4. add the following script `"jasmine": "jasmine"`
5. **BEST PRACTICE:**
   1. When creating files for tests, a best practice is to name the .ts file the same as the .js file to be tested with 
   Spec appended to the end. The more tests needed to be run, the more test files will need to be created. Be sure to 
   follow this best practice to keep track of the test file that contains the tests for each .js file.

## II. File Structure
```
├── node_modules
├── dev
│      └── index.js
├── spec
│      └── support
│           └── jasmine.json
├── src
│     ├──  tests
│     │     ├── helpers
│     │     │      └── reporter.ts
│     │     └── indexSpec.ts
│     └── index.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```