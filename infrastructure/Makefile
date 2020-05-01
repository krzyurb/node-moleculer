DOCKER_COMPOSE = docker-compose

init:
	yarn install
	yarn lerna bootstrap
	yarn run build

up:
	$(DOCKER_COMPOSE) up -d --remove-orphans

logs:
	$(DOCKER_COMPOSE) logs -f $(filter-out $@,$(MAKECMDGOALS))

down:
	$(DOCKER_COMPOSE) down
