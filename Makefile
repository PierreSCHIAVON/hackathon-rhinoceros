DOCKER_COMPOSE = docker compose

build:
	$(DOCKER_COMPOSE) build

start:
	$(DOCKER_COMPOSE) up -d

stop:
	$(DOCKER_COMPOSE) down

restart:
	$(DOCKER_COMPOSE) down && $(DOCKER_COMPOSE) up -d

logs:
	$(DOCKER_COMPOSE) logs -f

shell:
	@read -p "Enter service name (frontend, backend, db): " service; \
	docker exec -it hackathon-rhinoceros-$$service-1 sh

backend-console:
	docker exec -it $(shell docker ps -q -f name=back) sh

frontend-console:
	docker exec -it $(shell docker ps -q -f name=front) sh

db-console:
	docker exec -it $(shell docker ps -q -f name=db) psql -U postgres -d mydatabase
