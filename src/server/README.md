#  The Express App

In this app, there are three concerns which are addressed at the root of the Express back-end application: selecting implementations for external dependencies, binding domain functionality to REST API and setting up the rest of the Express app.

External dependencies are selected in `index.js`. It turns out that when abstracted dependencies are selected at this stage, it is much easier to mock these dependencies and isolate parts of the system for testing. For this app the only external dependency is the persistent storage – the SQLite3 database – for which we select an interface in `index.js`.

Domain functionality is bound to the REST API in `api.js`. For most Express applications, REST API is the primary interface through which clients can interact with the application. This often results in numerous endpoints being defined for a single app, which, in turn, may result in messy API definitions being written for the app. By having only few files for binding the domain logic to the API (and only `require`ing – not defining – the domain logic in these files), the API becomes much neater and easier to maintain.

Setting up the rest of the application is the final concern of the root level of this application. This has mostly to do with Express framework related setup.

## Notes on testing

- Testing external dependencies is an integration testing concern and will require services to be set up for testing. However, writing a mock implementation of an external dependency should be easy enough, thanks to the control we have over the abstraction of the dependencies. This allows us to test the functionalities of this app only without the actual external dependencies.
- Using a testing tool, such as [`supertest`](https://github.com/visionmedia/supertest), enables us to test the router returned by `api.js`. Notice how domain logic and middleware functions are passed as a parameter to the `registerApi` function in `api.js`. This enables us to write simple tests to verify assumptions about route path setup, how data is delivered in the request object and which middleware is bound to which route – all without actually running the real domain logic which we are not interested in when testing the route setup only.
- Can the `app.js` be tested as well? Testing an express `app` object may prove difficult, as it is bound to networking functionality, and does not expose an easy to test interface which could be used without running the service. However, using [`supertest`](https://github.com/visionmedia/supertest) and a reference client implementation should make testing the Express app possible. See `src/client/README.md` for more about a reference client implementation.
