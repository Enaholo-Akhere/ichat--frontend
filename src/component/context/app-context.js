import { io } from 'socket.io-client';
import React from 'react';
const SOCKET_URL = 'http://localhost:5000';

//app context
export const socket = io(SOCKET_URL);
export const AppContext = React.createContext();
