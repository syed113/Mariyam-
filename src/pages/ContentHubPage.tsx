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
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { INITIAL_ARTICLES } from '../data/initialCatalog';
import { Article, Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/format';

const CATEGORIES = ['All', 'Skincare Science', 'Makeup Tutorials', 'Bridal Secrets', 'Indian Skin Tones', 'Haircare Rituals'];

export const ContentHubPage: React.FC = () => {
  const { products, addToCart } = useStore();
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const filteredArticles = useMemo(() => {
    if (selectedCat === 'All') return INITIAL_ARTICLES;
    return INITIAL_ARTICLES.filter((a) => a.category === selectedCat);
  }, [selectedCat]);

  const recommendedProducts: Product[] = useMemo(() => {
    if (!activeArticle) return [];
    return products.filter((p) => activeArticle.recommendedProductIds.includes(p.id));
  }, [activeArticle, products]);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 750, mx: 'auto' }}>
          <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
            The Beauty Journal
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.6rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 2 }}>
            Masterclass Wisdom & Clean Science
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
            Curated techniques, ingredient chemistry, and pro secrets from Mariyam’s atelier. Read expert guides and discover the products that make them possible.
          </Typography>
        </Box>

        {/* Categories Bar */}
        <Box sx={{ mb: 6, borderBottom: '1px solid rgba(183, 110, 121, 0.18)' }}>
          <Tabs
            value={selectedCat}
            onChange={(_, val) => setSelectedCat(val)}
            centered
            sx={{
              '& .MuiTabs-indicator': { bgcolor: '#B76E79', height: 3 },
              '& .MuiTab-root': { fontWeight: 700, fontSize: '0.9rem', color: '#666', '&.Mui-selected': { color: '#8C4852' } },
            }}
          >
            {CATEGORIES.map((c) => (
              <Tab key={c} label={c} value={c} />
            ))}
          </Tabs>
        </Box>

        {/* Articles Grid */}
        <Grid container spacing={4}>
          {filteredArticles.map((art) => (
            <Grid item xs={12} md={4} key={art.id}>
              <Card
                onClick={() => setActiveArticle(art)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  bgcolor: '#ffffff',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 36px rgba(183, 110, 121, 0.18)',
                  },
                }}
              >
                <CardMedia component="img" image={art.coverImage} alt={art.title} sx={{ height: 260, objectFit: 'cover' }} />
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Chip label={art.category} size="small" sx={{ bgcolor: 'rgba(183, 110, 121, 0.12)', color: '#8C4852', fontWeight: 700 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#777', fontSize: '0.75rem' }}>
                      <AccessTimeIcon sx={{ fontSize: 14 }} />
                      <span>{art.readTime}</span>
                    </Box>
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1.5, lineHeight: 1.3 }}>
                    {art.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6, flex: 1, mb: 2 }}>
                    {art.excerpt}
                  </Typography>

                  <Box sx={{ pt: 1.5, borderTop: '1px solid #f0eae4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#888' }}>
                      By {art.author}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#B76E79', fontWeight: 700 }}>
                      Read Article →
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Article Reader Modal */}
        <Dialog
          open={Boolean(activeArticle)}
          onClose={() => setActiveArticle(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { borderRadius: 3, bgcolor: '#FAF8F5' } }}
        >
          {activeArticle && (
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={() => setActiveArticle(null)}
                sx={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  zIndex: 10,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' },
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box component="img" src={activeArticle.coverImage} alt={activeArticle.title} sx={{ width: '100%', height: 320, objectFit: 'cover' }} />

              <DialogContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 2 }}>
                  <Chip label={activeArticle.category} sx={{ bgcolor: '#B76E79', color: '#fff', fontWeight: 700 }} />
                  <Typography variant="caption" sx={{ color: '#777' }}>
                    {activeArticle.date} · {activeArticle.readTime}
                  </Typography>
                </Box>

                <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3 }}>
                  {activeArticle.title}
                </Typography>

                <Box sx={{ mb: 4 }}>
                  {activeArticle.content.map((para, i) => (
                    <Typography key={i} variant="body1" sx={{ color: '#444', lineHeight: 1.85, mb: 2.5, fontSize: '1.02rem' }}>
                      {para}
                    </Typography>
                  ))}
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Featured Products from Article */}
                {recommendedProducts.length > 0 && (
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2 }}>
                      Products Mentioned in This Guide
                    </Typography>
                    <Grid container spacing={2}>
                      {recommendedProducts.map((p) => (
                        <Grid item xs={12} sm={6} key={p.id}>
                          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box component="img" src={p.images[0]} alt={p.name} sx={{ width: 50, height: 50, borderRadius: 1.5, objectFit: 'cover' }} />
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{p.name}</Typography>
                                <Typography variant="caption" sx={{ color: '#B76E79', fontWeight: 700 }}>{formatCurrency(p.price)}</Typography>
                              </Box>
                            </Box>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => addToCart(p, 1, p.shades?.[0])}
                              startIcon={<ShoppingBagIcon sx={{ fontSize: 14 }} />}
                              sx={{ fontSize: '0.72rem', fontWeight: 700 }}
                            >
                              Add
                            </Button>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </DialogContent>
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};
