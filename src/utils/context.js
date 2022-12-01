import { io } from 'socket.io-client';
import { createContext } from 'react';

const SOCKET_URL = 'http://localhost/5000';

//app context
export const AppContent = createContext({});
