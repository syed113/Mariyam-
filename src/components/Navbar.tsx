import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  Badge,
  InputBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useStore } from '../context/StoreContext';

const navItems = [
  { label: 'Shop All', path: '/shop' },
  { label: 'Makeup', path: '/shop?cat=Makeup' },
  { label: 'Skincare', path: '/shop?cat=Skincare' },
  { label: 'Bridal Studio', path: '/bridal-studio' },
  { label: 'Gifting', path: '/gifting' },
  { label: 'AI Matcher', path: '/quiz', highlight: true },
  { label: 'Routine', path: '/routine-builder' },
  { label: 'Admin', path: '/admin' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { cartCount, wishlist, setIsCartOpen, setIsAdvisorOpen, user } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <Box
        sx={{
          bgcolor: '#161616',
          color: '#FAF8F5',
          py: 0.8,
          px: 2,
          textAlign: 'center',
          fontSize: { xs: '0.7rem', sm: '0.76rem' },
          fontWeight: 600,
          letterSpacing: '0.12em',
          borderBottom: '1px solid rgba(212, 163, 115, 0.25)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <span>COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER ₹999</span>
        <span style={{ color: '#D4A373' }}>·</span>
        <span style={{ color: '#D4A373' }}>USE CODE <strong>LUXE20</strong> FOR 20% OFF</span>
        <Box
          component="button"
          onClick={() => setIsAdvisorOpen(true)}
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
            alignItems: 'center',
            gap: 0.5,
            ml: 2,
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.72rem',
            textDecoration: 'underline',
            '&:hover': { color: '#D4A373' },
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 13, color: '#D4A373' }} />
          Chat with Beauty Advisor
        </Box>
      </Box>

      {/* Main App Bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#ffffff',
          color: '#1a1a1a',
          borderBottom: '1px solid rgba(183, 110, 121, 0.16)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 68, md: 80 } }}>
            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: '#1a1a1a' }}>
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Zone 1: Brand Wordmark */}
            <Box
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <AutoAwesomeIcon sx={{ color: '#B76E79', fontSize: { xs: 20, md: 24 } }} />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  letterSpacing: '0.14em',
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', md: '1.65rem' },
                  color: '#1a1a1a',
                  textTransform: 'uppercase',
                }}
              >
                Mariyam <span style={{ color: '#B76E79', fontStyle: 'italic', fontWeight: 300 }}>Maquillage</span>
              </Typography>
            </Box>

            {/* Zone 2: Navigation Links (Desktop) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || location.search.includes(item.path.split('?')[1] || '');
                return (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive ? '#B76E79' : '#2c2c2c',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.84rem',
                      letterSpacing: '0.04em',
                      px: 1.6,
                      py: 0.8,
                      position: 'relative',
                      ...(item.highlight && {
                        color: '#8C4852',
                        fontWeight: 700,
                      }),
                      '&:hover': {
                        color: '#B76E79',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    {item.highlight && <AutoAwesomeIcon sx={{ fontSize: 13, mr: 0.5, color: '#D4A373' }} />}
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* Zone 3: Actions (Search, Wishlist, Account, Cart) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
              {/* Search expander */}
              {searchOpen ? (
                <Box
                  component="form"
                  onSubmit={handleSearchSubmit}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#FAF8F5',
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.4,
                    border: '1px solid #B76E79',
                  }}
                >
                  <InputBase
                    placeholder="Search lipstick, serum..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    sx={{ fontSize: '0.85rem', width: { xs: 120, sm: 180 } }}
                  />
                  <IconButton type="submit" size="small">
                    <SearchIcon sx={{ fontSize: 18, color: '#B76E79' }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => setSearchOpen(false)}>
                    <CloseIcon sx={{ fontSize: 16, color: '#888' }} />
                  </IconButton>
                </Box>
              ) : (
                <IconButton onClick={() => setSearchOpen(true)} sx={{ color: '#2c2c2c' }} aria-label="Search">
                  <SearchIcon />
                </IconButton>
              )}

              {/* Wishlist */}
              <IconButton component={Link} to="/account?tab=wishlist" sx={{ color: '#2c2c2c' }} aria-label="Wishlist">
                <Badge badgeContent={wishlist.length} color="primary" sx={{ '& .MuiBadge-badge': { bgcolor: '#B76E79' } }}>
                  <FavoriteBorderOutlinedIcon />
                </Badge>
              </IconButton>

              {/* Account (Hayah Laboratories inspired) */}
              <IconButton
                component={Link}
                to="/account"
                sx={{ color: '#2c2c2c' }}
                aria-label="Account"
                title={user ? `Signed in as ${user.name}` : 'My Account'}
              >
                <PersonOutlineOutlinedIcon />
              </IconButton>

              {/* Cart Drawer Button */}
              <IconButton
                onClick={() => setIsCartOpen(true)}
                sx={{
                  bgcolor: 'rgba(183, 110, 121, 0.1)',
                  color: '#8C4852',
                  '&:hover': { bgcolor: 'rgba(183, 110, 121, 0.2)' },
                }}
                aria-label="Shopping Bag"
              >
                <Badge badgeContent={cartCount} color="error" sx={{ '& .MuiBadge-badge': { bgcolor: '#E91E63' } }}>
                  <ShoppingBagOutlinedIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 300, bgcolor: '#FAF8F5', p: 3 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 700, letterSpacing: '0.1em' }}>
              Mariyam
            </Typography>
            <Typography variant="caption" sx={{ color: '#B76E79', letterSpacing: '0.2em' }}>
              MAQUILLAGE
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  bgcolor: location.pathname === item.path ? 'rgba(183, 110, 121, 0.12)' : 'transparent',
                  color: location.pathname === item.path ? '#B76E79' : '#333',
                }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2 }}>
            <ListItemButton
              component={Link}
              to="/account"
              onClick={() => setMobileOpen(false)}
              sx={{ borderRadius: 2, border: '1px solid rgba(183,110,121,0.2)' }}
            >
              <PersonOutlineOutlinedIcon sx={{ mr: 1, color: '#B76E79' }} />
              <ListItemText primary="My Account / Orders" primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setMobileOpen(false);
              setIsAdvisorOpen(true);
            }}
            startIcon={<AutoAwesomeIcon />}
            sx={{ py: 1.4, borderRadius: 2, fontWeight: 700 }}
          >
            Chat with Beauty Advisor
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
