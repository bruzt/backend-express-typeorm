
# Posgres Test

```
sudo docker run -d \
    --name postgres-typeorm-tests \
    -e POSTGRES_USER=devDB \
    -e POSTGRES_PASSWORD=123 \
    -e POSTGRES_DB=tests \
    -p 5432:5432 \
    postgres:12.3
```

```
postgres://devDB:123@localhost:5432/tests
```

```
sudo docker exec -ti postgres-typeorm-tests psql -d tests -U devDB -W
```

## TypeORM
```
npx typeorm migration:create -n migration-name
```
