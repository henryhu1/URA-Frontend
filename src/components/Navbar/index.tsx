import React, { ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { useColorModeValue, Box, HStack, Text } from '@chakra-ui/react';
import useAuth from 'components/AuthProvider/useAuth';
import StringConstants from 'constants/strings';

const NavItem = ({ to, onClick, children }: NavItemProps) => (
  <Box
    as={NavLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to={to}
    onClick={onClick}
  >
    {children}
  </Box>
);

type NavItemProps = {
  to: NavLinkProps["to"],
  onClick?: NavLinkProps["onClick"],
  children: ReactNode,
};

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Box id="navbar" bg={useColorModeValue('gray.100', 'gray.900')} px={4} py={2}>
      <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
        <NavItem to={isAuthenticated ? '/myaccount' : '/'}>
          <Text>
            {StringConstants.HOME}
          </Text>
        </NavItem>
        <NavItem onClick={isAuthenticated ? logout : () => null} to={'/login'}>
          <Text>
            {isAuthenticated ? StringConstants.LOGOUT : StringConstants.LOGIN}
          </Text>
        </NavItem>
      </HStack>
    </Box>
  );
};

export default Navbar;
