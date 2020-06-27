import {Router} from 'express'
import {startOfHour, parseISO} from 'date-fns'
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
//parseISO vai converter uma string para um formato de Date, nativo do javascript
//startOfHour pega a data e coloca no começo da hora informada, zerando todos os outros atributos, minutos segundos e etc

const appointmentsRouter  = Router()

const appointmentsRepository = new AppointmentsRepository
const creatAppointment = new CreateAppointmentService(appointmentsRepository)
//SoC: Separation of Concerns
//DTO = Data Transfer Object
//Rota: Receber a requisição, chamar um outro arquivo, devolver resposta

appointmentsRouter.get('/', (req, res) => {
  const allAppointments = appointmentsRepository.getAll()
  return res.json(allAppointments)
})

appointmentsRouter.post('/', (req, res) => {
    try {
      const {provider, date} = req.body
      const parsedDate = parseISO(date)
      const appointment = creatAppointment.execute({provider, date : parsedDate})
      return res.json(appointment)

    } catch (err){
      return res.status(400).json({error : err.message})
    }
})

export default appointmentsRouter
