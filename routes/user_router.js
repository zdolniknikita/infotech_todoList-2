const Router = require('express').Router
const storage = require('node-persist')
const uniqid = require('uniqid');

const router = Router()

router.post('/user/login', async (req, res) => {

    const { username, password } = req.body.user

    let users = await storage.getItem('users')

    let findUser = users.find( user => user.username === username )

    if ( !findUser ) return res.status(401).json({ msg: 'User not found. Please register first' })

    if ( findUser.password === password ) {
        await storage.setItem('currentUser', findUser)
        return res.status(200).json({ msg: `Welcome ${findUser.username}!` })
    } else {
        return res.status(401).json({ msg: 'Wrong username or password' })
    }

})

router.post('/user/register', async (req, res) => {
   
    const { username, password } = req.body.user

    let currentUser = await storage.getItem('currentUser')

    if ( currentUser ) return res.status(401).json({ msg: 'Please logout first' })
    // await storage.init()
    let users = await storage.getItem('users')

    let findUser = users.find(user => user.username === username)

    if ( !findUser ) {
            let newUser = {
                username: username,
                password: password,
                id: uniqid()
            }
            console.log('users = ', users)
            users.push(newUser)

        await storage.setItem('users', users)
        await storage.setItem('currentUser', newUser)
        console.log(await storage.getItem('users'))
        
        return res.status(200).json({ msg: 'User has been created!' })
    } else {
        res.status(401).json({ msg: 'This login already exists' })
    }
})


module.exports = router
