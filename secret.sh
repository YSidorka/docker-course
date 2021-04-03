# create secret for PostgreSQL
kubectl create secret generic pgpassword --from-literal PGPASSWORD=1234567890
