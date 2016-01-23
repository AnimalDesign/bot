# ANIMAL bot
This is the home of the ANIMAL bot. It shall be a (not so) silent companion, supporting our everyday work life at the office.

## Core functionality
The core of the ANIMAL bot provides the following functionality:

### Database layer
The database layer is based on the [Sequelize](http://docs.sequelizejs.com/en/latest/) ORM and therefor supports PostgreSQL, MySQL, MariaDB, SQLite (currently tested and used) and MSSQL databases.

### Module loader
With the module loader, we try to maintain greatest possible flexibility. Developers can independently teach the bot new tricks without blocking others. Modules overseen by the [ANIMAL team](http://animal.at) can be found [here](https://github.com/AnimalBot). To install a module, it usually needs to be copied (or cloned) into  `server/modules/<modulename>`. Have a look at the [Example module repository](https://github.com/AnimalBot/example) to learn more on how to extend the bot.

> **Note:** A module can be deactivated simply by renaming its `module.js` file.

The modular concept of the module loader is loosely inspired by [this article](https://strongloop.com/strongblog/modular-node-js-express/).

### Logger

The logger component uses [winston](https://github.com/winstonjs/winston) to log infos into `server/logs/info.log` and 
errors into `server/logs/error.log`.

## Dependencies
- [winston](https://github.com/winstonjs/winston)
- [Sequelize](http://docs.sequelizejs.com/en/latest/)
- [Node Schedule](https://github.com/node-schedule/node-schedule)
- [Commander.js](https://github.com/tj/commander.js)

## About
„We build it" -- [ANIMAL](http://animal.at)
