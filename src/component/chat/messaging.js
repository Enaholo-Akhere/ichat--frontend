import Box from '@mui/material/Box';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import { AppContext } from '../context/app-context';
import { useSelector } from 'react-redux';

const Messaging = () => {
  const { currentRoom, socket, messages, setMessages } = useContext(AppContext);

  const user = useSelector((state) => state.user);

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  };

  const initialValues = {
    message: '',
  };

  const validationSchema = yup.object({
    message: yup.string().required(),
  });

  const todayDate = getFormattedDate();

  socket.off('room-messages').on('room-messages', (roomMessages) => {
    console.log('room messages', roomMessages);
    setMessages(roomMessages);
  });

  const onSubmit = (values, { resetForm }) => {
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ':' + minutes;
    const roomId = currentRoom;
    const newMessage = values.message;
    socket.emit('message-room', roomId, newMessage, user, time, todayDate);
    resetForm({ values: '' });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <Box>
      <Box
        sx={{
          height: { xs: '30vh', md: '50vh' },
          border: '2px solid gray',
          borderRadius: 2,
          mb: 3,
          overflow: 'auto',
        }}
      >
        {messages &&
          messages.map(({ _id: date, messageByDate }, idx) => {
            return (
              <Box
                key={idx + 1}
                sx={{
                  textAlign: 'right',
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    py: 1,
                    bgcolor: '#d8fff9',
                  }}
                >
                  <Typography sx={{ color: '#025b4c', fontSize: 14 }}>
                    {date}
                  </Typography>
                </Box>
                <Box sx={{ width: 'fit-content', maxWidth: '70%' }}>
                  {messageByDate &&
                    messageByDate.map(
                      ({ content, time, from: sender }, messageIdx) => (
                        <Box
                          key={messageIdx + 1}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',

                            gap: 1,
                            my: 2,
                            bgcolor: '#d8fff9',
                            py: 2,
                            borderRadius: 3,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',

                              justifyContent: 'flex-begin',
                              px: 2,
                              alignItems: 'center',
                            }}
                          >
                            <Box sx={{ width: 30, height: 30, mr: 1 }}>
                              <Box
                                sx={{ width: 1, height: 1, borderRadius: 360 }}
                                component={'img'}
                                src={sender.picture}
                              />
                            </Box>
                            <Box>
                              <Typography
                                sx={{ fontSize: 13, fontWeight: 400 }}
                              >
                                {user.name === sender.name
                                  ? 'You'
                                  : sender.name}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ px: 2, width: 'fit-content' }}>
                            <Typography
                              sx={{
                                textAlign: 'left',
                                fontSize: 13,
                                color: 'rgba(0,0,0, 0.9)',
                                lineHeight: 1.3,
                                letterSpacing: 1,
                                fontWeight: 500,
                              }}
                            >
                              {content}
                            </Typography>
                          </Box>
                          <Box sx={{ px: 2 }}>
                            <Typography
                              sx={{
                                textAlign: 'left',
                                fontSize: 13,
                                color: 'rgba(0,0,0, 0.6)',
                                lineHeight: 1.3,
                                letterSpacing: 1,
                                width: 'fit-content',
                                bgcolor: '#d8fff9',
                                pt: 1,
                                borderRadius: 10,
                              }}
                            >
                              {time}
                            </Typography>
                          </Box>
                        </Box>
                      )
                    )}
                </Box>
              </Box>
            );
          })}
      </Box>
      <Box sx={{}}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={11}>
              <TextField
                fullWidth
                name='message'
                label='enter message'
                type='text'
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                type='submit'
                variant='text'
                sx={{ pl: 1, bgColor: 'none' }}
              >
                <SendIcon sx={{ fontSize: '3rem' }} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Messaging;
