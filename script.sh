docker-compose down

docker container kill $(docker ps -aq)
docker system prune --force



docker-compose up --build
