const moment = require('moment')

module.exports = app => { 
    // recupera uma tarefa cadastrada
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date : moment().endOf('day').toDate()
        
        app.db('tasks')
        .where({ userId: req.user.id })
        .where('estimateAt', '<=', date)
        .orderBy('estimateAt')
        .then( tasks => res.json(tasks) ).catch(err => res.status(400).json(err))

    }

    // salva uma tarefa cadastrada
    const save = (req, res) => {
        // verifica desc. da tarefa
        if(!req.body.desc.trim())
            return res.status(400).send('A descrição é obrigatória!')
        
        req.body.userId = req.user.id

        app.db('tasks')
        .insert(req.body)
        .then(_=>res.status(204).send())//.send()
        .catch(err => res.status(400).json(err))
    }

    // remove uma task do banco de dados
    const remove = (req, res) => {
        app.db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .del()
        .then(rowsDeleted => {
            if (rowsDeleted > 0){
                res.status(200).send()        
            }else{
                const msg =
                 `Não foi encontrada a tarefa com este identificador ${req.params.id}.`
                 res.status(400).send(msg)
            }

        }).catch(err => res.status(400).json(err))
    }

    const updateTaskDoneAt = (req, res, doneAt) => {
        app.db('tasks')
        .where( {id: req.params.id, userId: req.user.id} )
        .update({doneAt})
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
        .where( {id: req.params.id, userId: req.user.id} )
        .first()
        .then(task => {
            if(!task){
              const msg = `Task com id ${req.params.id} não encontrada`
              return res.status(400).send(msg)
            }
              
            const doneAt = task.doneAt ? null : new Date()
            updateTaskDoneAt(req, res, doneAt)
        }).catch(err => res.status(400).json(err))
    }

    return { getTasks, save, remove, toggleTask }
}