import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export const NotFoundPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#FAF8F5', minHeight: '80vh', display: 'flex', alignItems: 'center', py: 8 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.25em' }}
        >
          Error 404 · Page Not Found
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '3.5rem', md: '5rem' },
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
            color: '#1a1a1a',
            my: 1.5,
          }}
        >
          Lost In The Atelier?
        </Typography>

        <Typography variant="body1" sx={{ color: '#666', maxWidth: 520, mx: 'auto', mb: 4, lineHeight: 1.8 }}>
          The formulation or page you are seeking may have been renamed or archived. Allow us to guide you back to our luxury beauty suites.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 6 }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ShoppingBagOutlinedIcon />}
            sx={{ px: 3.5, py: 1.4, borderRadius: '28px', fontWeight: 700 }}
          >
            Return to Homepage
          </Button>
          <Button
            component={Link}
            to="/shop"
            variant="outlined"
            size="large"
            sx={{ px: 3.5, py: 1.4, borderRadius: '28px', fontWeight: 700 }}
          >
            Explore Catalog
          </Button>
          <Button
            component={Link}
            to="/quiz"
            variant="outlined"
            size="large"
            startIcon={<AutoAwesomeIcon sx={{ color: '#D4A373' }} />}
            sx={{ px: 3.5, py: 1.4, borderRadius: '28px', fontWeight: 700 }}
          >
            Take Beauty Quiz
          </Button>
        </Box>

        <Grid container spacing={2}>
          {[
            { label: 'Royal Foundations', to: '/shop?cat=Makeup' },
            { label: 'Clinical Skincare', to: '/shop?cat=Skincare' },
            { label: 'Bridal Studio', to: '/bridal-studio' },
            { label: 'Bespoke Gifting', to: '/gifting' },
          ].map((item, idx) => (
            <Grid item xs={6} sm={3} key={idx}>
              <Paper
                component={Link}
                to={item.to}
                sx={{
                  p: 2,
                  display: 'block',
                  textDecoration: 'none',
                  color: '#1a1a1a',
                  borderRadius: 2,
                  bgcolor: '#ffffff',
                  border: '1px solid #eee',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  '&:hover': { borderColor: '#B76E79', bgcolor: '#FAF8F5' },
                }}
              >
                {item.label}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
