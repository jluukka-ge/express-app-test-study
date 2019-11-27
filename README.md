# Todo App Backend - a Study on Testable Design of Code

This project implements a back-end for a simple web-based Todo app. The primary goal of the project is to explore various ways of improving the testability of code.

Some common problems when testing back-end applications are:
- __Invoking application's operations:__ back-end applications are often accessible via network calls, which implies that the app server should be running in order to be tested.
- __Invoking external services:__ many applications are dependent on external services, which implies that such external services must be running along with the application in order to test the app.
- __Application state:__ although application state is often implemented using external services, the application state can be considered a separate concern, as it is private to the application. Again, implemented often as an external service implies that these external services must be running in order to test the app.

The application incorporates features which are present in most web apps, such as user authentication, but allows some compromises to be made as it is not supposed to be deployed into production (not yet anyway).

## Design Principles

In order to isolate parts of the application for testing, these principles are used when writing the application:
- __Write pure functions__, as they are predictable and portable – hence easy to test.
- __Write small functions__ that do only one thing. Their edge cases are easy to identify and all branches of execution are easy to test.
- __Compose larger and complex functions from small functions.__ This way parts of the complex functions are already tested by the tests of the smaller functions. Also, functions composed of only pure functions are also pure.
- __Write abstractions over external dependencies__ and inject these abstractions to the actual app. This makes it easy to produce similar implementations for testing purposes only.
- __Assign one responsibility for each component__ and provide domain knowledge of this area only. Any other knowledge should not be a concern of the component.

## Further Notes

There are `README.md` files spread across the source files explaining testability concerns and design decisions in the folder. For examples of testing the code, take a look at `*.test.js` files.

## Commands
### Setup

```
// install npm packages and set up DB
npm run setup

// Clear DB
npm run clean
```

### Test

```
// Run linter
npm run lint

// Run tests once
npm run test

// Run tests on file changes
npm run test-watch
```

### Run
```
// Start app with current source files
npm run start

// Start app with a clean DB
npm run start-clean

// start and restart app on file changes
npm run start-watch
```

## License

MIT
