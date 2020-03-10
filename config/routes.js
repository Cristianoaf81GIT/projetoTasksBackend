module.exports = app => {
    // rota para registrar um usuario
    app.post('/signup', app.api.user.save)
    // rota para logar usuario
    app.post('/signin', app.api.auth.signin)

    // rota para salvar uma task ou obtê-la
    app.route('/tasks')
        .all(app.config.passport.authenticate())
        .get(app.api.task.getTasks)
        .post(app.api.task.save)
    

    //rota para remover uma rota
    app.route('/tasks/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.task.remove)

    // rota para ativar uma task
    app.route('/tasks/:id/toggle')
        .all(app.config.passport.authenticate())
        .put(app.api.task.toggleTask)
    

}