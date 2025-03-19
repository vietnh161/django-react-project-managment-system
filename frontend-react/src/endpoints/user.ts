import { User } from '@/models/User';
import { axiosAPI } from './api';

export const getUsers = async () => {
  const response = await axiosAPI.get<User[]>('users');
  return response.data;
};
