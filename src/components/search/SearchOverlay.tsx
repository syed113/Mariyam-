import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  InputBase,
  IconButton,
  Grid,
  Chip,
  Paper,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/format';

const TRENDING_SEARCHES = [
  'Foundation for medium warm skin',
  'Nude lipstick under ₹1000',
  'Bridal makeup kit',
  'Serum for dry skin',
  '24K Micro-Mist',
  'Transfer-proof red lipstick',
  'Ceramide barrier cream',
  'Vitamin C serum for glow',
];

const POPULAR_CATEGORIES = [
  { label: 'Foundation & Base', cat: 'Makeup', query: 'Foundation' },
  { label: 'Matte Lipsticks', cat: 'Makeup', query: 'Lipstick' },
  { label: 'Hydrating Serums', cat: 'Skincare', query: 'Serum' },
  { label: 'Luxury Fragrance', cat: 'Fragrance', query: 'Fragrance' },
  { label: 'Bridal Kits', cat: 'Bridal & Gifting', query: 'Bridal' },
  { label: 'Hair Repair Elixirs', cat: 'Haircare', query: 'Hair' },
];

const POPULAR_BRANDS = [
  'Mariyam Maquillage',
  'Charlotte Tilbury',
  'Dior',
  'Huda Beauty',
  'Kay Beauty',
  'Minimalist',
  'The Ordinary',
  'Laneige',
];

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, recentSearches, addRecentSearch, clearRecentSearches, addToCart } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Intelligent Natural Language search filter
  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];

    let maxPrice = Infinity;
    // Extract price constraints like "under 1000", "under ₹2000"
    const priceMatch = q.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
    if (priceMatch) {
      maxPrice = parseInt(priceMatch[1], 10);
    }

    return products
      .filter((p) => {
        // Price limit check if found
        if (p.price > maxPrice) return false;

        // Keywords check
        const textToSearch = `${p.name} ${p.brand} ${p.subcategory} ${p.category} ${p.description} ${p.shortDescription} ${(p.shades || []).map((s) => s.name).join(' ')} ${(p.concerns || []).join(' ')} ${(p.skinTypeCompatibility || []).join(' ')}`.toLowerCase();

        // Check if query words match
        const words = q
          .replace(/under\s*(?:₹|rs\.?|inr)?\s*\d+/gi, '')
          .split(/\s+/)
          .filter(Boolean);

        if (words.length === 0) return true;
        return words.every((word) => textToSearch.includes(word));
      })
      .slice(0, 6);
  }, [products, searchTerm]);

  const handleExecuteSearch = (queryToRun: string) => {
    const clean = queryToRun.trim();
    if (!clean) return;
    addRecentSearch(clean);
    setIsSearchOpen(false);

    // If query matches a category directly
    const matchingCat = ['Makeup', 'Skincare', 'Haircare', 'Fragrance'].find(
      (c) => c.toLowerCase() === clean.toLowerCase()
    );
    if (matchingCat) {
      navigate(`/shop?cat=${matchingCat}`);
      return;
    }

    // Natural language price redirect
    const priceMatch = clean.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
    if (priceMatch) {
      navigate(`/shop?search=${encodeURIComponent(clean)}`);
      return;
    }

    navigate(`/shop?search=${encodeURIComponent(clean)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleExecuteSearch(searchTerm);
    }
  };

  return (
    <Dialog
      open={isSearchOpen}
      onClose={() => setIsSearchOpen(false)}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3.5,
          overflow: 'hidden',
          p: 0,
          bgcolor: '#ffffff',
          boxShadow: '0 24px 70px rgba(0,0,0,0.18)',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Search Header Bar */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: { xs: 2, sm: 2.8 },
            bgcolor: '#FAF8F5',
            borderBottom: '1px solid rgba(183, 110, 121, 0.2)',
            gap: 1.5,
          }}
        >
          <SearchIcon sx={{ color: '#B76E79', fontSize: 28 }} />
          <InputBase
            autoFocus
            placeholder="Search by product, concern, shade, or prompt (e.g. 'Nude lipstick under ₹1000')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.15rem' },
              fontWeight: 500,
              color: '#1a1a1a',
            }}
          />
          {searchTerm && (
            <IconButton size="small" onClick={() => setSearchTerm('')} sx={{ color: '#888' }}>
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          )}
          <IconButton size="small" onClick={() => setIsSearchOpen(false)} sx={{ color: '#333' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content Body */}
        <Box sx={{ p: { xs: 2.5, sm: 3.5 }, maxHeight: '72vh', overflowY: 'auto' }}>
          {/* Live Search Results */}
          {searchTerm.trim().length > 0 ? (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                  Matching Products ({searchResults.length})
                </Typography>
                <Button
                  size="small"
                  onClick={() => handleExecuteSearch(searchTerm)}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                  sx={{ color: '#B76E79', fontWeight: 700, fontSize: '0.75rem' }}
                >
                  View All Results
                </Button>
              </Box>

              {searchResults.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography variant="h6" sx={{ color: '#666', mb: 1, fontWeight: 600 }}>
                    No exact products found for "{searchTerm}"
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
                    Try searching by ingredient (e.g. "Ceramide", "Peptide"), concern, or broader category.
                  </Typography>
                  <Button variant="outlined" onClick={() => setSearchTerm('Foundation')} sx={{ borderRadius: 2 }}>
                    Explore Foundations
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {searchResults.map((p) => (
                    <Grid item xs={12} sm={6} key={p.id}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 1.5,
                          borderRadius: 2,
                          bgcolor: '#FAF8F5',
                          border: '1px solid #eee',
                          transition: 'all 0.2s ease',
                          '&:hover': { bgcolor: '#fff', borderColor: '#B76E79', transform: 'translateY(-2px)' },
                        }}
                      >
                        <Box
                          component="div"
                          onClick={() => {
                            setIsSearchOpen(false);
                            navigate(`/product/${p.slug}`);
                          }}
                          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', flex: 1, minWidth: 0 }}
                        >
                          <Box component="img" src={p.images[0]} alt={p.name} sx={{ width: 52, height: 52, borderRadius: 1.5, objectFit: 'cover' }} />
                          <Box sx={{ minWidth: 0 }}>
                            <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.04em' }}>
                              {p.brand}
                            </Typography>
                            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '0.85rem' }}>
                              {p.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#B76E79', fontWeight: 700, fontSize: '0.82rem' }}>
                              {formatCurrency(p.price)}
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p, 1, p.shades?.[0]);
                          }}
                          sx={{ py: 0.6, px: 1.4, fontSize: '0.72rem', borderRadius: 1.5, fontWeight: 700, whiteSpace: 'nowrap' }}
                        >
                          Add
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              {/* Natural Language Starter Prompts */}
              <Box sx={{ p: 2, bgcolor: '#FFF6F7', borderRadius: 2.5, border: '1px solid rgba(183, 110, 121, 0.2)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AutoAwesomeIcon sx={{ color: '#B76E79', fontSize: 18 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#8C4852' }}>
                    Ask in Natural Language (Smart Search Engine)
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1.5 }}>
                  Our search understands skin tones, price limits, and occasions. Click any prompt to explore:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {TRENDING_SEARCHES.map((query, idx) => (
                    <Chip
                      key={idx}
                      label={query}
                      size="small"
                      onClick={() => handleExecuteSearch(query)}
                      icon={<SearchIcon sx={{ fontSize: '14px !important' }} />}
                      sx={{
                        bgcolor: '#ffffff',
                        border: '1px solid rgba(183, 110, 121, 0.25)',
                        color: '#1a1a1a',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'rgba(183, 110, 121, 0.12)' },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <HistoryIcon sx={{ color: '#888', fontSize: 18 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                        Recent Searches
                      </Typography>
                    </Box>
                    <Button size="small" onClick={clearRecentSearches} sx={{ color: '#888', fontSize: '0.72rem' }}>
                      Clear All
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {recentSearches.map((item, idx) => (
                      <Chip
                        key={idx}
                        label={item}
                        size="small"
                        onClick={() => handleExecuteSearch(item)}
                        sx={{
                          bgcolor: '#FAF8F5',
                          border: '1px solid #eee',
                          color: '#444',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: '#f0eae4' },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Popular Categories & Brands */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
                    <TrendingUpIcon sx={{ color: '#B76E79', fontSize: 18 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      Popular Categories
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {POPULAR_CATEGORIES.map((cat, i) => (
                      <Box
                        key={i}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate(`/shop?cat=${cat.cat}`);
                        }}
                        sx={{
                          py: 0.8,
                          px: 1.2,
                          borderRadius: 1.5,
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          '&:hover': { bgcolor: '#FAF8F5', color: '#B76E79' },
                        }}
                      >
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{cat.label}</Typography>
                        <ArrowForwardIcon sx={{ fontSize: 14, color: '#aaa' }} />
                      </Box>
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1.5 }}>
                    Featured Ateliers & Brands
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                    {POPULAR_BRANDS.map((brand, i) => (
                      <Chip
                        key={i}
                        label={brand}
                        size="small"
                        onClick={() => handleExecuteSearch(brand)}
                        sx={{
                          bgcolor: '#ffffff',
                          border: '1px solid #ddd',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
