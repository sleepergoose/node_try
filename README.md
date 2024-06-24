# Node Try

This repository is supposed to be for hands-on learning of `NodeJS` and `React` and `MongoDB`

## MongoDB 

I am considering either the Mongoose or the MongoDB Node Driver. Most likely I will choose the MongoDB Node Driver due to its performance and complexity. But the Mongoose is also worth trying of course :)

### MongoDB With Docker

In the CMD or Terminal:
1. Execute a command: `docker pull mongo`.
2. Create the following dedicated directories using the `mkdir` command: `[root_path]\mongodb` and `[root_path]\mongodb\db`.
3. Create a `docker-compose.yaml` file in your project directory with the following content:

```yaml
version: '3'
services:
  mongo:
    container_name: MongoDbServer
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