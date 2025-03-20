import AppNavLink from '@/components/AppNavLink';
import {
  Box,
  colors,
  IconButton,
  MenuItem,
  SvgIconTypeMap,
  Typography,
} from '@mui/material';
import React, { ReactElement, useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import { appColors } from '@/configs/layout.config';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SettingsIcon from '@mui/icons-material/Settings';
import { Project } from '@/models/Project';
import ServerImage from '@/components/ServerImage';

const SidebarMenuItem: React.FC<{
  to: string;
  label: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
}> = ({ to, label, Icon }) => {
  return (
    <AppNavLink to={to}>
      {({ isActive = false }) => {
        return (
          <MenuItem
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: isActive ? appColors.primary : colors.grey[600],
              padding: 2,
              paddingLeft: 3,
              borderRight: 'solid 4px',
              borderColor: isActive ? appColors.primary : 'transparent',
              transition: 'all ease 0.5s',
            }}
          >
            {Icon && (
              <Icon
                sx={{
                  width: 28,
                  height: 28,
                  marginRight: 1,
                }}
              />
            )}
            {label}
          </MenuItem>
        );
      }}
    </AppNavLink>
  );
};

const ProjectDetailsSidebar: React.FC<{ project?: Project }> = ({
  project,
}) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <Box
      sx={{
        width: collapse ? 40 : 250,
        minWidth: collapse ? 40 : 250,
        position: 'relative',
        border: 'solid 1px',
        borderColor: colors.grey[300],
        transition: 'all ease 0.3s',
        overflow: 'hidden',
        ':hover .collapse-btn': {
          opacity: 1,
        },
      }}
    >
      <IconButton
        className="collapse-btn"
        sx={{
          position: 'absolute',
          right: '4px',
          top: '28px',
          background: colors.grey[200],
          width: '28px',
          height: '28px',
          opacity: 0,
          transition: 'all ease 0.3s',
          zIndex: 1,
        }}
        onClick={() => setCollapse(!collapse)}
      >
        {collapse ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
      </IconButton>
      <Box
        sx={{
          width: 250,
          padding: 1,
          height: '100%',
          transition: 'all ease 0.3s',
          opacity: collapse ? 0 : 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: 3,
            marginBottom: 2,
            borderBottom: 'solid 1px',
            borderColor: colors.grey[300],
            img: {
              width: 40,
              height: 40,
              objectFit: 'contain',
            },
          }}
        >
          <ServerImage
            src={`project/${project?.image}`}
          ></ServerImage>
          <Box>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontSize: 10,
                fontWeight: 400,
              }}
            >
              Project
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
              }}
            >
              {project?.name}
            </Typography>
          </Box>
        </Box>
        <Box>
          <SidebarMenuItem
            to={'backlog'}
            label="Backlog"
            Icon={AssignmentIcon}
          />
          <SidebarMenuItem
            to={'active-sprint'}
            label="Active Sprint"
            Icon={CalendarViewWeekIcon}
          />
          <SidebarMenuItem to={'a'} label="Members" Icon={PeopleIcon} />
          <SidebarMenuItem
            to={'b'}
            label="Reports"
            Icon={StackedBarChartIcon}
          />
          <SidebarMenuItem to={'b'} label="Settings" Icon={SettingsIcon} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDetailsSidebar;
