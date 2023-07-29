import React, { useState } from "react";
import ForgotPasswordDialog from "../components/ForgotPasswordDialog";
import AnswerSecurityQuestionDialog from "../components/AnswerSecurityQuestionDialog";
import ChangePasswordDialog from "../components/UpdatePasswordDialog";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [verifiedAnswer, setVerifiedAnswer] = useState(false);

  const handleSendSecurityQuestion = (email) => {
    // Send API request to get the security question based on the email
    // Set the security question received from the API
    // For now, let's assume the security question is "What is your pet's name?"
    setSecurityQuestion("What is your pet's name?");
    setEmail(email);
    setStep(2);
  };

  const handleVerifyAnswer = (email, answer) => {
    // Send API request to verify the answer to the security question
    // For now, let's assume the correct answer is "fluffy"
    if (answer.toLowerCase() === "fluffy") {
      setVerifiedAnswer(true);
      setStep(3);
    } else {
      // Incorrect answer, show an error message or handle accordingly
      alert("Incorrect answer. Please try again.");
    }
  };

  const handlePasswordChange = (newPassword) => {
    // Send API request to change the password
    // For now, let's assume the password change was successful
    alert("Password changed successfully!");
    setStep(1);
  };

  return (
    <div>
      {step === 1 && <ForgotPasswordDialog onSendSecurityQuestion={handleSendSecurityQuestion} />}
      {step === 2 && (
        <AnswerSecurityQuestionDialog
          email={email}
          securityQuestion={securityQuestion}
          onVerifyAnswer={handleVerifyAnswer}
        />
      )}
      {step === 3 && (
        <ChangePasswordDialog
          email={email}
          onPasswordChange={handlePasswordChange}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
