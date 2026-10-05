import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Rating,
  Avatar,
  Paper,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DiamondIcon from '@mui/icons-material/Diamond';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import { PORTFOLIO_LOOKS, SERVICE_PACKAGES, TESTIMONIALS } from '../data/mockData';
import { PortfolioLook } from '../types';
import { LookDetailModal } from '../components/LookDetailModal';
import { ShadeMatchTool } from '../components/ShadeMatchTool';

export const HomePage: React.FC = () => {
  const [selectedLook, setSelectedLook] = useState<PortfolioLook | null>(null);

  const featuredLooks = PORTFOLIO_LOOKS.slice(0, 4);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '85vh', md: '92vh' },
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(180deg, #FAF8F5 0%, #F5EFEB 100%)',
          borderBottom: '1px solid rgba(183, 110, 121, 0.15)',
          overflow: 'hidden',
          pt: { xs: 4, md: 6 },
          pb: { xs: 6, md: 8 },
        }}
      >
        {/* Subtle Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(183, 110, 121, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            {/* Left Headline Col */}
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.8, bgcolor: 'rgba(183, 110, 121, 0.12)', borderRadius: 20, mb: 3 }}>
                <AutoAwesomeIcon sx={{ color: '#B76E79', fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Haute Artistry & Luxury Bridal Atelier
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.8rem', sm: '3.8rem', md: '4.8rem' },
                  lineHeight: 1.08,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 3,
                }}
              >
                Unveiling Your Most{' '}
                <Box
                  component="span"
                  sx={{
                    fontStyle: 'italic',
                    color: '#B76E79',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 400,
                  }}
                >
                  Radiant,
                </Box>{' '}
                Timeless Self.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#555555',
                  fontSize: { xs: '1rem', md: '1.18rem' },
                  lineHeight: 1.8,
                  maxWidth: 600,
                  mb: 4.5,
                }}
              >
                Mastered by international beauty artist Mariyam. Specializing in high-definition red carpet glamour, camera-flash-proof bridal finishes, and editorial artistry that enhances your natural bone structure without the mask.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 5 }}>
                <Button
                  component={Link}
                  to="/booking"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<CalendarMonthIcon />}
                  sx={{
                    px: 4,
                    py: 1.6,
                    borderRadius: '28px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  Reserve Your Date
                </Button>

                <Button
                  component={Link}
                  to="/portfolio"
                  variant="outlined"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 3.5,
                    py: 1.6,
                    borderRadius: '28px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                  }}
                >
                  View Lookbook
                </Button>
              </Box>

              {/* Accolades & Social Proof */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DiamondIcon sx={{ color: '#D4A373', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>
                      500+
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#777' }}>
                      Luxury Brides
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VerifiedIcon sx={{ color: '#B76E79', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>
                      100%
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#777' }}>
                      Cruelty-Free Kit
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarIcon sx={{ color: '#D4A373', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>
                      5.0 ★★★★★
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#777' }}>
                      Top Rated Studio
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right Hero Images Composition */}
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative', width: '100%', maxWidth: 480, mx: 'auto' }}>
                {/* Main Hero Card */}
                <Card
                  sx={{
                    overflow: 'hidden',
                    borderRadius: 4,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                    border: '4px solid #ffffff',
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80"
                    alt="Bridal Makeup Artistry"
                    sx={{ height: { xs: 380, sm: 480, md: 540 }, objectFit: 'cover' }}
                  />
                </Card>

                {/* Floating Floating Badge Card */}
                <Paper
                  sx={{
                    position: 'absolute',
                    bottom: { xs: -20, sm: 30 },
                    left: { xs: 10, sm: -30 },
                    p: 2,
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(183, 110, 121, 0.3)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                    maxWidth: 240,
                  }}
                >
                  <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.15em', display: 'block', mb: 0.5 }}>
                    Featured Look
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>
                    The Royal Renaissance Bride
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666', mt: 0.5, display: 'block' }}>
                    14-Hour Transfer-Resistant Velvet Glow
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Looks Gallery Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FAF8F5' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, mb: 6 }}>
            <Box>
              <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
                The Lookbook
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
                Signature Masterpieces
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/portfolio"
              endIcon={<ArrowForwardIcon />}
              sx={{ color: '#8C4852', fontWeight: 700, mt: { xs: 2, md: 0 }, letterSpacing: '0.08em' }}
            >
              Explore Complete Portfolio (8+ Looks)
            </Button>
          </Box>

          <Grid container spacing={4}>
            {featuredLooks.map((look) => (
              <Grid item xs={12} sm={6} md={3} key={look.id}>
                <Card
                  onClick={() => setSelectedLook(look)}
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 36px rgba(183, 110, 121, 0.18)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={look.imageUrl}
                      alt={look.title}
                      sx={{ height: 320, objectFit: 'cover' }}
                    />
                    <Chip
                      label={look.category}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        color: '#8C4852',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', mb: 0.5, lineHeight: 1.3 }}>
                      {look.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#777', display: 'block', mb: 1.5 }}>
                      {look.clientType}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {look.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Signature Services Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FFFFFF', borderTop: '1px solid rgba(183, 110, 121, 0.12)', borderBottom: '1px solid rgba(183, 110, 121, 0.12)' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 7, maxWidth: 700, mx: 'auto' }}>
            <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
              Service Offerings
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 2 }}>
              Artistry Crafted For Your Moments
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
              Each experience is customized from skin preparation to the final setting mist, ensuring you look breathtaking both in personal presence and under high-resolution studio cameras.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {SERVICE_PACKAGES.slice(0, 3).map((pkg) => (
              <Grid item xs={12} md={4} key={pkg.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3.5,
                    borderRadius: 3,
                    position: 'relative',
                    border: pkg.popular ? '2px solid #B76E79' : '1px solid rgba(183, 110, 121, 0.15)',
                    bgcolor: pkg.popular ? '#FAF8F5' : '#ffffff',
                  }}
                >
                  {pkg.popular && (
                    <Chip
                      label="Most Requested"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: '#B76E79',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.68rem',
                        letterSpacing: '0.08em',
                      }}
                    />
                  )}
                  <Typography variant="overline" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.12em' }}>
                    {pkg.category}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 1, fontSize: '1.6rem' }}>
                    {pkg.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                    {pkg.subtitle}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 3 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#B76E79' }}>
                      ${pkg.price}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#888' }}>
                      / {pkg.duration}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, mb: 3 }}>
                    {pkg.features.slice(0, 4).map((feat, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2, mb: 1.5 }}>
                        <AutoAwesomeIcon sx={{ color: '#D4A373', fontSize: 16, mt: 0.3 }} />
                        <Typography variant="body2" sx={{ color: '#444', fontSize: '0.88rem' }}>
                          {feat}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    component={Link}
                    to="/booking"
                    variant={pkg.popular ? 'contained' : 'outlined'}
                    color="primary"
                    fullWidth
                    sx={{ py: 1.3, borderRadius: 2, fontWeight: 700 }}
                  >
                    Select Experience
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              component={Link}
              to="/services"
              variant="text"
              sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.08em' }}
              endIcon={<ArrowForwardIcon />}
            >
              View All 5 Services & Add-Ons
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Interactive Shade Finder Tool */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FAF8F5' }}>
        <Container maxWidth="lg">
          <ShadeMatchTool />
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FFFFFF', borderTop: '1px solid rgba(183, 110, 121, 0.12)' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 7, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
              Client Testimonials
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
              Praised by Brides & Creatives
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {TESTIMONIALS.map((test) => (
              <Grid item xs={12} md={4} key={test.id}>
                <Card sx={{ height: '100%', p: 3.5, borderRadius: 3, display: 'flex', flexDirection: 'column', bgcolor: '#FAF8F5' }}>
                  <Rating value={test.rating} readOnly sx={{ color: '#D4A373', mb: 2 }} />
                  <Typography variant="body1" sx={{ color: '#444', fontStyle: 'italic', lineHeight: 1.8, mb: 3, flex: 1 }}>
                    &ldquo;{test.comment}&rdquo;
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={test.photoUrl} alt={test.clientName} sx={{ width: 48, height: 48, border: '2px solid #B76E79' }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                        {test.clientName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#777' }}>
                        {test.roleOrEvent}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Look Detail Modal */}
      <LookDetailModal look={selectedLook} onClose={() => setSelectedLook(null)} />
    </Box>
  );
};
