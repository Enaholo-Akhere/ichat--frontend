import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/app-context';
import { useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {
  addNotifications,
  resetNotifications,
} from '../../redux/features/userSlice';

const Sidebar = () => {
  // const rooms = ['first room', 'second room', 'third room'];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    socket,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    rooms,
    setRooms,
    privateMemberMsg,
    setPrivateMemberMsg,
  } = useContext(AppContext);

  socket.off('new-user').on('new-user', (payload) => {
    setMembers(payload);
  });

  const joinRoom = (room, isPublic = true) => {
    socket.emit('join-room', room);
    setCurrentRoom(room);
    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // dispatch for notification
    dispatch(resetNotifications(room));

    socket.off('notifications').on(
      ('notifications',
      (room) => {
        dispatch(addNotifications(room));
      })
    );
  };

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + '-' + id2;
    } else {
      return id2 + '-' + id1;
    }
  };
  const handlePrivateMember = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  useEffect(() => {
    setCurrentRoom('general');
    fetchRooms();
    socket.emit('join-room', 'general');
    socket.emit('new-user');
  }, []);

  const fetchRooms = () => {
    axios
      .get('http://localhost:5000/rooms')
      .then(({ data }) => {
        setRooms(data);
      })
      .catch((error) => console.log('error', error));
  };
  return (
    <Box>
      <Box>
        <Typography variant='h3' sx={{}}>
          Available rooms
        </Typography>
        {rooms &&
          rooms.map((room) => {
            return (
              <Box
                key={room}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: '0.5px solid lightgrey',
                  borderRadius: 1,
                  paddingY: 1,
                  px: 1,
                  my: 1,
                  cursor: 'pointer',
                  backgroundColor: room === currentRoom ? '#d8fff9' : '',
                }}
                onClick={() => joinRoom(room)}
              >
                <Typography variant='body2' sx={{}}>
                  {room}
                </Typography>
                {currentRoom !== room && (
                  <Typography sx={{ color: 'red' }}>
                    {user.newMessage[room]}
                  </Typography>
                )}
              </Box>
            );
          })}
      </Box>
      <Box>
        <Typography variant='h3'>Members</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {members &&
            members.map((member, idx) => {
              return (
                <Box
                  key={idx + 1}
                  variant='body2'
                  onClick={() => handlePrivateMember(member)}
                  sx={{
                    display: member._id === user._id ? 'none' : 'block',
                    border: '0.5px solid lightgrey',
                    borderRadius: 1,
                    paddingY: 1,
                    px: 1,
                    my: 0.5,
                    cursor: 'pointer',
                    backgroundColor:
                      privateMemberMsg?._id === member._id ? '#d8fff9' : '',
                  }}
                >
                  <Typography>{member.name}</Typography>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
