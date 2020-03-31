const storage = require('node-persist')
const axios = require('../helpers/axios')

const login = async user => {

    await storage.init()
    let currentUser = await storage.getItem('currentUser')

    if ( currentUser ) return console.log('Please logout first')

    axios.post('/user/login', { user })
        .then(res => console.log(res.data.msg))
        .catch(err => console.log(err.response.data.msg))

}

const logout = async () => {
    await storage.init()
    await storage.removeItem('currentUser')
        .then(() => console.log('User logout'))
}

const register = async user => {

    axios
        .post('/user/register', { user })
        .then(res => console.log(res.data.msg))
        .catch(err => console.log(err.response.data.msg))
}

module.exports = {
    login,
    logout,
    register
}

