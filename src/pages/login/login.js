import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import { useState, useRef, useEffect, useContext } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginUserMutation } from '../../redux/services/appApi';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../../component/context/app-context';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const { socket } = useContext(AppContext);

  const [loginUser, { error, isLoading, data }] = useLoginUserMutation();

  // console.log('loading data and error', error, isLoading, data);

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('please enter a valid email')
      .required()
      .max(100, 'maximum is 100 characters'),
    password: Yup.string()
      .required('cannot be empty')
      .min(8, 'minimum character is 8')
      .max(15, 'maximum character is 15'),
  });

  const onSubmit = (value, { resetForm, setFieldError }) => {
    loginUser(value)
      .then(({ data }) => {
        if (data) {
          socket.emit('new-user');
          setIsLoggedIn(true);
          navigate('/chat');
          resetForm({ value: '' });
        }
      })
      .catch((err) => {
        toast.error(error.data);
        console.log(err);
      });
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (error) {
      toast.warning(error.data);
    }
  }, [error]);
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Grid container>
        <Grid item md={6} xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              height: '90vh',
              overflow: 'hidden',
            }}
          >
            <Box
              component={'img'}
              sx={{ height: 1, width: 1 }}
              src='https://images.pexels.com/photos/5965925/pexels-photo-5965925.jpeg?cs=srgb&dl=pexels-charlotte-may-5965925.jpg&fm=jpg'
            />
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            //display: 'flex',
            paddingLeft: { xs: 'none', md: 5 },
            position: { xs: 'absolute', md: 'none' },
            top: { xs: '50%', md: 'none' },
            left: { xs: '50%', md: '50%' },
            transform: { xs: 'translate(-50%, -50%)', md: 'none' },
            width: '100%',
            marginX: 'auto',
            marginTop: { xs: 5, md: -15 },
          }}
        >
          <Box
            sx={{
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'left',
              alignItems: 'left',
              paddingX: { xs: 3, md: 'none' },
              paddingY: { xs: 3, md: 'none' },
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ marginBottom: 5 }}>
                <Typography
                  variant='h3'
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'Source Sans Pro, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  Login
                </Typography>
              </Box>
              <TextField
                inputRef={ref}
                variant='filled'
                fullWidth
                label='Email'
                name='email'
                type='text'
                placeholder='example@gmail.com'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  my: 1,
                  width: 1,
                  color: 'red',
                }}
              />
              <TextField
                variant='filled'
                label='Password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                type={showPassword ? 'password' : 'text'}
                placeholder='********'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      {showPassword ? (
                        <VisibilityOffIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={() => setShowPassword((prev) => !prev)}
                        />
                      ) : (
                        <VisibilityIcon
                          onClick={() => setShowPassword((prev) => !prev)}
                          sx={{ cursor: 'pointer' }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  my: 1,
                  width: 1,
                  border: 'none',
                  color: 'red',
                }}
              />

              <LoadingButton
                loading={isLoading}
                fullWidth
                type='submit'
                variant='contained'
                sx={{ mt: 2, textTransform: 'capitalize' }}
              >
                Login
              </LoadingButton>
            </form>

            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 400,
                fontFamily: 'Source Sans Pro, sans-serif',
                mt: 3,
              }}
            >
              Dont't have an account?
              <Link href='/signup'> Signup</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
