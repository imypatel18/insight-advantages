'use client';

import { useState } from 'react';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import Navbar from '../components/navbar';

export default function AccountPage() {
  const [user] = useState({ name: 'John Doe', email: 'john@example.com' });

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ width: 80, height: 80, mb: 2 }}>{user.name.charAt(0)}</Avatar>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {user.email}
          </Typography>
          <Button variant="contained">Edit</Button>
        </Box>
      </Container>
    </>
  );
}
