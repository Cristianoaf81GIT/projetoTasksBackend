const app = require('express')()
const db = require('./config/db')
const consign = require('consign')
//const serverIp = process.env.IP_WIRELESS

// consign
consign()
.include('./config/passport.js')
.then('./config/middlewares.js')
.then('./api')
.then('./config/routes.js')
.into(app)

// adiciona o knex a app
app.db = db

app.listen(3000, ()=>{
  console.log('Backend rodando... ')
  console.log('[ctrl + c] para parar')
})
