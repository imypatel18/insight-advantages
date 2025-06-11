'use client';

import { useState } from 'react';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import Navbar from '../components/navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
      </Container>
    </>
  );
}
