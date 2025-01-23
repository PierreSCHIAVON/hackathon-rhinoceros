DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FLAGS = -f docker-compose.yml


build:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FLAGS) build

start:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FLAGS) up -d

stop:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FLAGS) down

restart:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FLAGS) down && $(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FLAGS) up -d

logs:
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FLAGS) logs -f

logs-app:
	@read -p "Enter service name (frontend, backend, db): " service; \
	$(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FLAGS) logs -f hackathon-rhinoceros-$$service-1

shell:
	@read -p "Enter service name (frontend, backend, db): " service; \
	docker exec -it hackathon-rhinoceros-$$service-1 sh

backend-console:
	docker exec -it $(shell docker ps -q -f name=back) sh

frontend-console:
	docker exec -it $(shell docker ps -q -f name=front) sh

db-console:
	docker exec -it $(shell docker ps -q -f name=db) psql -U postgres -d mydatabase
