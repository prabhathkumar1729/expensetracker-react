import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button,
} from '@mui/material';

function ForgotPasswordDialog({ onSendSecurityQuestion }) {
  const [email, setEmail] = useState('');

  const handleSendSecurityQuestion = () => {
    onSendSecurityQuestion(email);
  };

  return (
    <Box>
      <Typography variant="h6">Forgot Password</Typography>
      <TextField
        label="Email Address"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="standard"
      />
      <Button variant="contained" color="primary" onClick={handleSendSecurityQuestion} sx={{ margin: '20px' }}>
        Send Security Question
      </Button>
    </Box>
  );
}

export default ForgotPasswordDialog;
