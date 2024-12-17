import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useLogin = () => {
  return useMutation(
    async (credentials: { username: string; password: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/token`, {
        username: credentials.username,
        password: credentials.password,
      });
      return response.data;
    },
    {
      onError: (error) => {
        console.error('Login failed:', error);
      },
      onSuccess: (data) => {
        console.log('User logged in:', data);
        // After successful login, you can redirect or store user info
      },
    }
  );
};
