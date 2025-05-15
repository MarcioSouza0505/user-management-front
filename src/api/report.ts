import axios from 'axios';
import type { CountResponseDTO, ByMonthResponseDTO } from '../types/reports';

const api = axios.create({ baseURL: '' });

export const getUserCount    = () => api.get<CountResponseDTO>('/users/reports/count');
export const getUsersByMonth = () => api.get<ByMonthResponseDTO[]>('/users/reports/by-month');
