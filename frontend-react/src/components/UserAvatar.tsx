import { User } from '@/models/User';
import { Avatar, AvatarProps } from '@mui/material';
import React from 'react';

const UserAvatar: React.FC<AvatarProps & { user: User }> = ({
  user,
  ...props
}) => {
  return (
    <Avatar
      {...props}
      src={
        user.image
          ? `${process.env.REACT_APP_DJANGO_STATIC_IMAGES_ENDPOINT}/user/${user.image}`
          : undefined
      }
      alt={`${user.first_name} ${user.last_name}`}
    />
  );
};

export default UserAvatar;
