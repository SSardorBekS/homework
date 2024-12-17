'use client';

import { useState, useEffect } from 'react';
import { useTelegramAuth } from '../hooks/useTelegramAuth';

const TelegramLogin = () => {
  const [telegramData, setTelegramData] = useState<string | null>(null);
  const { mutate: authenticateWithTelegram } = useTelegramAuth();

  useEffect(() => {
    if (window.Telegram) {
      const data = window.Telegram.WebApp.initData;
      setTelegramData(data);
    }
  }, []);

  const handleTelegramLogin = () => {
    if (telegramData) {
      authenticateWithTelegram(telegramData);
    } else {
      console.log('Telegram data not available.');
    }
  };

  return (
    <div>
      <button onClick={handleTelegramLogin}>Login with Telegram</button>
    </div>
  );
};

export default TelegramLogin;
