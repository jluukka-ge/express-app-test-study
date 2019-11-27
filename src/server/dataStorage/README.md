# Data Storage Abstractions

Data persistence is often an external dependency for the application and, as such, poses a problem for testing. In this project, this problem is addressed by producing abstractions for the data storage service, which enables us to select a real DB implementation for deployed applications, or a mock, in-memory implementation for testing. This is the only place where data persistence concerns should be addressed. For example, DB related dependencies are `required` only in the `knexStorage`, which is the only implementation using an SQL DB.

Testing an implementation that uses a real DB is an integration testing issue and will require services to be running. Testing a mock storage is an issue of it's own – it should be tested in order to be confident that the system tested based on the mock implementation is truly acceptable. These are not trivial tasks, but they should be relatively easy using abstractions such as the `knexStorage` and `mockStorage`, as there is no irrelevant application logic to take into account.

# Notes

- The model definitions used by the `knexStorage` are intentionally kept as simple as possible and configured using the domain models in `src/server/models`. This relationship enables a single source of truth being established for model definitions, which increases maintainability.
