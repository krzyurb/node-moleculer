# Node microservices project

Monorepo Node.js microservices architecture.

## 📦 Project Structure

```sh
.
├── api               # graphql gateway
├── infrastructure/   # docker and docker-compose config
├── packages/
│   ├── shared        # types shared between services
│   └── core          # core package
└── services/
    └── plants         # plants microservice
```

## 🧰 Stack

* [Moleculer](https://moleculer.services/) - microservices framework
* [RabbitMQ](https://www.rabbitmq.com/) - message broker
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - GraphQL server

## ⚙️ Local development

### Set up local environment

```sh
  yarn initialize  # init project
  yarn up          # start whole infrastructure
  yarn logs        # show logs
  yarn down        # shut down docker compose
```

### RabbitMQ UI

[Management UI Access](http://localhost:15672/)


### Graphql

[GQL Playground](http://localhost:8080/)


### Commands

Adding dependency to package:

```sh
  yarn workspace @project/PACKAGE_NAME add DEPENDENCY_NAME
```


## 💡 Concepts

### Communication between ApiGateway and Services

ApiGateway sends a message to service. There are two types of messages (`QUERY` and `COMMAND`). Both of them have the same format, but both of them can be implemented differently by each service.

```json
{
  "id": "ab8e9d80-8efa-11ea-9d92-575a9da7b82b",
  "type": "query",
  "timestamp": 1588702825455,
  "data": {
    "id": "5eadd062dd477d002a8d5302"
  }
}
```

When service receives the message it's validated and then processed by proper action handler.
After that, service responds with a success message, e.g:

```json
{
  "success": true,
  "timestamp": 1588703954976,
  "actionName": "items.get",
  "messageId": "ab8e9d80-8efa-11ea-9d92-575a9da7b82b",
  "data": {
    "id": "5eadd062dd477d002a8d5302",
    "name": "Boris",
  }
}
```

or with an error message:

```json
{
  "success": false,
  "timestamp": 1588703998266,
  "actionName": "items.get",
  "messageId": "ab8e9d80-8efa-11ea-9d92-575a9da7b82b",
  "error": {
    "message": "Item Not found",
    "type": "other",
    "code": "item-not-found",
    "data": { "id": "5eadd062dd477d002a8d5301" }
  }
}
```
