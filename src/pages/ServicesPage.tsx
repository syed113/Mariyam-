import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SparklesIcon from '@mui/icons-material/Star';
import { SERVICE_PACKAGES, ADD_ON_OPTIONS } from '../data/mockData';

export const ServicesPage: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 750, mx: 'auto' }}>
          <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
            Curated Menus & Rates
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.6rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 2 }}>
            Artistry Packages
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
            Whether walking down the aisle, stepping in front of studio flashes, or mastering pro techniques for yourself, our transparent pricing ensures seamless luxury.
          </Typography>
        </Box>

        {/* Packages Grid */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {SERVICE_PACKAGES.map((pkg) => (
            <Grid item xs={12} md={6} lg={4} key={pkg.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  position: 'relative',
                  border: pkg.popular ? '2px solid #B76E79' : '1px solid rgba(183, 110, 121, 0.15)',
                  bgcolor: pkg.popular ? '#FAF8F5' : '#ffffff',
                  boxShadow: pkg.popular ? '0 12px 35px rgba(183, 110, 121, 0.15)' : 'none',
                }}
              >
                {pkg.popular && (
                  <Chip
                    label="Signature Choice"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      bgcolor: '#B76E79',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                    }}
                  />
                )}

                <Typography variant="overline" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.12em' }}>
                  {pkg.category}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 1, fontSize: '1.75rem' }}>
                  {pkg.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                  {pkg.subtitle}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 3 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#B76E79' }}>
                    ${pkg.price}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#888', fontWeight: 500 }}>
                    / {pkg.duration}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ color: '#555', fontStyle: 'italic', mb: 3, p: 1.5, bgcolor: 'rgba(183, 110, 121, 0.05)', borderRadius: 2 }}>
                  &ldquo;{pkg.recommendedFor}&rdquo;
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ flex: 1, mb: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2, letterSpacing: '0.05em' }}>
                    Package Inclusions:
                  </Typography>
                  {pkg.features.map((feat, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2, mb: 1.5 }}>
                      <CheckCircleOutlineIcon sx={{ color: '#B76E79', fontSize: 18, mt: 0.2 }} />
                      <Typography variant="body2" sx={{ color: '#444', lineHeight: 1.5 }}>
                        {feat}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  component={Link}
                  to={`/booking?service=${pkg.id}`}
                  variant={pkg.popular ? 'contained' : 'outlined'}
                  color="primary"
                  fullWidth
                  startIcon={<CalendarMonthIcon />}
                  sx={{ py: 1.4, borderRadius: 2, fontWeight: 700 }}
                >
                  Book Package
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add-On Upgrades Section */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
              Elevate Your Glamour
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              Luxury Add-Ons & Enhancements
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {ADD_ON_OPTIONS.map((addon) => (
              <Grid item xs={12} sm={6} md={4} key={addon.id}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 2.5,
                    border: '1px solid rgba(183, 110, 121, 0.18)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                        {addon.name}
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#B76E79', fontWeight: 700 }}>
                        +${addon.price}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                      {addon.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 2, color: '#8C4852' }}>
                    <SparklesIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Available to add during booking
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* The Artistry Process Timeline */}
        <Paper
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            bgcolor: '#ffffff',
            border: '1px solid rgba(183, 110, 121, 0.2)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
              The Journey
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              How The Bridal Experience Works
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { num: '01', title: 'Consultation & Date Hold', desc: 'Submit inquiry with event details. We confirm Mariyam’s availability and review inspiration imagery.' },
              { num: '02', title: 'Studio Glamour Trial', desc: 'Held 4-8 weeks prior to your date. We perfect skin undertone matching, lash clusters, and lighting testing.' },
              { num: '03', title: 'Curated Skincare Plan', desc: 'Receive custom aesthetician guidance on active ingredients, dermaplaning, and hydration for peak barrier health.' },
              { num: '04', title: 'Wedding Day Elevation', desc: 'On-location relaxed beauty suite setup, calming aromatherapy, de-puffing lymphatic sculpt, and locked 16hr glam.' },
            ].map((step, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Box sx={{ position: 'relative' }}>
                  <Typography variant="h2" sx={{ color: 'rgba(183, 110, 121, 0.25)', fontWeight: 800, mb: 1, fontFamily: '"Montserrat", sans-serif' }}>
                    {step.num}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              to="/booking"
              variant="contained"
              size="large"
              startIcon={<AutoAwesomeIcon />}
              sx={{ px: 5, py: 1.6, borderRadius: '28px', fontWeight: 700, letterSpacing: '0.1em' }}
            >
              Start Your Booking Request
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
