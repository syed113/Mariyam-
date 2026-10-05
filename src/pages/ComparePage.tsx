import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Rating,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { formatCurrency } from '../utils/format';

export const ComparePage: React.FC = () => {
  const { compareList, toggleCompare, clearCompare, products, addToCart, beautyProfile } = useStore();

  const comparedProducts: Product[] = React.useMemo(() => {
    return products.filter((p) => compareList.includes(p.id));
  }, [products, compareList]);

  // If no items in compareList, recommend default products for demonstration
  const displayProducts = React.useMemo(() => {
    if (comparedProducts.length > 0) return comparedProducts;
    return products.slice(0, 3);
  }, [comparedProducts, products]);

  // AI Recommendation engine: pick the one that matches beautyProfile best
  const recommendedProduct = React.useMemo(() => {
    if (!displayProducts.length) return null;
    if (!beautyProfile) return displayProducts[0];

    const scored = displayProducts.map((p) => {
      let score = 0;
      if (beautyProfile.skinType && p.skinTypeCompatibility.includes(beautyProfile.skinType as any)) score += 3;
      if (beautyProfile.preferredStyle && p.finish && beautyProfile.preferredStyle.toLowerCase().includes(p.finish.toLowerCase())) score += 2;
      if (p.rating >= 4.8) score += 2;
      return { p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0].p;
  }, [displayProducts, beautyProfile]);

  return (
    <Box sx={{ bgcolor: '#FAF8F5', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              PRODUCT INTELLIGENCE MATRIX
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
              Side-by-Side Product Comparison
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
              Compare formulations, active botanicals, shade depths, and delivery eligibility side-by-side (Up to 4 items).
            </Typography>
          </Box>

          {comparedProducts.length > 0 && (
            <Button variant="outlined" onClick={clearCompare} sx={{ borderRadius: 2, fontWeight: 700 }}>
              Clear Comparison List
            </Button>
          )}
        </Box>

        {/* AI Recommendation Banner */}
        {recommendedProduct && (
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              bgcolor: '#FFF6F7',
              border: '1.5px solid rgba(183, 110, 121, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AutoAwesomeIcon sx={{ color: '#D4A373', fontSize: 32 }} />
              <Box>
                <Chip label="OUR AI RECOMMENDATION" size="small" sx={{ bgcolor: '#1a1a1a', color: '#D4A373', fontWeight: 700, mb: 0.5 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                  {recommendedProduct.name} is the top match for your profile
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Optimal harmony with {beautyProfile?.skinType || 'Combination'} skin, providing {recommendedProduct.finish || 'luminous'} wear with high-performance actives.
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(recommendedProduct, 1, recommendedProduct.shades?.[0])}
              startIcon={<ShoppingBagIcon />}
              sx={{ borderRadius: 2, fontWeight: 700 }}
            >
              Add Top Match · {formatCurrency(recommendedProduct.price)}
            </Button>
          </Paper>
        )}

        {/* Comparison Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ bgcolor: '#FAF8F5' }}>
              <TableRow>
                <TableCell sx={{ width: '22%', fontWeight: 700, color: '#8C4852' }}>Specification</TableCell>
                {displayProducts.map((p) => (
                  <TableCell key={p.id} sx={{ width: `${78 / displayProducts.length}%`, textAlign: 'center', verticalAlign: 'top', p: 2 }}>
                    <Box sx={{ position: 'relative' }}>
                      {compareList.includes(p.id) && (
                        <IconButton
                          size="small"
                          onClick={() => toggleCompare(p.id)}
                          sx={{ position: 'absolute', top: -8, right: -8, bgcolor: '#fff', border: '1px solid #ddd' }}
                        >
                          <CloseIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      )}
                      <Box component="img" src={p.images[0]} alt={p.name} sx={{ width: 100, height: 100, objectFit: 'contain', mx: 'auto', mb: 1 }} />
                      <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700, textTransform: 'uppercase' }}>
                        {p.brand}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3, my: 0.5 }}>
                        {p.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                        {formatCurrency(p.price)}
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => addToCart(p, 1, p.shades?.[0])}
                        startIcon={<ShoppingBagIcon sx={{ fontSize: 13 }} />}
                        sx={{ fontSize: '0.72rem', fontWeight: 700, borderRadius: 1.5, py: 0.6 }}
                      >
                        Add to Bag
                      </Button>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {/* MRP & Discount */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>MRP & Discount</TableCell>
                {displayProducts.map((p) => {
                  const disc = p.compareAtPrice ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100) : 0;
                  return (
                    <TableCell key={p.id} align="center">
                      {p.compareAtPrice ? `${formatCurrency(p.compareAtPrice)} (${disc}% OFF)` : 'Standard MRP'}
                    </TableCell>
                  );
                })}
              </TableRow>

              {/* Rating */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Rating & Customer Reviews</TableCell>
                {displayProducts.map((p) => (
                  <TableCell key={p.id} align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                      <Rating value={p.rating} precision={0.1} size="small" readOnly sx={{ color: '#D4A373' }} />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {p.rating} ({p.reviewCount})
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>

              {/* Finish & Coverage */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Finish & Coverage</TableCell>
                {displayProducts.map((p) => (
                  <TableCell key={p.id} align="center">
                    <Chip label={p.finish || 'Natural Satin'} size="small" sx={{ mr: 0.5, bgcolor: '#f0eae4', fontWeight: 600 }} />
                    <Chip label={p.coverage || 'Buildable'} size="small" sx={{ bgcolor: '#FAF8F5', fontWeight: 600 }} />
                  </TableCell>
                ))}
              </TableRow>

              {/* Skin Compatibility */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Skin Compatibility</TableCell>
                {displayProducts.map((p) => (
                  <TableCell key={p.id} align="center">
                    <Typography variant="caption" sx={{ color: '#444' }}>
                      {p.skinTypeCompatibility.join(', ')}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>

              {/* Key Ingredients */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Key Ingredients</TableCell>
                {displayProducts.map((p) => (
                  <TableCell key={p.id} align="center">
                    <Typography variant="caption" sx={{ color: '#555', fontStyle: 'italic' }}>
                      {p.keyIngredients.join(' · ')}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>

              {/* Size & Volume */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Size / Volume</TableCell>
                {displayProducts.map((p) => (
                  <TableCell key={p.id} align="center">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{p.sizeVolume || '30 ml'}</Typography>
                  </TableCell>
                ))}
              </TableRow>

              {/* Shade Range */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Shades Available</TableCell>
                {displayProducts.map((p) => (
                  <TableCell key={p.id} align="center">
                    {p.shades && p.shades.length > 0 ? (
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#8C4852' }}>
                        {p.shades.length} Complexion Shades
                      </Typography>
                    ) : (
                      <Typography variant="caption" sx={{ color: '#888' }}>Universal Tone</Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>

              {/* Authenticity & Returns */}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Authenticity & Returns</TableCell>
                {displayProducts.map((p) => (
                  <TableCell key={p.id} align="center">
                    <Typography variant="caption" sx={{ color: '#2E7D32', fontWeight: 600, display: 'block' }}>
                      ✓ 100% Certified Authentic
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#777' }}>
                      15-Day Unopened Return Guarantee
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button component={Link} to="/shop" variant="outlined" sx={{ borderRadius: 2, fontWeight: 700 }}>
            Browse More Products to Compare
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
