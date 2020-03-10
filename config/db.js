// requisicao ao arquivo de config da conexao
const config  = require('../knexfile.js')
// instancia obj knex com config de parametro
const Knex = require('knex')(config)

// processo de migracao nao recomendado para producao
Knex.migrate.latest([config])

// export do modulo
module.exports = Knex


