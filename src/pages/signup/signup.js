import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import { useState, useRef, useEffect } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSignupUserMutation } from '../../redux/services/appApi';

const Signup = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  console.log('error and isLoading', isLoading, error);

  const ref = useRef(null);

  const validateImage = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return toast.error('image size too large, 1mb allowed');
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    ref.current.focus();
  }, []);
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('cannot be empty')
      .min(3, 'minimum character is 3')
      .max(15, 'maximum character is 15'),
    email: Yup.string()
      .email('please enter a valid email')
      .required()
      .max(100, 'maximum is 100 characters'),
    password: Yup.string()
      .required('cannot be empty')
      .min(8, 'minimum character is 8')
      .max(15, 'maximum character is 15'),
  });
  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'g2cg4y7p');

    try {
      setUploadingImg(true);
      const resp = await axios.post(
        'https://api.cloudinary.com/v1_1/enaholo/image/upload',
        data
      );
      console.log(resp);
      setUploadingImg(false);
      const urldata = resp.data.url;
      return urldata;
    } catch (err) {
      setUploadingImg(false);
      console.log('error message', err);
    }
  };
  const onSubmit = async (value, { resetForm, setFieldError }) => {
    if (!image) {
      toast.warning('please upload a profile picture');
    } else {
      const imageUrl = await uploadImage(image);
      if (imageUrl) {
        console.log('imageurl', imageUrl);
        value.picture = imageUrl;
        setImagePreview(null);
        resetForm({ value: '' });
        setIsLoggedIn(true);
      }
    }

    signupUser(value)
      .then((data) => console.log('returned data', data))
      .catch((err) => {
        console.log(err.message);
      });
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
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
              height: { xs: '59vh', sm: '66vh', md: '89.6vh' },
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
          sx={{ display: 'flex', paddingLeft: { xs: 'none', md: 5 } }}
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  my: 2,
                }}
              >
                <Typography
                  variant='h3'
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'Source Sans Pro, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  Create Account
                </Typography>
                <Box
                  sx={{
                    border: '1px solid lightgray',
                    width: 150,
                    height: 150,
                    p: 1,
                    borderRadius: 100,
                    margin: 'auto',
                  }}
                >
                  <Avatar
                    alt='image-upload'
                    src={imagePreview || ''}
                    sx={{ width: 1, height: 1 }}
                  />
                  <label htmlFor='photo'>
                    <AddAPhotoIcon
                      htmlFor='photo'
                      sx={{
                        position: 'relative',
                        left: 100,
                        bottom: 30,
                        fontSize: 30,
                        cursor: 'pointer',
                      }}
                    />
                  </label>
                </Box>
                <input
                  type='file'
                  id='photo'
                  hidden
                  accept='image/png, image/jpeg'
                  onChange={validateImage}
                />
              </Box>
              <TextField
                inputRef={ref}
                variant='filled'
                fullWidth
                label='Name'
                name='name'
                type='text'
                placeholder='John Doe'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{
                  my: 1,
                  width: 1,
                }}
              />
              <TextField
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

              <Button
                type='submit'
                variant='contained'
                sx={{ mt: 2, textTransform: 'capitalize' }}
              >
                {!uploadingImg ? 'Create account' : 'uploading image'}
              </Button>
            </form>

            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 400,
                fontFamily: 'Source Sans Pro, sans-serif',
                mt: 3,
              }}
            >
              Already have an account?
              <Link href='/login'> Login</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
