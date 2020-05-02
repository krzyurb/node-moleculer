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
  yarn initialize  # start whole infrastructure
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
