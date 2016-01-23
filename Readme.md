# ANIMAL bot

This is the home of the ANIMAL bot. It shall be a (not so) silent companion, supporting our everyday work life.

> __Note:__ You should not use it just yet.

## Core functionality (Draft)

The core of the ANIMAL bot provides the following functionality:

### Database layer

The database layer is based on the [Sequelize](http://docs.sequelizejs.com/en/latest/) ORM and therefor supports
PostgreSQL, MySQL, MariaDB, SQLite and MSSQL databases. It the current setup, SQLite is used.

### Module loader

With the module loader, we try to maintain greatest possible flexibility. Developers can independently teach the bot new tricks without blocking others. Modules by the [ANIMAL team](http://animal.at) can be found [here](https://github.com/AnimalBot). To install a module, it usually needs to be copied (or cloned) into  `server/modules/<modulename>`.

They should have the following structure:

```
server/modules
  |- <modulename>
	|- models (optional)
	|- tests (optional)
    |- config.json (optional)
	|- module.js
	|- package.json
    |- readme.md
```

> __Note:__ A module can be deactivated simply by renaming its `module.js` file.

The modular concept of the module loader is loosely inspired by [this article](https://strongloop.com/strongblog/modular-node-js-express/).

## Dependencies

- [Sequelize](http://docs.sequelizejs.com/en/latest/)
- [Node Schedule](https://github.com/node-schedule/node-schedule)
- [Commander.js](https://github.com/tj/commander.js)

## About

„We build it“ — [ANIMAL](http://animal.at)