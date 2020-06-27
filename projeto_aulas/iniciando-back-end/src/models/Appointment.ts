//models são as representações do objeto no banco de dados

import { uuid } from 'uuidv4'

class Appointment {

  id: string

  provider: string

  date: Date

  //Omit - necessario informar o tipo do objeto e o parametro que não será necessario no constructor
  constructor({provider, date} : Omit<Appointment, 'id'>){
    this.id = uuid()
    this.provider = provider
    this.date = date
  }

}

export default Appointment
