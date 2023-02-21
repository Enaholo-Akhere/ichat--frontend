import Box from '@mui/material/Box';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Messaging = () => {
  const initialValues = {
    message: '',
  };

  const validationSchema = yup.object({
    message: yup.string().required(),
  });

  const onSubmit = (values) => {
    console.log(alert(JSON.stringify(values)));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const hello = [
    'hello',
    'hello',
    'hello',
    'hello',
    'hello',
    'hello',
    'hello',
    'hello',
    'hello',
  ];
  return (
    <Box>
      <Box
        sx={{
          height: '60vh',
          border: '2px solid gray',
          borderRadius: 2,
          padding: 2,
          mb: 3,
          overflow: 'auto',
        }}
      >
        {hello.map((hello, i) => {
          return (
            <Typography key={hello + i} sx={{ textAlign: 'right' }}>
              {hello}
            </Typography>
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
