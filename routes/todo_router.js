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
    
    console.log('todo CurrentUSer = ', currentUser)
    
    let todo = {
        title,
        id,
        user: currentUser.id
    }

    let todos = await storage.getItem('todos')
    console.log('todos = ', todos)
        todos.push(todo)

    await storage.setItem('todos', todos)
    console.log(await storage.getItem('todos'))

    return await res.send({ msg: 'Todo has been added' })

})

router.post('/delete', auth, async (req, res) => {

    const { id } = req.body.id
    let todos = await storage.getItem('todos')
    let currentUser = await storage.getItem('currentUser')

        userTodos = todos.filter( todo => todo.user === currentUser.id )
        console.log('filter todo', userTodos)

    let findTodo = userTodos.find( todo => todo.id === id )

    if ( !findTodo ) return res.status(200).json({ msg: `Todo with id = ${id} not found` })

    await storage.setItem('todos', todos.filter( todo => todo.id !== id ))

    return res.status(200).json({ msg: `Todo with id = ${id} has been deleted` })
})

router.get('/', auth, async (req, res) => {

    let currentUser = await storage.getItem('currentUser')
    let todos = await storage.getItem('todos')

        todos = todos.filter( todo => todo.user === currentUser.id )

        return res.status(200).json({ msg: todos })
})

router.post('/update', auth, async (req, res) => {

    const { id, title } = req.body.todo

    let currentUser = await storage.getItem('currentUser')
    let todos = await storage.getItem('todos')

    let todoIndex = todos.findIndex( todo => todo.user === currentUser.id && todo.id === id  )

    if ( todoIndex !== -1 ) {
        todos[todoIndex].title = title
        await storage.setItem('todos', todos)
        return res.status(200).json({ msg: 'Todo has been updated' })
    } else {
        return res.status(200).json({ msg: `Todo with id = ${id} not found` })
    }


})

module.exports = router