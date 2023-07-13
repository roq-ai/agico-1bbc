import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface CashBoxInterface {
  id?: string;
  amount: number;
  business_id?: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface CashBoxGetQueryInterface extends GetQueryInterface {
  id?: string;
  business_id?: string;
}
