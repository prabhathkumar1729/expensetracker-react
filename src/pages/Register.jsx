import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import userServices from "../services/userServices";

function validateEmail(email) {
  // Very basic email validation (can be improved)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  // Check if the password is not empty
  return password.trim() !== "";
}

const Register = () => {
    var navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    name: false,
    email: false,
    password: false,
    securityQuestion: false,
    securityAnswer: false,
    emailExists: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    const isValidName = formData.name.trim() !== "";
    const isValidEmail = validateEmail(formData.email);
    const isValidPassword = validatePassword(formData.password);
    const isValidSecurityQuestion = formData.securityQuestion.trim() !== "";
    const isValidSecurityAnswer = formData.securityAnswer.trim() !== "";

    if (
      !isValidName ||
      !isValidEmail ||
      !isValidPassword ||
      !isValidSecurityQuestion ||
      !isValidSecurityAnswer
    ) {
      // Show error messages for invalid fields
      setFormErrors({
        name: !isValidName,
        email: !isValidEmail,
        password: !isValidPassword,
        securityQuestion: !isValidSecurityQuestion,
        securityAnswer: !isValidSecurityAnswer,
        emailExists: false,
      });
      return;
    }

    // All fields are valid, submit the form
    try {
      var res = await userServices.registerUser({
        Name: formData.name,
        Email: formData.email,
        Password: formData.password,
        SecurityQuestion: formData.securityQuestion,
        SecurityAnswer: formData.securityAnswer,
      });
      if (res) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error submitting registration form:", error);
      setFormErrors({
        ...formErrors,
        emailExists: true,
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error message for the changed field
    setFormErrors({
      ...formErrors,
      [name]: false,
      emailExists: false,
    });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              error={formErrors.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              error={formErrors.email || formErrors.emailExists}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <FormHelperText error>Email is invalid</FormHelperText>
            )}
            {formErrors.emailExists && (
              <FormHelperText error>Email already exists</FormHelperText>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              error={formErrors.password}
              onChange={handleInputChange}
            />
            {formErrors.password && (
              <FormHelperText error>Password is required</FormHelperText>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="securityQuestion"
              label="Security Question"
              name="securityQuestion"
              autoComplete="securityQuestion"
              value={formData.securityQuestion}
              error={formErrors.securityQuestion}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="securityAnswer"
              label="Security Answer"
              name="securityAnswer"
              autoComplete="securityAnswer"
              value={formData.securityAnswer}
              error={formErrors.securityAnswer}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login" variant="body2">
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
