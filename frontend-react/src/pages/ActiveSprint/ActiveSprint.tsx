import React from 'react';

import { useGetProjectDetailsQuery } from '@/endpoints/project';
import { Box } from '@mui/material';
const ActiveSprint: React.FC = () => {
  const { data: project, error, isLoading } = useGetProjectDetailsQuery('18');

  if (!project) return <></>;

  return (
    <Box>
      ActiveSprint
      {JSON.stringify(project)}

      <Box></Box>

    </Box>
  );
};

export default ActiveSprint;
