import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingComponent() {
  return (
    <Box height="100%" sx={{ display: 'flex', flex: 1, minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
}