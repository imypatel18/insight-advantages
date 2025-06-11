'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import Navbar from '../components/navbar';

export default function RegisterPage() {
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const router = useRouter();

  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/account');
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign up
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            value={values.firstName}
            onChange={handleChange('firstName')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={values.lastName}
            onChange={handleChange('lastName')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange('password')}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Register
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link component={NextLink} href="/login">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
