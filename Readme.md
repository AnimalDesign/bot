# ANIMAL bot

This is the home of the ANIMAL bot. It shall be a (not so) silent companion, supporting our everyday work life.

> __Note:__ You should not use it just yet.

## Core functionality (Draft)

The core of the ANIMAL bot provides the following functionality:

### Database layer

The database layer is based on the [Sequelize](http://docs.sequelizejs.com/en/latest/) ORM and therefor supports
PostgreSQL, MySQL, MariaDB, SQLite and MSSQL databases. It the current setup, SQLite is used.

### Module loader

With the module loader, we try to maintain great flexibility. Also we allow our team members to
teach our bot new tricks without blocking others. The modular concept is loosely inspired by [this article](https://strongloop.com/strongblog/modular-node-js-express/).

Modules usually reside in `server/lib/modules/<modulename>`.
They can have the following structure:

```
lib/modules
  |- <modulename>
	|- models (optional)
	|- tests (optional)
    |- config.json (optional)
	|- module.js
	|- package.json
    |- readme.md
```

> __Note:__ A module can be deactivated simply by renaming its `module.js` file.


### Known modules

- Discover

## Dependencies

- [Sequelize](http://docs.sequelizejs.com/en/latest/)
- [Node Schedule](https://github.com/node-schedule/node-schedule)
- [Commander.js](https://github.com/tj/commander.js)

## Links

- https://github.com/foreverjs/forever
- http://www.redotheweb.com/2013/02/20/sequelize-the-javascript-orm-in-practice.html


## About

„We build it“ — [ANIMAL](http://animal.at)