const express = require('express')
const { port } = require('config')
const storage = require('node-persist')
const uniqid = require('uniqid')

const router_init = require('./initializers/route.init')

const app = express()

const start = async () => {

    await storage.init()
    // await storage.clear()

    if ( !await storage.getItem('users') ) await storage.setItem('users', [{ 
        username: 'admin',
        password: 'admin',
        isAdmin: true,
        id: uniqid()
     }])
    if ( !await storage.getItem('todos') ) await storage.setItem('todos', [])

    // await storage.setItem('users', [{ username: 'Nikk' }])
    // console.log(await storage.getItem('users'))
    // await storage.setItem('currentUser', null)

    app.use(express.json())

    router_init(app)

    await app.listen(port, () => console.log(`Server started on port ${port}`))
 
}

start()
