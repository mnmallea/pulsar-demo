# pulsar-demo

## Create admin user for Pulsar Manager
```sh
CSRF_TOKEN=$(curl http://localhost:7750/pulsar-manager/csrf-token)
curl \
    -H "X-XSRF-TOKEN: $CSRF_TOKEN" \
    -H "Cookie: XSRF-TOKEN=$CSRF_TOKEN;" \
    -H 'Content-Type: application/json' \
    -X PUT http://localhost:7750/pulsar-manager/users/superuser \
    -d '{"name": "admin", "password": "apachepulsar", "description": "test", "email": "username@test.org"}'
```

## Create schema
```sh
docker-compose run producer node src/create_schemas.js
```

## Open pulsar SQL
```sh
nohup bin/pulsar sql-worker run &
bin/pulsar sql
```
