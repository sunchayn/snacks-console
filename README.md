## mazentouati/snacks-console

[![GitHub (pre-)release](https://img.shields.io/github/release-pre/mazentouati/snacks-console.svg)](https://github.com/mazentouati/snacks-console/releases/tag/0.1.0)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/mazentouati/snacks-console/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/mazentouati/snacks-console/?branch=master)
[![StyleCI](https://styleci.io/repos/157292080/shield)](https://styleci.io/repos/157928738)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](./LICENSE)

An intuitive browser-based SQL console to run and save SQL queries.

## Usage guideline

Snacks@console is a PHP based application. Before you use it, you have to make sure that your system is ready to run PHP applications. All web server such as [Laragon](https://laragon.org/) (recommended) or [XAMPP](https://www.apachefriends.org) provide bundle all the requirement to run a PHP based application in one package.

After you setup your webserver. Open the command line inside the web server's root directory, usally www, and follow along the installation process

### through composer
we recommend installing this package through  [composer](http://getcomposer.org/) :

```bash
composer create-project "console" mazentouati/snacks-console
```

*Note: make sure that your web server enables the RewriteEngine.*

## Plans

This is an initial version, it's just a prototype to test and enhance the current experience. We plan to add the following features :

### Enhance queries support

currently the console supports the following commands:
- Select
- Updated
- Delete
- Insert
- Use `database`

Theoretically, it can execute any SQL command but we plan to make the experience of DDL ( data definition language ) like `Create` or `Alter` more accessible by supporting interactive inserting in the console.

### Add syntax highlight

Additionally, we plan to add syntax highlight for the SQL commands

### Enhance the manipulation of the fetched data
currently, the data shown when using `select` command isn't interactive. We plan to make the table resizable, the cells clickable ( shows full column's data when click ) and whatever required to make it interactive.

## Documentation
Unfortunately, I'm overwhelmed by Snacks project and it's sub-projects. I'll incrementally add the documentation, tests for both the source code and the application.

very SOON...

## Contributing

Please check [the guide](./CONTRIBUTING.md)

If you like to contribute by writing the JavaScript tests, It would be great !

## LICENSE

> &copy; [MIT](./LICENSE) | 2018, mazentouati/snacks-console
