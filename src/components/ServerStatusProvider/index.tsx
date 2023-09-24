import React, { ReactNode } from 'react';
import ServerStatusContext from './serverStatusContext';

const ServerStatusProvider = ({
  isServerDown,
  children
}: {
  isServerDown: boolean
  children: ReactNode
}) => {

  return (
    <ServerStatusContext.Provider value={{ isServerDown }}>
      {children}
    </ServerStatusContext.Provider>
  );
};

export default ServerStatusProvider;

