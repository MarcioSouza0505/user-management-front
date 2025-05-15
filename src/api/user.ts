import axios from 'axios';
import type { UserDTO, CreateUserDTO, UpdateUserDTO } from '../types/users';

const api = axios.create({ baseURL: '' });
export const getUsers    = () => api.get<UserDTO[]>('/users');
export const getUser     = (id: number) => api.get<UserDTO>(`/users/${id}`);
export const createUser  = (data: CreateUserDTO) => api.post<UserDTO>('/users', data);
export const updateUser  = (id: number, data: UpdateUserDTO) => api.put<UserDTO>(`/users/${id}`, data);
export const deleteUser  = (id: number) => api.delete<void>(`/users/${id}`);
