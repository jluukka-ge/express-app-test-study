# Client module

Should a back-end only app define a client for it's API? There are benefits for doing so, despite the fact that a client implementation is not in the scope of the application:

1. __The client module can save effort from others.__ In case your reference implementation is written in the target programming language of a client implementer, this client module can be used as is with a high level of confidence.
1. __The client module acts as documentation.__ For someone implementing a client for the API in a different programming language, it may be beneficial to see a reference implementation. When done well, the reference implementation can clearly express how the API can be called for various purposes.
1. __The client module can be used in testing the API.__ By using testing tools such as [`supertest`](https://github.com/visionmedia/supertest), it is possible to test parts of the application – middleware, routes, data extraction from the request etc. – without starting up a server. In this client module, `supertest` is used to produce a facade object for mock network calls in other test files. See `src/server/app.test.js` for examples.

This client implementation is split into two files:

- __client.js:__ This file describes what operations can be invoked by this client. As a reference implementation, it should be as complete as possible with respect to the back-end API possibilities.
- __index.js:__ This file describes how the requests are mapped from a description of an operation described in `client.js` to an HTTP REST API call using [`axios`](https://github.com/axios/axios) as a helper utility.

In case it is necessary to use some other utility for network calls, a client implementer can map operation descriptions from `client.js` to the utility they use for network calls.
