
About
=====

This project is the base for a book database.
It uses the following frameworks / tools:
the backend and frontend will use Typescript, the database is a MySql database and express as middleware for routes.
There are 3 tables used for the database - a table of books, a table of authors, a table that keeps records of book statuses.

How to create DB connection
===========================

Steps to create:

* Create a .env with following values
```
    NODE_ENV=(production or test)
    PORT=3000
    HOST=(name of your ip or localhost)
    DATABASE=(name of your db)
    TITLE_TABLE_NAME=(name of your books table)
    AUTHOR_TABLE_NAME=(name of your authors table)
    BOOK_STATUS_TABLE_NAME==(name of your book status table)
    DBUSER=(name of the database user
    DBPASSWORD=(password for db)
```

How run the project
===========================

On Linux:
```
    npm i && npm up
```

On Windows:
```
    npm install
    npm upgrade
```

Run the project in dev mode using:
```
    npm run start
```