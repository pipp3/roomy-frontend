'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import Avatar from '@/components/Avatar';
import Link from 'next/link';

const Header: React.FC = () => {
  const { usuario, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar position="static" className="bg-primary shadow-lg">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" className="text-white no-underline font-bold">
            RoomyApp
          </Link>
        </Typography>
        
        {usuario ? (
          <Box className="flex items-center space-x-4">
            <Link href="/reservas" className="text-white no-underline">
              <Button color="inherit">Mis Reservas</Button>
            </Link>
            <Link href="/nueva-reserva" className="text-white no-underline">
              <Button color="inherit">Nueva Reserva</Button>
            </Link>
            
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              className="ml-4 flex items-center space-x-2"
              sx={{ textTransform: 'none' }}
            >
              <Avatar 
                src={usuario.avatar} 
                alt={usuario.nombre}
                size="sm"
              />
              <span className="hidden sm:inline">{usuario.nombre}</span>
            </Button>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleLogout}>
                <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Link href="/login" className="text-white no-underline">
            <Button color="inherit">Iniciar Sesión</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 