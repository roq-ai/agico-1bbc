import { UserInterface } from 'interfaces/user';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface AppointmentInterface {
  id?: string;
  date: any;
  time: any;
  barber_id?: string;
  business_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  business?: BusinessInterface;
  _count?: {};
}

export interface AppointmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  barber_id?: string;
  business_id?: string;
}
