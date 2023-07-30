import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import ConfirmationDialogue from "./ConfirmationDialogue";
import userServices from "../services/userServices";

const UpdatePasswordDialog = ({ open, onClose, email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const handleOpenConfirmation = () => {
    setConfirmationOpen(true);
  };

  const handleSave = () => {
    if (password.trim() === "") {
      setFormError("Password cannot be empty.");
    } else if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
    } else {
      setFormError("");
      handleOpenConfirmation();
    }
  };

  const handleConfirmSave = async () => {
    setConfirmationOpen(false);
    try {
      var res = await userServices.resetPassword({
        Email: email,
        Password: password,
      });
      if (res) {
        toast.success("Password changed successfully");
      } else {
        toast.error("Password reset failed");
      }
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setConfirmationOpen(false);
      setPassword("");
      setConfirmPassword("");
      setFormError("");
      onClose();
    }
  };

  const handleCancelSave = () => {
    setConfirmationOpen(false);
    setPassword("");
    setConfirmPassword("");
    setFormError("");
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            variant="standard"
          />
          {formError && <FormHelperText error>{formError}</FormHelperText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {confirmationOpen && (
        <ConfirmationDialogue
          onClose={(confirmed) => {
            if (confirmed) {
              handleConfirmSave();
            } else {
              handleCancelSave();
            }
          }}
          title="Confirm Save"
          message="Are you sure you want to update your password?"
          confirmText="Save"
          confirmColor="primary"
        />
      )}
    </>
  );
};

export default UpdatePasswordDialog;
