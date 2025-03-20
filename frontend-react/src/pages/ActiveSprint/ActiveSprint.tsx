import React from 'react';

import UserAvatar from '@/components/UserAvatar';
import { useGetProjectDetailsQuery } from '@/endpoints/project';
import { ProjectDetailTitleStyled } from '@/layouts/ProjectDetailsLayout/ProjectDetailsLayout';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';

const ActiveSprint: React.FC = () => {
  const { data: project, error, isLoading } = useGetProjectDetailsQuery('2');

  if (!project) return <></>;

  const activeSprint = project.sprints.find((s) => s.is_active);
  const members = project.members;

  return (
    <Box>
      <ProjectDetailTitleStyled> {activeSprint?.name}</ProjectDetailTitleStyled>
      <Box display={'flex'}>
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
        <Box display={'flex'}>
          {members.map((member) => (
            <>
              <UserAvatar user={member.user} />
            </>
          ))}
        </Box>
      </Box>

      {JSON.stringify(project)}
    </Box>
  );
};

export default ActiveSprint;
