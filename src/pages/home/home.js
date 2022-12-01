import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import homePhoto from '../../assets/home.jpeg';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Grid container>
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
            <Typography
              variant='h3'
              sx={{
                fontWeight: 400,
                fontFamily: 'Source Sans Pro, sans-serif',
              }}
            >
              Happy moments happy friends
            </Typography>
            <Typography
              variant='p'
              sx={{
                mb: 2,
                mt: 1,
                fontWeight: 400,
                fontFamily: 'Source Sans Pro, sans-serif',
              }}
            >
              iChat let's you connect with the world
            </Typography>

            <Button
              endIcon={<ForumRoundedIcon />}
              variant='contained'
              sx={{
                width: 'fit-content',
                fontWeight: 600,
                fontFamily: 'Source Sans Pro, sans-serif',
              }}
              onClick={() => navigate('/signup')}
            >
              Get started
            </Button>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box
            sx={{
              height: { xs: '59vh', sm: '66vh', md: '89.6vh' },
              overflow: 'hidden',
            }}
          >
            <Box
              component={'img'}
              sx={{ height: 1, width: 1 }}
              src={homePhoto}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
