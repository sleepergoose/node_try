# Node Try

This repository is supposed to be for hands-on learning of `NodeJS` and `React` and `MongoDB`

The `pnpm` package manager is used in the project.
<br/><br/>

## MongoDB 

I am considering either the Mongoose or the MongoDB Node Driver. Most likely I will choose the MongoDB Node Driver due to its performance and complexity. But the Mongoose is also worth trying of course :)

To install the MongoDB Node Driver execute the following command:

```shell
pnpm install mongodb --save
```


### MongoDB Validation

See [Modify Schema Validation](https://www.mongodb.com/docs/manual/core/schema-validation/update-schema-validation/)

```js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "hash", "role", "email"],
      properties: {
        name: {
          bsonType: "string",
          description:
            "Must be a string from 3 to 64 characters long and is required",
        },
        hash: {
          bsonType: "string",
          description: "must be a string, and is required",
        },
        email: {
          bsonType: "string",
          description: "must have the email format, and is required",
        },
        role: {
          enum: ['user', 'admin'],
          description: "Must be either user or admin, and is required",
        },
      },
    },
  },
});

```

### MongoDB With Docker

In the CMD or Terminal:
1. Execute a command: `docker pull mongo`.
2. Create the following dedicated directories using the `mkdir` command: `[root_path]\mongodb` and `[root_path]\mongodb\db`.
3. Create a `docker-compose.yaml` file in your project directory with the following content:

```yaml
services:
  mongo:
    container_name: MongoDbServer
    restart: unless-stopped
    image: mongo:latest
    env_file: .env
    environment:
      - AUTH=yes
      - MONGO_INITDB_ROOT_USERNAME=<username>
      - MONGO_INITDB_ROOT_PASSWORD=<password>
    volumes:
      - ${MONGODB_HOST_DATA}/db:/data/db
    ports:
      - "27017:27017"
```

4. Create a `.env` file in the same directory with the `docker-compose.yaml` file using the following command: `echo MONGODB_HOST_DATA=[root_path]/mongodb > .env`.
5. Execute `docker compose up --detach --force-recreate` or simply `docker-compose up -d` to start the MongoDB server with the provided parameters.
<br/><br/>

## NodeJS Docker 

Run a command: 
```shell
docker build -t node-try-df -f ./docker/Dockerfile.NodeBackend .
docker run -p 3000:3000 node-try-df
docker network create my-docker-network
docker run --network my-docker-network --name MongoDbServer -d mongo
docker run --network my-docker-network -p 3000:3000 --name NodeServer -d node-try-df
```

## JWT

To generate a secret key:

```shell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" 
```

## Environment Variables

1. Create an `.env` file in the root project directory
2. Add it to the `.gitignore` file
3. Fill in the file with the following variables:

```js
JWT_ACCESS_SECRET_KEY=""
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_SECRET_KEY=""
JWT_REFRESH_EXPIRES_IN="8h"
JWT_ALGORITHM="HS256"
JWT_ISSUER=""
JWT_AUDIENCE=""
MONGODB_HOST_DATA="<Path to the volume on the host>"
MONGODB_CONNECTION_STRING=""
NODE_ENV="development"
ORIGIN_URL=""
RATE_LIMIT=""
```


### Packages

The list of necessary packages:

```shell
pnpm install express
pnpm install cors
pnpm install jsonwebtoken
pnpm install bcrypt
pnpm install cookie-parser
pnpm install mongodb
```

### Security

**[Helmet](https://www.npmjs.com/package/helmet)**

Helmet helps secure Express apps by setting HTTP response headers.

```shell
pnpm i helmet
```

**[express-rate-limit](https://www.npmjs.com/package/express-rate-limit)**

Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset. 

```shell
pnpm i express-rate-limit
```


**[express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize)**

Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.

```shell
pnpm i express-mongo-sanitize
```

**[express-validator](https://www.npmjs.com/package/express-validator)**

An express.js middleware for validator.

```shell
pnpm i express-validator
```
