import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CommissionInterface {
  id?: string;
  rate: number;
  barber_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CommissionGetQueryInterface extends GetQueryInterface {
  id?: string;
  barber_id?: string;
}
