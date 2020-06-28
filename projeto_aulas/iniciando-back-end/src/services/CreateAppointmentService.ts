import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import {getCustomRepository} from 'typeorm'
import { startOfHour } from 'date-fns/fp'



interface Request {
  date : Date
  provider: string
}

class CreateAppointmentService {

  public async execute({provider, date} : Request) : Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

    if(findAppointmentInSameDate){
      throw Error("This appointment is already booked.")
    }

    const appointment = appointmentsRepository.create({
      provider, date: appointmentDate
    })

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
