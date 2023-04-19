import { useState, useEffect } from 'react';
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
import { Cog as CogIcon } from '../../icons/cog';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { useLogoutUserMutation } from '../../redux/services/appApi';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import UtilityModal from '../../utils/utilityModal';
import { BallTriangle } from 'react-loader-spinner';

export const AccountPopover = (props) => {
  const navigate = useNavigate();
  const [logoutUser, { isLoading, data, error }] = useLogoutUserMutation();
  const { anchorEl, onClose, open, onOpen, user, ...other } = props;
  const [openModal, setOpenModal] = useState(false);

  const handleLogout = async () => {
    await logoutUser(user);
    navigate('/');
  };

  useEffect(() => {
    if (isLoading) {
      setOpenModal(true);
    } else if (error === undefined || error) {
      setOpenModal(false);
    } else if (data) {
      setOpenModal(false);
    }
  }, [isLoading, data, error]);

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
      <UtilityModal
        open={openModal}
        setOpen={setOpenModal}
        name={'Modal'}
        display='none'
      >
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            zIndex: 2,
          }}
        >
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            ariaLabel='ball-triangle-loading'
            wrapperClass={{}}
            wrapperStyle=''
            color='#0a04a3'
            visible={isLoading}
          />
        </Box>
      </UtilityModal>
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex',
        }}
      >
        <Avatar
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
