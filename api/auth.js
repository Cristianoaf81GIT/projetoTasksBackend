const { authSecret } = require('../.env') // usado para gerar token
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        // verifica se no corpo da requisicao 
        // o usuario enviou corretamente seus 
        // dados
        if(!req.body.email || !req.body.password)
            return res.status(400).send('dados incompletos')
        
        // busca usuario apenas pelo email
        const user = await app.db('users')
        .whereRaw("LOWER(email) = LOWER(?)",req.body.email).first()

        // compara a senha do usuario
        if (user){
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                // se a senha for incorreta 401 nao autorizado
                if(err || !isMatch){
                    return res.status(401).send('não autorizado')
                }

                // caso o login funcione
                const payload = { id: user.id }

                //  geramos o token
                res.json({
                    name: user.name,
                    email: user.email,
		    token: jwt.encode(payload, authSecret)
                })
            })
        }else{
            // 400 bad request 
            res.status(400).send('usuário não cadastrado!')
        }




    }
    // para acessar o signin a partir de app
    return { signin }
}

