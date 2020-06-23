.PHONY: image-push
image-push:
	docker image build -t angadsharma1016/hermes-backend .
	docker image push angadsharma1016/hermes-backend

.PHONY: stack-deploy
stack-deploy:
	@env $(shell cat .env | xargs) docker stack deploy -c docker-stack.yml hermes

.PHONY: deploy
deploy:
	@echo removing stack...
	@docker stack rm hermes
	@echo pulling image....
	@docker pull angadsharma1016/hermes-backend
	sleep 2
	@echo deploying....
	@env $(shell cat .env | xargs) docker stack deploy -c docker-stack.yml hermes
	@echo sleep for 2 seconds...
	@sleep 2
	@docker service ls
