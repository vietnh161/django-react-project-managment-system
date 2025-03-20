import { Box, Breadcrumbs, Link, styled, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ProjectDetailsSidebar from './ProjectDetailsSidebar';
import { useGetProjectQuery } from '@/endpoints/project';

export const ProjectDetailTitleStyled = styled(Typography)({
  
})

const ProjectDetailsLayout: React.FC = () => {
  const { data: project } = useGetProjectQuery('2');

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <ProjectDetailsSidebar project={project} />
      <Box sx={{ py: 3, px: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 14 }}>
          <Link underline="hover" color="inherit" href="/">
            MUI
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Core
          </Link>
          <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
            Breadcrumbs
          </Typography>
        </Breadcrumbs>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProjectDetailsLayout;
