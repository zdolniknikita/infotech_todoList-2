const todo_router = require('../routes/todo_router')
const user_router = require('../routes/user_router')


const route_init = (app) => {
    
    app.use(todo_router)
    app.use(user_router)

}

module.exports = route_init