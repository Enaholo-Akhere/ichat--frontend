import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Sidebar = () => {
  const rooms = ['first room', 'second room', 'third room'];
  return (
    <Box>
      <Typography variant='h2' sx={{}}>
        Available rooms
      </Typography>
      {rooms.map((room) => {
        return (
          <Typography
            key={room}
            variant='h6'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              border: '0.5px solid gray',
              borderRadius: 1,
              padding: 1,
            }}
          >
            {room}
          </Typography>
        );
      })}

      <Typography variant='h2'>Members</Typography>
    </Box>
  );
};

export default Sidebar;
