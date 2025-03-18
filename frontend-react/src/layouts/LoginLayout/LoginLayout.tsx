import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default LoginLayout;
