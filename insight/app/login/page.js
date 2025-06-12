'use client';

import { useState } from 'react';
import { Box, Button, Container, Link, Paper, TextField, Typography, Tabs, Tab } from '@mui/material';
import NextLink from 'next/link';
import Navbar from '../components/navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('customer');

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert(`Welcome ${data.consultant.FirstName}`);
      // TODO: redirect to dashboard
    } else {
      alert(data.message || 'Invalid email or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong. Try again.');
  }
};


  return (
    <>
      <Navbar />
            <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Tabs value={tab} onChange={(e, v) => setTab(v)} centered sx={{ mb: 2 }}>
              <Tab label="Customer" value="customer" />
              <Tab label="Consultant" value="consultant" />
            </Tabs>
            <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign in
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link component={NextLink} href="/register">
              Sign up
            </Link>
          </Typography>
                 </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
