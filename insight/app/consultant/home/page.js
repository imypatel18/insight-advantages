'use client';

import Navbar from '../../components/navbar';
import { Box, Container, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function ConsultantHomePage() {
  const requests = [
    { id: 1, client: 'Acme Corp', details: 'Seeking assessment for return-to-work program.' },
    { id: 2, client: 'Smith Industries', details: 'Need training session on disability management.' },
    { id: 3, client: 'Global Tech', details: 'Looking for ongoing quality assurance consulting.' },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom color="primary.main">
            Consultant Dashboard
          </Typography>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Latest Client Requests
            </Typography>
            <List>
              {requests.map((req) => (
                <ListItem key={req.id} divider>
                  <ListItemText
                    primary={req.client}
                    secondary={req.details}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
