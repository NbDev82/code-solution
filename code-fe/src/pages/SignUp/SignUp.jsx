import * as React from 'react';
import { useState } from 'react';
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
import { AvatarGenerator } from 'random-avatar-generator';
import { NotificationContainer, NotificationManager } from 'react-notifications-component';
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
  const generator = new AvatarGenerator();

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleRegistrationSuccess = () => {
    NotificationManager.success('Registration successful!', 'Success', {
      timeOut: 3000, // Duration in milliseconds
      pauseOnHover: true, // Pause the timer when hovering over the notification
      // Other options
    });
  };
  const [data, setData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    dateOfBirth: '',
    role: 'USER',
    urlImage: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const resetData = () => {
    setData({
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      dateOfBirth: '',
      role: 'USER',
      urlImage: '',
    });
  };
  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    let newAvatarUrl = '';

    debugger;
    try {
      // Thử tạo giá trị ngẫu nhiên mới cho newAvatarUrl
      newAvatarUrl = generator.generateRandomAvatar();
      if (newAvatarUrl.length >= 750) {
        newAvatarUrl = 'https://example.com/default-avatar.png';
      }
    } catch (error) {
      console.error('Failed to generate random avatar URL:', error);
      // Xử lý khi không thể tạo giá trị ngẫu nhiên, ví dụ: sử dụng một giá trị mặc định
      newAvatarUrl = 'https://example.com/default-avatar.png';
    }
    const [year, month, day] = data.dateOfBirth.split('-');
    debugger;
    const dateOfBirth = `${year}-${month}-${day}T00:00:00.000`;

    signUp({ ...data, dateOfBirth, urlImage: newAvatarUrl })
      .then((resp) => {
        if (resp.message === 'user.login.register_successfully') {
          toast.success('User is registered successfully !! user id ' + resp.id);
          navigate('/sign-in');
        } else {
          toast.error('Registration failed. Please try again.');
        }
      })
      .catch((error) => {
        toast.error('An error occurred. Please try again.');
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
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
            Sign up
          </Typography>
          <Box component="form" validateForm onSubmit={submitForm} sx={{ mt: 3 }}>
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
                  error={!!errors.fullName}
                  helperText={errors.fullName}
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
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
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
                  value={data.dateOfBirth}
                  onChange={(e) => handleChange(e, 'dateOfBirth')}
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
                  error={!!errors.email}
                  helperText={errors.email}
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
                  value={data.password}
                  onChange={(e) => handleChange(e, 'password')}
                  error={!!errors.password}
                  helperText={errors.password}
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
              <Button type="submit" disabled={isSubmitting} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {isSubmitting ? 'Loading...' : 'Sign Up'}
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
