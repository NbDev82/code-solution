import * as React from 'react';
import { useState } from 'react';

import { format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signUp } from '~/services/UserService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dateOfBirth = new Date();
    const formattedDateOfBirth = dateOfBirth.toISOString();

    console.log({
      fullName: data.get('fullName'),
      phoneNumber: data.get('phoneNumber'),
      dateOfBirth: formattedDateOfBirth,
      email: data.get('email'),
      password: data.get('password'),
      role: 'USER',
    });
  };
  const [data, setData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    dateOfBirth: '',
    role: 'USER',
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };
  const resetData = () => {
    debugger;
    setData({
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      dateOfBirth: '',
      role: 'USER',
    });
  };
  const submitForm = (event) => {
    event.preventDefault();
    signUp(data)
      .then((resp) => {
        toast.success('User is registered successfully !! user id ' + resp.id);

        setData({
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          dateOfBirth: '',
          role: 'USER',
        });
        navigate('/sign-in');
      })
      .catch((error) => {
        setError({
          errors: error,
          isError: true,
        });
      });
    debugger;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={submitForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  value={data.fullName}
                  onChange={(e) => handleChange(e, 'fullName')}
                  autoComplete="fullName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={(e) => handleChange(e, 'phoneNumber')}
                  autoComplete="phoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dateOfBirth"
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={data.email}
                  onChange={(e) => handleChange(e, 'email')}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  onChange={(e) => handleChange(e, 'password')}
                  value={data.password}
                  autoComplete="password"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Container>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Button onClick={resetData} className="ms-2" outline color="secondary">
                Reset
              </Button>
            </Container>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
