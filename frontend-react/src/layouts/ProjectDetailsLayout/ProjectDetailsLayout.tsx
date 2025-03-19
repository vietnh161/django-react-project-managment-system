import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ProjectDetailsSidebar from './ProjectDetailsSidebar';
import { useGetProjectQuery } from '@/endpoints/project';

const ProjectDetailsLayout: React.FC = () => {
  const { data: project } = useGetProjectQuery('17');

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <ProjectDetailsSidebar project={project} />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProjectDetailsLayout;
