module.exports = [
  {
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root1234',
    database: 'test',
    port: 3306,
    entities: ['apps/api/src/**/*entity.ts'],
    factories: ['sample/factories/**/*factory.ts'],
    seeds: ['sample/seeds/**/*seeds.ts'],
  }
]
