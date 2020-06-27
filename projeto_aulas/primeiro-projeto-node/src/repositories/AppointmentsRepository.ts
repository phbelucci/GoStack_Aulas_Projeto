//Repositories serão responsaveis por realizar as ações no banco de dados
import Appointment from '../models/Appointment'
import appointmentsRouter from '../routes/appointments.routes'
import { isEqual } from 'date-fns'

//DTO - Data Transfer Object
interface CreateAppointmentDTO {

  provider : string;
  date : Date;

}

class AppointmentsRepository {
    private appointments: Appointment[]

    constructor() {
      this.appointments = []
    }

    public getAll(){
      return this.appointments
    }

    public findByDate(date : Date) : Appointment | null {
      const findAppointment = this.appointments.find(appointment =>
        isEqual(date, appointment.date))

      return findAppointment || null
    }

    public create({provider, date} : CreateAppointmentDTO) : Appointment {
      const appointment = new Appointment({provider, date})
      this.appointments.push(appointment)

      return appointment
    }
}

export default AppointmentsRepository
