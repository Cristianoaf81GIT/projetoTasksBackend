const bcrypt = require('bcrypt-nodejs')

// usado pelo consign (compartilhada entre diversas partes da app)
// recebe app como parametro
module.exports = app => {
    // gera o hash a partir do password
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })    
    }


    // func middleware 
    // para salvar dados do usuario no bd
    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash
            app.db('users').insert({name: req.body.name, email: req.body.email, password})
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
        })
    }

    return { save }
}
