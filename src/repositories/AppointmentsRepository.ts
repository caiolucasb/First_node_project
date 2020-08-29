import Appointment from '../models/Appoitment'
import { EntityRepository, Repository} from 'typeorm';




@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

    public async findByDate(date: Date): Promise<Appointment | null>{
        // const finAppointment = this.appointments.find(appointment => isEqual(date, appointment.date))
        // return finAppointment || null;

        const findAppointment = await this.findOne({
            where: { date },
        })

        return findAppointment || null;
    }


}

export default AppointmentsRepository;
