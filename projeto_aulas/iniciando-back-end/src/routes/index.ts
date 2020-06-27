import {Router, json} from 'express'
import appointmentsRouter from './appointments.routes'

const routes  = Router()
routes.use(json())

//usado para direcionar as rotas para o appointmentsRouter
routes.use('/appointments', appointmentsRouter)

export default routes
