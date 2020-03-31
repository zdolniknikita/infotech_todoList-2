const Router = require('express').Router
const storage = require('node-persist')
const uniqid = require('uniqid');

const auth = require('../midlleware/auth')

const router = Router()

router.post('/add', auth, async (req, res) => {

    let title = req.body.title
    let id = uniqid()

    if ( !title ) return res.json({ msg: "Title can't be empty" })

    let currentUser = await storage.getItem('currentUser')
    
    let todo = {
        title,
        id,
        isdone: false,
        user: currentUser.id
    }

    let todos = await storage.getItem('todos')
        todos.push(todo)

    await storage.setItem('todos', todos)

    return await res.send({ msg: 'Todo has been added' })

})

router.post('/delete', auth, async (req, res) => {

    const { id } = req.body.id
    let todos = await storage.getItem('todos')
    let currentUser = await storage.getItem('currentUser')
    let findTodo = null

        userTodos = todos.filter( todo => todo.user === currentUser.id )

    if ( currentUser.isAdmin ) findTodo = todos.find( todo => todo.id === id )
    else findTodo = userTodos.find( todo => todo.id === id )

    if ( !findTodo ) return res.status(200).json({ msg: `Todo with id = ${id} not found` })

    await storage.setItem('todos', todos.filter( todo => todo.id !== id ))

    return res.status(200).json({ msg: `Todo with id = ${id} has been deleted` })
})

router.get('/', auth, async (req, res) => {

    let currentUser = await storage.getItem('currentUser')
    let todos = await storage.getItem('todos')

    if ( !currentUser.isAdmin ) todos = todos.filter( todo => todo.user === currentUser.id )
    return res.status(200).json({ msg: todos })
})

router.post('/update', auth, async (req, res) => {

    const { id, title, isdone } = req.body.todo

    let currentUser = await storage.getItem('currentUser')
    let todos = await storage.getItem('todos')

    let todoIndex = todos.findIndex( todo => {

        if ( currentUser.isAdmin ) return todo.id === id
        else return todo.user === currentUser.id && todo.id === id
          
    })

    if ( todoIndex !== -1 ) {

        if ( title ) todos[todoIndex].title = title

        todos[todoIndex].isdone = isdone[0] === 'true' ? true : false
        await storage.setItem('todos', todos)

        return res.status(200).json({ msg: 'Todo has been updated' })
    } else {
        
        return res.status(200).json({ msg: `Todo with id = ${id} not found` })
    }
})

module.exports = router