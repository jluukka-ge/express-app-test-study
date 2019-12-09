# Routes and Middleware

Defining route and middleware handler functions separate from the Express router enables thorough unit testing of the functions. The remaining challenge is to define appropriate mock objects for the `request`, `response`, `error` and `next` parameters provided by the Express framework. for this reason, it is recommended to keep the route handlers as simple as possible, having the handler only extract data from the request, call a domain logic function that does the heavy lifting and can be unit tested well, and finally form a response by calling the functions of the `response` object.

## Notes on testing

Two methods of testing for middleware and routes are demonstrated in `src/server/routes/middleware/authentication.test.js` and `src/server/routes/deleteTodoById.test.js`.

In the former, a simple Express app is set up, HTTP calls are overridden using `supertest` and unit tests exercise the middleware handler function as it would be by an end-to-end testing framework, such as RobotFramework, which requires the app to be set up and accessible via network. Libraries such as `supertest` give us the convenience of testing routes without much set up for the testing environment. However, we might be testing the wrong thing, should `supertest` ever deviate from the way node's own `http` package handles network calls or how Express routers work.

The latter test file demonstrates methods for dissecting a route to smaller, easily configurable pieces, tests individual pieces to gain confidence the pieces work as expected in isolation and finally tests more complex behaviors, assuming the already tested pieces work correctly. This method boosts code maintainability by allowing developers write unit tests for very specific pieces of code without needing to figure out complex combinations of values that will produce the behavior they want to reproduce.
