const axios = require('../helpers/axios')

const addTodo = ({ title }) => {

    axios
        .post('/add', { title })
        .then( res => console.log( '>>>', res.data.msg ) )
        .catch( err => console.log( '>>>', err.response.data.msg ) )
}

const deleteTodo = id => {

    axios
        .post('/delete', { id } )
        .then( res => console.log( '>>>', res.data.msg ) )
        .catch( err => console.log( '>>>', err.response.data.msg ) )
}

const getAllTodos = () => {

    axios
        .get('/')
        .then( res => console.log( '>>>', res.data.msg ) )    
        .catch( err => console.log( '>>>', err.response.data.msg ) )
}

const updateTodo = todo => {

    axios
        .post('/update', { todo })
        .then( res => console.log( '>>>', res.data.msg ) )    
        .catch( err => console.log( '>>>', err.response.data.msg ) )
}

module.exports = {
    addTodo,
    deleteTodo,
    getAllTodos,
    updateTodo
}