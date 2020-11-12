docker container kill $(docker ps -aq --filter ancestor=ysidorko/react)
docker system prune --force

docker build -f Dockerfile.dev -t ysidorko/react .

docker run -p 80:3000 -v /usr/ui/node_modules -v "/$(pwd)":/usr/ui -e CHOKIDAR_USEPOLLING=true ysidorko/react

