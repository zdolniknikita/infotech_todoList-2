const addTodoQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'Add new todo'
    },

]

const deleteTodoQuestions = [
    {
        type: 'input',
        name: 'id',
        message: `Delete todo... Enter todo's id`
    }
]

const updateTodoQuestions = [
    {
        type: 'input',
        name: 'id',
        message: `Enter todo's id`
    },
    {
        type: 'input',
        name: 'title',
        message: `Enter new todo's title`
    },
    {
        type: 'checkbox',
        name: 'isdone',
        choices: ['true', 'false'],
        message: `Todo is done? (true / false)`
    }
]



const authQuestions = [
    {
        type: 'input',
        name: 'username',
        message: 'Enter the username'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter the password'
    }

]

module.exports = {
    addTodoQuestions,
    deleteTodoQuestions,
    updateTodoQuestions,
    authQuestions
}