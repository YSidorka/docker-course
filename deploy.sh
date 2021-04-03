docker build -t ysidorko/ui:latest -t ysidorko/ui:$SHA -f ./frontend/Dockerfile ./frontend
docker build -t ysidorko/api:latest -t ysidorko/api:$SHA -f ./server/Dockerfile ./server
docker build -t ysidorko/worker:latest -t ysidorko/worker:$SHA -f ./worker/Dockerfile ./worker

docker push ysidorko/ui:latest
docker push ysidorko/ui:$SHA

docker push ysidorko/api:latest
docker push ysidorko/api:$SHA

docker push ysidorko/worker:latest
docker push ysidorko/worker:$SHA


kubectl apply -f ./k8s
kubectl set image deployments/server-deployment server=ysidorko/api:$SHA
kubectl set image deployments/client-deployment client=ysidorko/ui:$SHA
kubectl set image deployments/worker-deployment worker=ysidorko/worker:$SHA

