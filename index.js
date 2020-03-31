const express = require('express')
const { port } = require('config')
const storage = require('node-persist')
const uniqid = require('uniqid')
const bcrypt = require('bcryptjs')

const router_init = require('./initializers/route.init')

const app = express()

const start = async () => {

    await storage.init()

    if ( !await storage.getItem('users') ){

        let admin = {
            username: 'admin',
            password: 'admin',
            isAdmin: true,
            id: uniqid()
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(admin.password, salt, async (err, hash) => {
                if (err) throw err
                admin.password = hash

                await storage.setItem('users', [admin])
            })
        })   


    } 
    if ( !await storage.getItem('todos') ) await storage.setItem('todos', [])

    app.use(express.json())

    router_init(app)

    await app.listen(port, () => console.log(`Server started on port ${port}`))
 
}

start()
