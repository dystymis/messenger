'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io, Socket } from 'socket.io-client';

// Определяем тип данных, которые будут приходить через сокет
interface TypingEvent {
  username: string;
  isTyping: boolean;
}

let socket: Socket | null = null;

export function TypingIndicator() {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socketio');
    socket = io();

    socket.on('user-typing', ({ username, isTyping: typing }: TypingEvent) => {
      setIsTyping(typing);
      setTypingUser(username);
    });
  };

  return (
    <AnimatePresence>
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-gray-500 dark:text-gray-400 italic text-sm mb-2"
        >
          {typingUser} печатает...
        </motion.div>
      )}
    </AnimatePresence>
  );
}
