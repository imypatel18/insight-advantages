'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Link, Paper, TextField, Typography, Tabs, Tab } from '@mui/material';
import NextLink from 'next/link';
import Navbar from '../components/navbar';

export default function RegisterPage() {
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [tab, setTab] = useState('customer');
  const router = useRouter();

  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      // Redirect to consultant sign-up or login
      router.push('/signup/consultant');
    } else {
      alert('Registration failed. Try again.');
    }
  } catch (err) {
    console.error('Registration error:', err);
    alert('Error connecting to the server.');
  }
};


  return (
    <>
      <Navbar />
     <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Tabs value={tab} onChange={(e,v)=>setTab(v)} centered sx={{ mb: 2 }}>
              <Tab label="Customer" value="customer" />
              <Tab label="Consultant" value="consultant" />
            </Tabs>
            <Box component="form" onSubmit={handleSubmit} noValidate>
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
          </Paper>
        </Container>
      </Box>
    </>
  );
}
