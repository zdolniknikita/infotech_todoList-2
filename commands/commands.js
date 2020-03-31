#!/usr/bin/env node

const program = require('commander')
const { prompt } = require('inquirer')

const { addTodoQuestions, authQuestions, deleteTodoQuestions, updateTodoQuestions } = require('../constans')
const { addTodo, deleteTodo, getAllTodos, updateTodo } = require('../actions/todo_actions')
const { register, login, logout } = require('../actions/user_actions')

program
    .version('1.0.0')
    .description('Application suite to manage ToDoList')

program
    .command('register')
    .description('Register user')
    .action(() => prompt(authQuestions).then(register))

program
    .command('login')
    .description('Login user')
    .action(() => prompt(authQuestions).then(login))

program
    .command('logout')
    .description('Logout user')
    .action(logout)

program
    .command('add')
    .description('Add new todo')
    .action(() => {
        prompt(addTodoQuestions)
            .then(addTodo)
    })

program
    .command('delete')
    .description('Delete todo by id')
    .action(() => {
        prompt(deleteTodoQuestions)
            .then(deleteTodo)
    })

program
    .command('update')
    .description('Update todo by id')
    .action(() => {
        prompt(updateTodoQuestions)
            .then(updateTodo)
    })

program
    .command('list')
    .description('Get all your todos')
    .action(getAllTodos)


program.parse(process.argv)