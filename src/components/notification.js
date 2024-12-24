import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, Box } from "@mui/joy";
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React from "react";

const Notification = ({ toggleNotifier, name, resetFormData }) => {
  const handleClose = () => {
    resetFormData();
    toggleNotifier(false);
  }

  return(
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      <Alert
        key="Success"
        sx={{ alignItems: 'flex-start' }}
        startDecorator={<CheckCircleIcon/>}
        variant="soft"
        color="success"
        endDecorator={
          <IconButton
            variant="soft"
            color="success"
            onClick={handleClose}
            data-id="close-notifier"
          >
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        <div>
            <div>Success</div>
            <Typography 
              level="body-sm" 
              color="success" 
              className="notification"
            >
              Thank you {name()}. Your resident details have been saved!
            </Typography>
          </div>
      </Alert>
    </Box>
  )
}

export default Notification;
