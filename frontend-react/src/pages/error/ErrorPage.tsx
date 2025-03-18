import React from 'react';
import { type ErrorResponse, useRouteError } from 'react-router-dom';

import { Box, styled, Typography } from '@mui/material';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorResponse;

  return (
    <Box>
      <Typography>Oops - something went wrong!</Typography>
      <p>
        <i>
          {error.statusText ??
            ('message' in error ? (error.message as string) : 'Unknown error')}
        </i>
      </p>
    </Box>
  );
};

export default ErrorPage;
