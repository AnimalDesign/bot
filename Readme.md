# ANIMAL bot

This is the home of the ANIMAL bot. It shall be a (not so) silent companion, supporting our everyday work life.
You should not use it just yet.

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
	|- models
	|- tests
    |- config.json
	|- module.js
	|- package.json
    |- readme.md
```

> __Note:__ A module can be deactivated simply by renaming its `module.js` file.

## Links

- https://github.com/foreverjs/forever
- https://strongloop.com/strongblog/modular-node-js-express/
- https://simplapi.wordpress.com/2012/05/14/node-js-singleton-structure/
- http://www.redotheweb.com/2013/02/20/sequelize-the-javascript-orm-in-practice.html
- https://github.com/JeyDotC/articles/blob/master/EXPRESS%20WITH%20SEQUELIZE.md
- https://github.com/kilianc/node-apiserver/tree/master/examples/instagram


## About

„We build it“ — [ANIMAL](http://animal.at)