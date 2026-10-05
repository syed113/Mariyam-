import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PORTFOLIO_LOOKS } from '../data/mockData';
import { LookCategory, PortfolioLook } from '../types';
import { LookDetailModal } from '../components/LookDetailModal';

const categories: LookCategory[] = ['All', 'Bridal', 'Editorial', 'Red Carpet', 'Natural Glow', 'Creative'];

export const PortfolioPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<LookCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLook, setActiveLook] = useState<PortfolioLook | null>(null);

  const filteredLooks = useMemo(() => {
    return PORTFOLIO_LOOKS.filter((look) => {
      const matchesCategory = selectedCategory === 'All' || look.category === selectedCategory;
      const matchesSearch =
        look.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        look.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        look.clientType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        look.productsUsed.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, minHeight: '85vh', bgcolor: '#FAF8F5' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 750, mx: 'auto' }}>
          <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
            Artistry Gallery
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.6rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 2 }}>
            The Lookbook Portfolio
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
            Explore high-fashion editorial spreads, international bridal transformations, and luminous natural glam. Click any look for an in-depth breakdown of techniques and hero products used.
          </Typography>
        </Box>

        {/* Filter & Search Bar */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={8}>
              <Tabs
                value={selectedCategory}
                onChange={(_, val) => setSelectedCategory(val)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTabs-indicator': { backgroundColor: '#B76E79', height: 3 },
                  '& .MuiTab-root': {
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#666',
                    '&.Mui-selected': { color: '#8C4852' },
                  },
                }}
              >
                {categories.map((cat) => (
                  <Tab key={cat} label={cat} value={cat} />
                ))}
              </Tabs>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by look, technique, or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#B76E79', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(183, 110, 121, 0.25)' },
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Results Counter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" sx={{ color: '#888', fontWeight: 600, letterSpacing: '0.05em' }}>
            Showing {filteredLooks.length} {filteredLooks.length === 1 ? 'creation' : 'creations'}
          </Typography>
        </Box>

        {/* Gallery Grid */}
        <Grid container spacing={4}>
          {filteredLooks.map((look) => (
            <Grid item xs={12} sm={6} md={4} key={look.id}>
              <Card
                onClick={() => setActiveLook(look)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(183, 110, 121, 0.2)',
                  },
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={look.imageUrl}
                    alt={look.title}
                    sx={{
                      height: 380,
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  />
                  <Chip
                    label={look.category}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      bgcolor: 'rgba(255, 255, 255, 0.95)',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      color: '#8C4852',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      bgcolor: 'rgba(0,0,0,0.65)',
                      color: '#fff',
                      px: 1.2,
                      py: 0.4,
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '0.72rem',
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 13 }} />
                    <span>{look.duration}</span>
                  </Box>
                </Box>

                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 600, letterSpacing: '0.1em' }}>
                    {look.clientType}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1.5, lineHeight: 1.25 }}>
                    {look.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6, mb: 2, flex: 1 }}>
                    {look.description}
                  </Typography>
                  <Box sx={{ pt: 1, borderTop: '1px solid #f0eae1' }}>
                    <Typography variant="caption" sx={{ color: '#888', fontStyle: 'italic', display: 'block' }}>
                      Key Technique: {look.keyTechnique}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredLooks.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid #e0e0e0' }}>
            <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
              No looks matched your criteria
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>
              Try searching with a different term or select &quot;All&quot; categories.
            </Typography>
          </Box>
        )}
      </Container>

      {/* Look Details Dialog */}
      <LookDetailModal look={activeLook} onClose={() => setActiveLook(null)} />
    </Box>
  );
};
