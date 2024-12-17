import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useTelegramAuth = () => {
  return useMutation(
    async (telegramData: string) => {
      const response = await axios.post('/api/auth/callback/credentials', {
        telegramData,
      });
      return response.data;
    },
    {
      onError: (error) => {
        console.error('Telegram authentication failed:', error);
      },
      onSuccess: (data) => {
        console.log('User authenticated with Telegram:', data);
        // After successful login, you can redirect or save user info
      },
    }
  );
};
