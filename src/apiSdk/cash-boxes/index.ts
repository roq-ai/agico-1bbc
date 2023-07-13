import axios from 'axios';
import queryString from 'query-string';
import { CashBoxInterface, CashBoxGetQueryInterface } from 'interfaces/cash-box';
import { GetQueryInterface } from '../../interfaces';

export const getCashBoxes = async (query?: CashBoxGetQueryInterface) => {
  const response = await axios.get(`/api/cash-boxes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCashBox = async (cashBox: CashBoxInterface) => {
  const response = await axios.post('/api/cash-boxes', cashBox);
  return response.data;
};

export const updateCashBoxById = async (id: string, cashBox: CashBoxInterface) => {
  const response = await axios.put(`/api/cash-boxes/${id}`, cashBox);
  return response.data;
};

export const getCashBoxById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cash-boxes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCashBoxById = async (id: string) => {
  const response = await axios.delete(`/api/cash-boxes/${id}`);
  return response.data;
};
