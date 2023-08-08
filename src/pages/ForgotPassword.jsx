import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ForgotPasswordDialog from '../components/ForgotPasswordDialog';
import AnswerSecurityQuestionDialog from '../components/AnswerSecurityQuestionDialog';
import userServices from '../services/userServices';
import UpdatePasswordDialog from '../components/UpdatePasswordDialog';

function ForgotPassword(props) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const { onClose, open } = props;
  const handleClose = () => {
    setStep(1);
    setSecurityQuestion('');
    onClose();
  };

  const handleSendSecurityQuestion = async (email) => {
    try {
      const res = await userServices.getUserSecurityQuestion(email);
      toast.success('Security question requested successfully.');
      setSecurityQuestion(res);
      setEmail(email);
      setStep(2);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleVerifyAnswer = async (email, answer) => {
    try {
      const res = await userServices.isUserSecurityAnswerValid({
        email,
        securityAnswer: answer,
      });
      if (res) {
        toast.success('Correct answer. Please change your password.');
        setStep(3);
      } else {
        toast.error('Incorrect answer. Please try again.');
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handlePasswordChange = () => {
    setStep(1);
    setSecurityQuestion('');
    onClose();
  };

  return (
    <div className="ForgotDialog">
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
        <DialogContent>
          {step === 1 && (
            <ForgotPasswordDialog
              onSendSecurityQuestion={handleSendSecurityQuestion}
            />
          )}
          {step === 2 && (
            <AnswerSecurityQuestionDialog
              email={email}
              securityQuestion={securityQuestion}
              onVerifyAnswer={handleVerifyAnswer}
            />
          )}
          {step === 3 && (
            <UpdatePasswordDialog
              email={email}
              onClose={handlePasswordChange}
              open
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ForgotPassword;
