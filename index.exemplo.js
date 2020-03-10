const app = require('express')()
const bodyParser = require('body-parser') // chamada ao body-parser


function meuJson(){

  return  (req, res, next) => {
    console.log('Antes de tudo meu middleware')
    next()
  }

}

app.use(meuJson())

// funcao app.use() define o middleware a ser
// aplicado em todas as requisicoes

app.use(bodyParser.json()) //json trata como json todo corpo da requisicao

app.get('/:valor', (req,res, next)=>{
  console.log('funcao 0')
  
  next() // chama a proxima funcao  na cadeia de responsabilidades

})

app.post('/:valor', (req,res,next)=>{
  console.log('funcao 1')
  //res.status(200).send('backend ' + req.params.valor); // recebemos os parametros
  //res.status(200).send(`<h1>backend ${req.query.nome} ${req.query.sobrenome}</h1>`) // recebemos os query params
  res.send(`<h1>backend ${req.body.nome} ${req.body.sobrenome}</h1>`)
  next()
})

app.get('/:valor', (req,res)=>{
  console.log('funcao 2')
  /**
   * gera erro nao e possivel 
   * redefinir headers (cabeçalhos)
   * depois que uma requisição já
   * foi atendida
  */
  //res.status(200).send('backend2'); 
})


app.listen(3000, ()=>{
  console.log('Backend rodando...')
  console.log('[ctrl + c] para parar')
})
