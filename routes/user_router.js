const Router = require('express').Router
const storage = require('node-persist')
const uniqid = require('uniqid')
const bcrypt = require('bcryptjs')

const router = Router()

router.post('/user/login', async (req, res) => {

    const { username, password } = req.body.user

    let users = await storage.getItem('users')

    let findUser = users.find( user => user.username === username )

    if ( !findUser ) return res.status(401).json({ msg: 'User not found. Please register first' })

    bcrypt.compare(password, findUser.password)
        .then(async isMatch => {
            if ( !isMatch ) return res.status(400).json({ msg: 'Invalid username or password' })

            await storage.setItem('currentUser', findUser)
            return res.status(200).json({ msg: `Welcome ${findUser.username}!` })

        })


})

router.post('/user/register', async (req, res) => {
   
    const { username, password } = req.body.user

    await storage.init()
    let currentUser = await storage.getItem('currentUser')

    if ( currentUser ) return res.status(401).json({ msg: 'Please logout first' })
    let users = await storage.getItem('users')

    let findUser = users.find(user => user.username === username)

    if ( !findUser ) {

            let newUser = {
                username: username,
                password: password,
                isAdmin: false,
                id: uniqid()
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if (err) throw err
                    newUser.password = hash

                    users.push(newUser)

                    await storage.setItem('users', users)
                    await storage.setItem('currentUser', newUser)
                    
                    return res.status(200).json({ msg: 'User has been created!' })
                })
            })        
    } else {
        res.status(401).json({ msg: 'This login already exists' })
    }
})


module.exports = router
