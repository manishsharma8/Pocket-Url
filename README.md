# Pocket Url

> A simple and easy URL Shortener

Create short urls with custom aliases and easily track your url visits.

![demo](https://raw.githubusercontent.com/manishsharma8/Pocket-Url/main/web/src/public/demo.png)

## Run on your machine locally

### UI _(react + nextjs)_:

Navigate to `/web`

- run `yarn`
- start up the development client with `yarn dev`

### Backend

#### PostgreSQL

Install PostgreSQL:

- **macOS**: Run `brew install postgresql`.
- **Windows**: Follow [this](https://www.postgresqltutorial.com/install-postgresql/) guide.
- **Linux**: Follow [this](https://www.postgresqltutorial.com/install-postgresql-linux/) guide.

Create a database named `dwarf`:

```shell
$ psql postgres
$ CREATE DATABASE dwarf
```

### Redis

Install and start up `redis`

### Environment Variables

Navigate to `/server` and set the following enviroment variables:

```shell
COOKIE_NAME =
COOKIE_SECRET =
SERVER_PORT = 4000
CLIENT_SERVER = 'http://localhost:3000'
```

Finally run the following commands

```shell
$ yarn
$ yarn dev
```

## Technologies Used

Client Side:

- Typescript
- NextJs
- Graphql
- Urql
- Formik

Server Side:

- Express
- Apollo Client
- Postgresql (Database)
- Redis (Authentication and Cookies)
- Graphql
- Typeorm
