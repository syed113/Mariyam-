import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Services & Rates', path: '/services' },
  { label: 'Beauty Journal', path: '/tutorials' },
  { label: 'About & Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: trigger ? 'rgba(255, 255, 255, 0.96)' : 'rgba(250, 248, 245, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(183, 110, 121, 0.15)',
          color: '#1a1a1a',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 68, md: 84 } }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'flex-start', sm: 'center' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <AutoAwesomeIcon sx={{ color: '#B76E79', fontSize: { xs: 20, md: 24 } }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    letterSpacing: '0.15em',
                    fontWeight: 700,
                    fontSize: { xs: '1.25rem', md: '1.65rem' },
                    color: '#1a1a1a',
                    textTransform: 'uppercase',
                  }}
                >
                  Mariyam
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    letterSpacing: '0.15em',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: { xs: '1.25rem', md: '1.65rem' },
                    color: '#B76E79',
                    textTransform: 'uppercase',
                  }}
                >
                  Maquillage
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: '"Montserrat", sans-serif',
                  letterSpacing: '0.28em',
                  fontSize: { xs: '0.55rem', md: '0.62rem' },
                  color: '#777777',
                  textTransform: 'uppercase',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Haute Artistry & Beauty Studio
              </Typography>
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive ? '#B76E79' : '#333333',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.82rem',
                      letterSpacing: '0.08em',
                      position: 'relative',
                      px: 2,
                      py: 1,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: isActive ? '40%' : '0%',
                        height: '2px',
                        backgroundColor: '#B76E79',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '60%',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* Desktop CTA Button */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/booking"
                startIcon={<CalendarMonthIcon sx={{ fontSize: 18 }} />}
                sx={{
                  px: 3,
                  py: 1.2,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  borderRadius: '24px',
                }}
              >
                Reserve Glam
              </Button>
            </Box>

            {/* Mobile Hamburger Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="open navigation menu"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#1a1a1a' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: '#FAF8F5',
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#B76E79', fontWeight: 700 }}>
              Mariyam
            </Typography>
            <Typography variant="caption" sx={{ letterSpacing: '0.2em', color: '#666' }}>
              Maquillage
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#333' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ mt: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerToggle}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: isActive ? 'rgba(183, 110, 121, 0.12)' : 'transparent',
                    color: isActive ? '#B76E79' : '#333333',
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.95rem',
                      letterSpacing: '0.04em',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            to="/booking"
            onClick={handleDrawerToggle}
            startIcon={<CalendarMonthIcon />}
            sx={{ py: 1.5, borderRadius: '24px', letterSpacing: '0.08em' }}
          >
            Reserve Glam
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
