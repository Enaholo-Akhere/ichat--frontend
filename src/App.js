import NavBar from './component/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/chat/chat';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import { useState } from 'react';
import Authenticated from './component/protected-routes/authenticated';
import NotAuthenticated from './component/protected-routes/not-authenticated';
import { useSelector } from 'react-redux';
import { AppContext, socket } from './component/context/app-context';
import Notfound from './pages/notfound/notfound';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessage, setNewMessage] = useState({});
  const user = useSelector((state) => state.user);

  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        rooms,
        setRooms,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        newMessage,
        setNewMessage,
      }}
    >
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<Authenticated />}>
            <Route path='/chat' element={<Chat />} />
          </Route>
          <Route element={<NotAuthenticated />}>
            <Route
              path='/signup'
              element={<Signup setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path='/login'
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
          </Route>
          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
