import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';
//import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
//import { clearUserDetails } from 'src/redux/slices';
// import { clearState } from 'src/services/storage';
import { Cog as CogIcon } from '../../icons/cog';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { useLogoutUserMutation } from '../../redux/services/appApi';
import Link from '@mui/material/Link';

export const AccountPopover = (props) => {
  const [logoutUser] = useLogoutUserMutation();

  const { anchorEl, onClose, open, onOpen, user, ...other } = props;
  //const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(user);

    window.location.replace('/');
  };

  //const user = useSelector((state) => state.user);
  // const navigate = useNavigate();
  //console.log(user);

  // const handleLogout = async () => {
  //   try {
  //     onClose?.();
  //    // dispatch(clearUserDetails());
  //     clearState()
  //       .then(() => {
  //         navigate('/login');
  //       })
  //       .catch((err) => console.log("couldn't log out"));
  //   } catch (err) {
  //     console.error(err);
  //     alert('Unable to logout.');
  //   }
  // };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 300, marginTop: 8 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex',
        }}
      >
        <Avatar
          // src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`}
          src={`https://ui-avatars.com/api/?name=${user.name.split(' ')[0]}+${
            user.name.split(' ')[1]
          }`}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize='small' />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          {/* <Typography variant='body1'>{`${user?.firstName} ${user?.lastName}`}</Typography> */}
          <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>{`${
            user.name.split(' ')[0]
          } ${user.name.split(' ')[1]}`}</Typography>
          <Typography color='textSecondary' variant='body2'>
            {`${user.status}`.toLowerCase()}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <Link href='/home' passHref>
          <MenuItem component='a' onClick={onClose}>
            <ListItemIcon>
              <UserCircleIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant='body1'>Profile</Typography>}
            />
          </MenuItem>
        </Link>
        <Link href='/dashboard/settings' passHref>
          <MenuItem component='a' onClick={onClose}>
            <ListItemIcon>
              <CogIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant='body1'>Settings</Typography>}
            />
          </MenuItem>
        </Link>

        <Divider />
        {/* <MenuItem onClick={handleLogout}> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant='body1'>Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};
