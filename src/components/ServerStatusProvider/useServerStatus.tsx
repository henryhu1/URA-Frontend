import { useContext } from 'react';
import ServerStatusContext from './serverStatusContext';
import ServerStatusContextType from './serverStatusContextType';

const useServerStatus = (): ServerStatusContextType => {
  const context = useContext(ServerStatusContext);

  if (!context) {
    throw new Error('useServerStatus must be used within a ServerStatusProvider');
  }

  return context;
};

export default useServerStatus;
