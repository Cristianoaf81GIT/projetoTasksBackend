// Update with your config settings.

module.exports = {

  
    client: 'postgresql',
    connection: {
      database: 'tasks',
      user:     'cristianoaf81',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  

};
