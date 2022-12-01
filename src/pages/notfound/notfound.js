import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Notfound = () => {
  return (
    <Box>
      <Typography
        variant='h1'
        sx={{ display: 'flex', margin: 'auto', justifyContent: 'center' }}
      >
        Not Found
      </Typography>
    </Box>
  );
};

export default Notfound;
