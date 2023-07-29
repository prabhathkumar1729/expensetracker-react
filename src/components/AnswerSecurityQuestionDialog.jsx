import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const AnswerSecurityQuestionDialog = ({ email, securityQuestion, onVerifyAnswer }) => {
  const [answer, setAnswer] = useState("");

  const handleVerifyAnswer = () => {
    onVerifyAnswer(email, answer);
  };

  return (
    <Box>
      <Typography variant="h6">Security Question</Typography>
      <Typography variant="body1">{securityQuestion}</Typography>
      <TextField
        label="Answer"
        fullWidth
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleVerifyAnswer}>
        Verify Answer
      </Button>
    </Box>
  );
};

export default AnswerSecurityQuestionDialog;
