import * as React from 'react';
import { useState } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doLogin } from '~/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
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
import { loginUser } from '~/services/UserService';
import userContext from '~/context/userContext';
import { Label } from '@mui/icons-material';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const userContextData = useContext(userContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loginDetail, setLoginDetail] = useState({
    phoneNumber: '',
    password: '',
    role: 'USER',
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      phoneNumber: '',
      password: '',
      role: 'USER',
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    //validation
    if (loginDetail.phoneNumber.trim() == '' || loginDetail.password.trim() == '') {
      toast.error('Username or Password  is required !!');
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        if (data.message === 'user.login.login_successfully') {
          //save the data to localStorage
          doLogin(data, () => {
            //redirect to user dashboard page
            userContextData.setUser({
              data: data.user,
              login: true,
            });
            navigate('/');
          });

          toast.success('Login successful!');
        }
      })
      .catch((error) => {
        setIsSubmitting(false);

        if (error.response.status == 400 || error.response.status == 404) {
          if (error.response.data.message === 'user.register.password_not_match') {
            alert('Password failed');
          } else {
            alert('PhoneNumber is not exists');
          }
        } else {
          toast.error('Something went wrong on the server!');
        }
      });
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleFormSubmit} validateForm sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              value={loginDetail.phoneNumber}
              onChange={(e) => handleChange(e, 'phoneNumber')}
              name="phoneNumber"
              autoComplete="phoneNumber"
              autoFocus
              style={{ width: '100%', marginRight: '10px' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={loginDetail.password}
              onChange={(e) => handleChange(e, 'password')}
              autoComplete="current-password"
              style={{ width: '100%', marginRight: '10px' }} // Set the width and margin for the password field
            />
            {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
            <Container>
              <Button type="submit" disabled={isSubmitting} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {isSubmitting ? 'Loading...' : 'Sign In'}
              </Button>
              {error ? <Label>{error}</Label> : null}

              <Button onClick={handleReset} className="ms-2" outline color="secondary">
                Reset
              </Button>
            </Container>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default SignIn;
