import React from 'react';

interface IProtectedAuthProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedAuthProps> = ({ children }) => {
  return <>{children}</>;
};

export default ProtectedRoute;
