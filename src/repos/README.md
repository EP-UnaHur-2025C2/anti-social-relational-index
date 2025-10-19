Repository layer scaffold

Purpose
-------
This folder contains repository implementations for the application's data operations.
The app should import the repos through `require('../repos')`. The current implementation provides Sequelize-backed repos under `src/repos/sequelize`.

How to use
----------
In controllers, import the repos:

```javascript
const repos = require('../repos');
const postRepo = repos.post;
```

Contract (examples)
- post.create(data)
- post.findById(id, opts)
- post.addImages(postId, images, opts)
- post.addTags(postId, tags, opts)
- post.withTransaction(cb)

Switching engine
----------------
Set `DB_ENGINE=mongo` and implement `src/repos/mongo/*` with the same APIs. The `src/repos/index.js` factory will load the appropriate implementation.

Notes
-----
- Repos should normalize IDs as strings and return plain POJOs (not ORM instances) where possible.
- Transactions are exposed via `withTransaction` for parity.
