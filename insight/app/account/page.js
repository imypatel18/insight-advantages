'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Navbar from '../components/navbar';

export default function AccountPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    certificate: null,
  });

  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, certificate: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Account Details
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
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload Certificate
            <input hidden type="file" onChange={handleFileChange} />
          </Button>
          {values.certificate && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {values.certificate.name}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Save
          </Button>
        </Box>
      </Container>
    </>
  );
}
