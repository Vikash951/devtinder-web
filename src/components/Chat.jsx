import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  const user = useSelector(appStore => appStore.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages(prev => [...prev, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const fetchChatMessages = async () => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true });
    const chatMessages = chat?.data?.messages.map((msg) => ({
      firstName: msg?.senderId?.firstName,
      lastName: msg?.senderId?.lastName,
      text: msg?.text,
    }));
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName, lastName, userId, targetUserId, text: newMessage });
    setNewMessage('');
  };

  return (
    <div className='w-full max-w-3xl mx-auto my-5 h-[80vh] flex flex-col border border-gray-300 rounded-lg shadow-md overflow-hidden'>
      <header className='bg-blue-600 text-white p-4 text-xl font-semibold'>
        Chat 
      </header>
      <div className='flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${user.firstName === msg.firstName ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
              user.firstName === msg.firstName ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              <p className='font-semibold'>{msg.firstName + ' ' + msg.lastName}</p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <footer className='p-4 border-t border-gray-200 bg-white flex gap-2'>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type your message..."
          className='flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={sendMessage}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition'
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Chat;
