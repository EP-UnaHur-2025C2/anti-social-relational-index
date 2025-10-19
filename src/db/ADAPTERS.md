Migration helpers and adapter contract

Goal
----
Central place to document the DB adapter contract and environment variables required to switch engines (Sequelize <-> MongoDB).

Environment variables
---------------------
- DB_ENGINE: 'sequelize' (default) or 'mongo'
- DATABASE_URL: connection string for SQL/Sequelize (e.g., sqlite:./data/dev.sqlite or postgres://user:pass@host:5432/dbname)
- MONGO_URL: connection string for Mongo (e.g., mongodb://localhost:27017/anti-social)
- DB_LOGGING: 'true' | 'false' (optional)

Files to implement
------------------
- src/db/index.js  -> central entrypoint (already present). Exports the selected adapter.
- src/db/sequelize.js (optional) -> explicit initializer for Sequelize models and exports { sequelize, Sequelize, Post, User, ... }
- src/db/mongo.js  -> future Mongo adapter. Must export an object compatible with the app's expected API.

Adapter contract (what the app expects)
--------------------------------------
The application currently depends on the Sequelize `models/index.js` export. To keep compatibility, the Mongo adapter should export the same top-level names and a compatible API for these common operations used by controllers and middlewares:

- Models: Post, User, Tag, PostImagen, Comment
  - Methods used (common):
    - findByPk(id, opts)
    - findAll(opts)
    - findOne(opts)
    - create(data, opts)
    - update / instance.update
    - destroy / instance.destroy
    - findOrCreate({where, defaults}, opts) (optional)
    - Association helpers used by Sequelize current code (if present):
      - post.getImagenes(), post.addImagenes([...]), post.getTags(), post.addTag(tag)
  - Note: Associations are Sequelize-specific. For Mongo adapter you can implement helper methods on the repo layer or provide equivalent instance methods on returned objects.

- Connection exports:
  - sequelize (or an object representing the connection) — used for transactions in current code.
  - Sequelize (constructor) — optional.

Guidelines for implementing `src/db/mongo.js`
---------------------------------------------
- Use Mongoose and export a set of models and a connection object. Try to match method names used by the app.
- Provide a `transaction` helper that wraps Mongoose sessions and exposes a similar shape to `sequelize.transaction()` (e.g., returns an object with commit/rollback or executes a callback).
- Normalize IDs: app code should receive string ids from the adapter; adapter will handle conversion to ObjectId internally.

Migration steps (high level)
----------------------------
1. Create repo layer (src/repos) to hide differences between ORMs.
2. Implement src/db/mongo.js and adaptors for repos.
3. Create ETL scripts to move data from SQLite to Mongo.
4. Run tests against both adapters and perform a staged cutover.

Notes
-----
This file is a living document. Update it as controllers evolve and as the adapter contract changes.
