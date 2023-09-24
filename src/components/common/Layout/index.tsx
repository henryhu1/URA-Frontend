import React, { ReactNode, useState, useEffect } from 'react';
import { Flex, Fade } from '@chakra-ui/react';

const Layout = ({ children }: LayoutProps ) => {
  const [flexHeight, setFlexHeight] = useState('100vh');

  useEffect(() => {
    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
    setFlexHeight(`calc(100vh - ${navbarHeight}px)`);
  }, []);

  return (
    <Fade in transition={{exit: {delay: 2}, enter: {duration: 0.5}}}>
      <Flex
        justifyContent="center"
        alignItems="center"
        m={4}
        height={flexHeight}
      >
        {children}
      </Flex>
    </Fade>
  );
};

type LayoutProps = {
  children: ReactNode,
};

export default Layout;
