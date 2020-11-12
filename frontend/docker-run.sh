docker container kill $(docker ps -aq --filter ancestor=ysidorko/react)
docker system prune --force
#docker run -p 3000:3000 -v /app/node_modules -v "/$(pwd)":/app -e CHOKIDAR_USEPOLLING=true ysidorko/react

