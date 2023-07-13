import { AppointmentInterface } from 'interfaces/appointment';
import { CashBoxInterface } from 'interfaces/cash-box';
import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  appointment?: AppointmentInterface[];
  cash_box?: CashBoxInterface[];
  product?: ProductInterface[];
  user?: UserInterface;
  _count?: {
    appointment?: number;
    cash_box?: number;
    product?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
