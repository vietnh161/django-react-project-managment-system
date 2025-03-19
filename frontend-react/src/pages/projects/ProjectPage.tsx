import React from 'react';

import AppNavLink from '@/components/AppNavLink';
import BasicTable from '@/components/BasicTable';
import { useGetProjectsQuery } from '@/endpoints/project';
import { Project } from '@/models/Project';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
const ProjectPage: React.FC = () => {
  const { data: projects, error, isLoading } = useGetProjectsQuery();

  if (!projects || projects?.length === 0) return <>Loading...</>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography fontSize={24} fontWeight={600}>
        Projects
      </Typography>

      <Box
        paddingTop={2}
        sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}
      >
        <TextField
          placeholder="Search project"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
        />
        <Button variant="contained">
          <AddIcon />
        </Button>
      </Box>

      <BasicTable<Project>
        columns={[
          {
            key: 'name',
            label: 'Name',
            value: (project) => (
              <AppNavLink to={project.key + ''}>{project.name}</AppNavLink>
            ),
          },
          { key: 'key', label: 'Key' },
          { key: 'description', label: 'Description' },
        ]}
        data={projects}
      ></BasicTable>
    </Box>
  );
};

export default ProjectPage;
