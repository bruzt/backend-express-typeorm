
module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "devDB",
    password: "123",
    database: "tests",
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    cli: {
        migrationsDir: './src/database/migrations'
    }
}
