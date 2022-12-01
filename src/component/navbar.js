import React, { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ichat from '../assets/ichatlogo.png';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountPopover } from './accountPopOver/accountPopOver';
import { useSelector } from 'react-redux';

const NavBar = ({ isLoggedIn }) => {
  const user = useSelector((state) => state.user);

  console.log('user state', user);
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = (value) => {
    setOpenPopover(value);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <Box sx={{ height: '10vh' }} ref={anchorRef}>
      <AppBar
        position='static'
        elevation={2}
        style={{ backgroundColor: '#eff0ff', height: '100%' }}
      >
        <Toolbar>
          <Box component='div' sx={{ flexGrow: 1 }}>
            <Box sx={{ width: 80 }}>
              <Link href='/'>
                <Box
                  component={'img'}
                  src={ichat}
                  sx={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </Link>
            </Box>
          </Box>

          <Box>
            {user && (
              <IconButton onClick={() => navigate('/chat')}>Chat</IconButton>
            )}
            {user && (
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
              >
                <Avatar alt='Ena Sharp' src={user.picture} />
              </IconButton>
            )}
            {user ? (
              <Button
                endIcon={<ArrowDropDownIcon />}
                onClick={() => {
                  handleOpenPopover(!openPopover);
                }}
                variant='text'
                sx={{ color: '#2228E6', textTransform: 'capitalize' }}
              >
                {user.name}
                <AccountPopover
                  anchorEl={anchorRef.current}
                  onClose={handleClosePopover}
                  open={openPopover}
                  user={user}
                />
              </Button>
            ) : (
              <IconButton
                onClick={() => navigate('/login')}
                variant='text'
                sx={{ color: '#2228E6', textTransform: 'capitalize' }}
              >
                Login
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
