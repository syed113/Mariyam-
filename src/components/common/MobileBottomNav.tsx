import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { cartCount, setIsSearchOpen, setIsCartOpen } = useStore();

  const getNavValue = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path.startsWith('/shop')) return 1;
    if (path.startsWith('/account')) return 4;
    return -1;
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        display: { xs: 'block', md: 'none' },
        borderTop: '1px solid rgba(183, 110, 121, 0.15)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={getNavValue()}
        sx={{
          height: 60,
          bgcolor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 0,
            py: 0.5,
            color: '#777777',
            '&.Mui-selected': {
              color: '#8C4852',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.68rem',
            fontWeight: 600,
          },
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Home"
          icon={<HomeOutlinedIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/shop"
          label="Shop"
          icon={<StorefrontOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchOutlinedIcon />}
          onClick={() => setIsSearchOpen(true)}
        />
        <BottomNavigationAction
          label="Bag"
          icon={
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingBagOutlinedIcon />
            </Badge>
          }
          onClick={() => setIsCartOpen(true)}
        />
        <BottomNavigationAction
          component={Link}
          to="/account"
          label="Account"
          icon={<PersonOutlineOutlinedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};
