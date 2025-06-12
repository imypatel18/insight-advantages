'use client';

import { useState } from 'react';
// import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Navbar from '../components/navbar';

export default function AccountPage() {
  const [user] = useState({ name: 'John Doe', email: 'john@example.com' });
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
}