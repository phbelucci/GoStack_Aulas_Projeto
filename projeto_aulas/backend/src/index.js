const express = require('express')
const cors = require('cors')

//biblioteca para gerar uniq id
//isUuid verifica se é um id valido
const {uuid, isUuid} = require('uuidv4')

const app = express()

//necessario indicar o uso de json para que req.body possa entender
//o resultado da requisição
app.use(cors())
app.use(express.json())

/*
 * Métodos HTTP:
 * GET: buscar informação no back-end
 * POST: Criar informação no back-end
 * PUT: Alterar todos os dados de um recurso
 * PATCH: Alterar dados especificos de um recurso
 * DELETE: Deletar uma informação no back-end
 */

 /*
 * Tipos de paramêtros:
 * Query Params: Filtros e paginação (?nomeParametro = valor) & serve para anexar parametros
 * Route Params: Identifica recursos (atualizar, deletar) 
 * Request Body: Conteudo na hora de criar ou editar um recurso (json)
 */

 /*
    Middleware:
    interceptador requisiçõesq que pode:
    Interromper uma requisição ou alterar dados da requisição 
 */

 //array de projetos para testar as rotas
 const projects = []

 //formato do middleware
 function logRequests(req, res, next){
    const {method, url} = req
    const logLabel = `[${method.toUpperCase()}] ${url}`

    //.time() e .timeEnd() mostra o tempo que uma req demorou de um ponto ao outro
    console.time(logLabel)

    //se o next não for chamado o app ficará parado dentro do logRequests
    //usado quando o interceptador nao for interromper o fluxo da app
    next() //proximo middleware

    console.timeEnd(logLabel)
 }

 function validadeProjectId(req, res, next){
     const {id} = req.params

     if(!isUuid(id)){
         return res.status(400).json({error: "Invalid project ID."})
     }
     return next()
 }
 
//usa o logRequests em todas as rotas
app.use(logRequests)
//usar o validadeProjectId somente nas rotas mencionadas no primeiro parametro
app.use('/projects/:id', validadeProjectId)

app.get('/projects', (req, res) => {

    const {title, owner} = req.query;

    const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects

    return res.json(results)
})

app.post('/projects', (req, res) => {

    const {title, owner} = req.body

    const project = { id: uuid(), title, owner}
    projects.push(project)

    return res.json(project)
})


//update
app.put('/projects/:id',  (req, res) => {

    const {id} = req.params
    const {title, owner} = req.body

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0){
        return res.status(400).json({error: 'Project not found.'})
    } 

    const projectUpdated = {
        id,
        title,
        owner
    }

    projects[projectIndex] = projectUpdated

    return res.json(projectUpdated)
})

app.delete('/projects/:id', (req, res) => {

    const {id} = req.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0){
        return res.status(400).json({error: 'Project not found.'})
    } 

    projects.splice(projectIndex,1)

    return res.status(200).json({message: "Project excluded."})
})

//app.listen aceita mais uma parametro alem da porta
//nesse caso uma função que pode mostrar ao usuário que o server
//foi iniciado
app.listen(3333, ()=>{
    console.log("Back-end Started! ✔")
})