import axios from 'axios';
import queryString from 'query-string';
import { CommissionInterface, CommissionGetQueryInterface } from 'interfaces/commission';
import { GetQueryInterface } from '../../interfaces';

export const getCommissions = async (query?: CommissionGetQueryInterface) => {
  const response = await axios.get(`/api/commissions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCommission = async (commission: CommissionInterface) => {
  const response = await axios.post('/api/commissions', commission);
  return response.data;
};

export const updateCommissionById = async (id: string, commission: CommissionInterface) => {
  const response = await axios.put(`/api/commissions/${id}`, commission);
  return response.data;
};

export const getCommissionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/commissions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCommissionById = async (id: string) => {
  const response = await axios.delete(`/api/commissions/${id}`);
  return response.data;
};
