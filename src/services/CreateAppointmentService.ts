
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';

import {getCustomRepository} from 'typeorm';



interface Request{
    provider_id: string;
    date: Date;
}
class CreateAppointmentService {

    public async execute({provider_id, date}:Request): Promise<Appointment>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);


    const appointmentDate = startOfHour(date);

    const finAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

    if(finAppointmentInSameDate){
        throw Error('this appointment is already booked');
    }
    const appointment = appointmentsRepository.create({provider_id, date:appointmentDate});

    await appointmentsRepository.save(appointment)
    return appointment;
    }
}
export default CreateAppointmentService;
