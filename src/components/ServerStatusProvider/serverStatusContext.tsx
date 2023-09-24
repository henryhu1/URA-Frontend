import { createContext } from 'react';
import ServerStatusContextType from './serverStatusContextType';

const ServerStatusContext = createContext<ServerStatusContextType | undefined>(undefined);

export default ServerStatusContext;
