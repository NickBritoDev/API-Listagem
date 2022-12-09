const { request, response } = require('express')
const express = require('express')

const server = express()

server.use(express.json())

const cursos = ['Node JS', 'Javascript', 'SQL', 'AWS', 'ReactJS', 'React Native','HTML', 'CSS', 'Bootstrap' ]

//middleware global
server.use((request, response, next) => {
    console.log(`URL CHAMADA: ${request.url}`)
    
    return next()
})

//obrigatorio adcionar um novo curso
//mandatory to add a new course
function checkCurse(request, response, next){
    if(!request.body.name){
        return response.status(400).json({error: "Nome do curso é obrigatorio"})
    }

    return next()
}

//curso (index) não existe
//course (index) doesn't exist
function checkIndex(request, response, next){
    if(!cursos[request.params.index]){
        return response.status(400).json({error: "Curso não existe"})
    }

    return next()
}

//retorno da listagem completa dos cursos 
//return of the complete list of courses
server.get('/curses-list', (request, response) => {
    return response.json(cursos)
})


//retorno individual de cursos de acordo com o id chamado 
//return individual courses according to called id
server.get('/curses/:index', checkIndex, (require, response) => {

    const {index} = require.params
    
    return response.json(cursos[index])
})

//adcionar um novo curso a lista
//add new course to list
server.post('/curses-list', checkCurse, (request, response) => {
    const {name} = request.body
    cursos.push(name)

    return response.json(cursos)
})

//atualizando um curso existente
//upgrading an existing course
server.put('/curses/:index', checkCurse, checkIndex, (request, response) => {
    const {index} = request.params
    const {name} = request.body
    
    cursos[index] = name

    return response.json(cursos)
})

//removendo curso da lista
//removing course from list
server.delete('/curses/:index', checkIndex,  (request, response) => {
    const {index} = request.params

    cursos.splice(index, 1)
    return response.json({message: "Curso deletado com sucesso!"})
})

server.listen(3000)