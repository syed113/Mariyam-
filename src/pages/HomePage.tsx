import React from 'react';
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
  Paper,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { INITIAL_ARTICLES } from '../data/initialCatalog';
import { HERO_ASSETS, CATEGORY_ASSETS } from '../data/visualAssets';

const CATEGORY_CARDS = CATEGORY_ASSETS;

export const HomePage: React.FC = () => {
  const { products, setIsAdvisorOpen } = useStore();

  const bestsellers = products.filter((p) => p.isBestseller || p.isFeatured).slice(0, 4);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* 1. Hero Campaign Banner */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: '#FAF8F5',
          borderBottom: '1px solid rgba(183, 110, 121, 0.15)',
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.6, bgcolor: 'rgba(183, 110, 121, 0.1)', borderRadius: 20, mb: 3 }}>
                <AutoAwesomeIcon sx={{ color: '#B76E79', fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  The Haute Beauty Destination
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.8rem', sm: '3.8rem', md: '4.6rem' },
                  lineHeight: 1.08,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 2.5,
                }}
              >
                Your Beauty, <br />
                <Box component="span" sx={{ color: '#B76E79', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>
                  Your Power!
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#555555',
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  lineHeight: 1.8,
                  maxWidth: 540,
                  mb: 4.5,
                }}
              >
                Experience professional cosmetic performance fused with clinical dermatological skincare. Discover your exact foundation match and personalized routines through AI-guided consultation.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                <Button
                  component={Link}
                  to="/shop"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.6,
                    borderRadius: '28px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}
                >
                  Shop Best Sellers
                </Button>

                <Button
                  component={Link}
                  to="/quiz"
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<AutoAwesomeIcon sx={{ color: '#D4A373' }} />}
                  sx={{
                    px: 3.5,
                    py: 1.6,
                    borderRadius: '28px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}
                >
                  Take 60-Sec Beauty Quiz
                </Button>
              </Box>

              {/* Trust markers */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, pt: 2, borderTop: '1px solid #ebe5df', flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <StarIcon sx={{ color: '#D4A373', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#333' }}>
                    4.9/5 from 4,500+ Verified Reviews
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <VerifiedUserOutlinedIcon sx={{ color: '#B76E79', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#333' }}>
                    100% Authentic & Cruelty-Free
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Hero Image Showcase */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', maxWidth: 540, mx: 'auto' }}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                    border: '4px solid #ffffff',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={HERO_ASSETS.luxuryFlatlay}
                    alt="Mariyam Maquillage Haute Cosmetics & Skincare"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';
                    }}
                    sx={{ height: { xs: 340, sm: 460, md: 520 }, objectFit: 'cover' }}
                  />
                </Card>

                {/* Floating promo badge */}
                <Paper
                  sx={{
                    position: 'absolute',
                    bottom: { xs: -15, sm: 25 },
                    left: { xs: 10, sm: -25 },
                    p: 2.2,
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(183, 110, 121, 0.25)',
                    maxWidth: 240,
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#E91E63', fontWeight: 700, letterSpacing: '0.1em', display: 'block' }}>
                    LIMITED OFFER
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.2 }}>
                    Complimentary Mini 24K Mist
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#777', display: 'block', mt: 0.5 }}>
                    With any ₹1,499+ purchase. Automatic at checkout.
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. Three Value Pillars */}
      <Box sx={{ bgcolor: '#ffffff', py: 4, borderBottom: '1px solid rgba(183, 110, 121, 0.12)' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} justifyContent="space-between">
            {[
              {
                icon: <LocalShippingOutlinedIcon sx={{ color: '#B76E79', fontSize: 28 }} />,
                title: 'Complimentary Luxury Delivery',
                desc: 'Free express shipping on all orders over ₹999 in thermal protective packaging.',
              },
              {
                icon: <AutoAwesomeIcon sx={{ color: '#D4A373', fontSize: 28 }} />,
                title: 'AI Shade & Routine Matcher',
                desc: 'Tailored pigment mapping matching skin undertone, coverage, and barrier health.',
              },
              {
                icon: <SpaOutlinedIcon sx={{ color: '#B76E79', fontSize: 28 }} />,
                title: 'Clean, Cruelty-Free Actives',
                desc: 'White truffle, ceramides, and peptides tested safe for delicate sensitive skin.',
              },
            ].map((pillar, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ p: 1.2, bgcolor: '#FAF8F5', borderRadius: 2 }}>{pillar.icon}</Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 0.3 }}>
                      {pillar.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                      {pillar.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 3. Shop by Category Showcase */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: '#FAF8F5' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 650, mx: 'auto' }}>
            <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
              Explore The Catalog
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
              Curated Beauty Categories
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {CATEGORY_CARDS.map((cat) => (
              <Grid item xs={12} sm={6} md={3} key={cat.title}>
                <Card
                  component={Link}
                  to={`/shop?cat=${cat.cat}`}
                  sx={{
                    textDecoration: 'none',
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 36px rgba(183, 110, 121, 0.18)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', height: 280 }}>
                    <CardMedia
                      component="img"
                      image={cat.image}
                      alt={cat.title}
                      sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)',
                      }}
                    />
                    <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20, color: '#fff' }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: '"Cormorant Garamond", serif', fontSize: '1.45rem' }}>
                        {cat.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#eee', display: 'block', mt: 0.4 }}>
                        {cat.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. Trending Bestsellers Grid */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' }, mb: 5 }}>
            <Box>
              <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
                Most Coveted
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
                Trending Bestsellers
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/shop"
              endIcon={<ArrowForwardIcon />}
              sx={{ color: '#8C4852', fontWeight: 700, mt: { xs: 1.5, sm: 0 } }}
            >
              View All Products
            </Button>
          </Box>

          <Grid container spacing={3.5}>
            {bestsellers.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 5. Interactive AI Suite Banner */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: '#161616', color: '#ffffff' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.6, bgcolor: 'rgba(212, 163, 115, 0.15)', borderRadius: 20, mb: 2 }}>
                <AutoAwesomeIcon sx={{ color: '#D4A373', fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: '#D4A373', fontWeight: 700, letterSpacing: '0.15em' }}>
                  AI-Powered Precision Beauty
                </Typography>
              </Box>

              <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3.5rem' }, fontWeight: 700, color: '#fff', mb: 2.5, lineHeight: 1.15 }}>
                Take The Guesswork Out Of Your Complexion
              </Typography>

              <Typography variant="body1" sx={{ color: '#bbb', lineHeight: 1.8, mb: 4, maxWidth: 560 }}>
                Our 60-second diagnostic analyzes your undertone, coverage preference, and skin barrier health to prescribe an exact foundation match and custom AM/PM skincare regimen.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  component={Link}
                  to="/quiz"
                  variant="contained"
                  sx={{
                    bgcolor: '#D4A373',
                    color: '#1a1a1a',
                    fontWeight: 700,
                    px: 3.5,
                    py: 1.4,
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#c39263' },
                  }}
                >
                  Launch Beauty Quiz
                </Button>

                <Button
                  component={Link}
                  to="/routine-builder"
                  variant="outlined"
                  sx={{
                    borderColor: '#D4A373',
                    color: '#D4A373',
                    fontWeight: 700,
                    px: 3.5,
                    py: 1.4,
                    borderRadius: 2,
                    '&:hover': { borderColor: '#fff', color: '#fff' },
                  }}
                >
                  Generate Skincare Routine
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(212, 163, 115, 0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h5" sx={{ color: '#D4A373', fontFamily: '"Cormorant Garamond", serif', mb: 1.5, fontWeight: 700 }}>
                  24/7 Virtual Beauty Concierge
                </Typography>
                <Typography variant="body2" sx={{ color: '#ccc', lineHeight: 1.7, mb: 3 }}>
                  Need instant advice while shopping? Ask Mariyam AI about ingredient interactions, foundation matching, or wedding day skin prep.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setIsAdvisorOpen(true)}
                  startIcon={<AutoAwesomeIcon />}
                  sx={{
                    bgcolor: '#B76E79',
                    color: '#fff',
                    py: 1.3,
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#8C4852' },
                  }}
                >
                  Open Live Chat Advisor
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 6. Beauty Journal Teaser */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: '#FAF8F5' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
            <Box>
              <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
                Editorial Wisdom
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
                From The Beauty Journal
              </Typography>
            </Box>
            <Button component={Link} to="/journal" endIcon={<ArrowForwardIcon />} sx={{ color: '#8C4852', fontWeight: 700 }}>
              Read All Articles
            </Button>
          </Box>

          <Grid container spacing={4}>
            {INITIAL_ARTICLES.slice(0, 3).map((art) => (
              <Grid item xs={12} md={4} key={art.id}>
                <Card
                  component={Link}
                  to={`/journal/${art.slug}`}
                  sx={{
                    textDecoration: 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    bgcolor: '#ffffff',
                    transition: 'transform 0.25s ease',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  <CardMedia component="img" image={art.coverImage} alt={art.title} sx={{ height: 220, objectFit: 'cover' }} />
                  <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.08em' }}>
                      {art.category} · {art.readTime}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 700, my: 1, lineHeight: 1.3 }}>
                      {art.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, flex: 1 }}>
                      {art.excerpt}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
