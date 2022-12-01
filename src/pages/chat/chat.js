import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Messaging from '../../component/chat/messaging';
import Sidebar from '../../component/chat/sidebar';

const Chat = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} sx={{ px: 2 }}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={7} sx={{ px: 2 }}>
          <Messaging />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
