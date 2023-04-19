import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', md: 400 },
  margin: 'auto',
  boxShadow: 24,
  p: 5,
  zIndex: 1000,
};

const UtilityModal = ({ children, name, icon, open, setOpen, display }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={open ? style : {}}>
      <Button
        variant='contained'
        onClick={handleOpen}
        startIcon={icon}
        sx={{ display: display || '' }}
      >
        {name}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          padding: 5,
          overflow: 'auto',
        }}
      >
        {children}
      </Modal>
    </Box>
  );
};

export default UtilityModal;
