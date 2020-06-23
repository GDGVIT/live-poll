.PHONY: image-push
image-push:
	docker image build -t angadsharma1016/hermes-backend .
	docker image push angadsharma1016/hermes-backend

.PHONY: stack-deploy
stack-deploy:
	@env $(shell cat .env | xargs) docker stack deploy -c docker-stack.yml hermes
