import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, TextField, IconButton, Divider } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

export const Footer: React.FC = () => {
  const [emailSubscribed, setEmailSubscribed] = React.useState(false);
  const [subEmail, setSubEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail) {
      setEmailSubscribed(true);
      setSubEmail('');
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#161616',
        color: '#E5E5E5',
        pt: 8,
        pb: 5,
        borderTop: '1px solid rgba(183, 110, 121, 0.25)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {/* Brand Col */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AutoAwesomeIcon sx={{ color: '#D4A373' }} />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  letterSpacing: '0.15em',
                  color: '#ffffff',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                Mariyam <span style={{ color: '#D4A373', fontStyle: 'italic', fontWeight: 300 }}>Maquillage</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#A0A0A0', lineHeight: 1.8, mb: 3, maxWidth: 360 }}>
              &ldquo;Your Beauty, Your Power!&rdquo; — High-performance cosmetic formulations engineered with clinical skincare actives. Designed to endure flash photography, banquets, and all-day humidity.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <IconButton
                sx={{ color: '#D4A373', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(212,163,115,0.2)' } }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{ color: '#D4A373', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(212,163,115,0.2)' } }}
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                sx={{ color: '#D4A373', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(212,163,115,0.2)' } }}
                aria-label="Pinterest"
              >
                <PinterestIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" sx={{ color: '#D4A373', mb: 2.5, fontSize: '0.8rem', letterSpacing: '0.15em' }}>
              Online Store
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography component={Link} to="/shop" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#ffffff' } }}>
                Shop All Formulations
              </Typography>
              <Typography component={Link} to="/shop?cat=Makeup" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#ffffff' } }}>
                Face & Complexion
              </Typography>
              <Typography component={Link} to="/shop?cat=Skincare" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#ffffff' } }}>
                Clinical Skincare
              </Typography>
              <Typography component={Link} to="/quiz" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#ffffff' } }}>
                AI Shade Matcher
              </Typography>
              <Typography component={Link} to="/routine-builder" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#ffffff' } }}>
                Routine Generator
              </Typography>
              <Typography component={Link} to="/account" sx={{ color: '#A0A0A0', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#ffffff' } }}>
                My Account & Orders
              </Typography>
            </Box>
          </Grid>

          {/* Customer Care & Policies */}
          <Grid item xs={6} sm={4} md={3}>
            <Typography variant="h6" sx={{ color: '#D4A373', mb: 2.5, fontSize: '0.8rem', letterSpacing: '0.15em' }}>
              Atelier & Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon sx={{ color: '#D4A373', fontSize: 20, mt: 0.2 }} />
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                  450 Madison Avenue, 8th Fl<br />New York, NY 10022
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#D4A373', fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                  concierge@mariyammaquillage.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: '#D4A373', fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: '#A0A0A0' }}>
                  +1 (212) 555-GLAM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <LocalShippingOutlinedIcon sx={{ color: '#D4A373', fontSize: 18 }} />
                <Typography variant="caption" sx={{ color: '#bbb' }}>
                  Complimentary Express on orders ₹999+
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter VIP */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" sx={{ color: '#D4A373', mb: 2.5, fontSize: '0.8rem', letterSpacing: '0.15em' }}>
              The VIP Circle
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 2 }}>
              Sign up for 20% off your first order, private product drops, and beauty masterclass guides.
            </Typography>
            {emailSubscribed ? (
              <Box sx={{ p: 2, bgcolor: 'rgba(212, 163, 115, 0.1)', borderRadius: 1, border: '1px solid #D4A373' }}>
                <Typography variant="body2" sx={{ color: '#D4A373', fontWeight: 600 }}>
                  ✓ Welcome! Use code LUXE20 for 20% off.
                </Typography>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField
                  size="small"
                  placeholder="Enter your email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  type="email"
                  required
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.06)',
                    borderRadius: 1,
                    '& .MuiInputBase-input': { color: '#ffffff', fontSize: '0.85rem' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D4A373' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#D4A373',
                    color: '#1a1a1a',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    fontSize: '0.78rem',
                    '&:hover': { bgcolor: '#c39263' },
                  }}
                >
                  Claim 20% VIP Code
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#666666' }}>
            © {new Date().getFullYear()} Mariyam Maquillage. Inspired by Nykaa & Sephora. All Rights Reserved.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#777', fontSize: '0.75rem' }}>
              <LockOutlinedIcon sx={{ fontSize: 14, color: '#D4A373' }} />
              <span>256-Bit SSL Encrypted</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#777', fontSize: '0.75rem' }}>
              <CreditCardIcon sx={{ fontSize: 14, color: '#D4A373' }} />
              <span>Cards · UPI · Netbanking · COD</span>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
