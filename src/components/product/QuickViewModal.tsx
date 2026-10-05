import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Grid,
  Rating,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useStore } from '../../context/StoreContext';
import { ProductShade } from '../../types';
import { formatCurrency } from '../../utils/format';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted, openShadeModal } = useStore();

  const product = quickViewProduct;
  const [selectedImage, setSelectedImage] = useState<string>(product ? product.images[0] : '');
  const [selectedShade, setSelectedShade] = useState<ProductShade | undefined>(
    product && product.shades && product.shades.length > 0 ? product.shades[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Sync image and shade when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedShade(product.shades && product.shades.length > 0 ? product.shades[0] : undefined);
      setQuantity(1);
      setJustAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedShade);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <Dialog
      open={Boolean(quickViewProduct)}
      onClose={() => setQuickViewProduct(null)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3.5,
          overflow: 'hidden',
          p: 0,
          bgcolor: '#ffffff',
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <IconButton
          onClick={() => setQuickViewProduct(null)}
          sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10, bgcolor: 'rgba(255,255,255,0.85)' }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container>
          {/* Left Image View */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, bgcolor: '#FAF8F5', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Box
                component="img"
                src={selectedImage || product.images[0]}
                alt={product.name}
                sx={{
                  width: '100%',
                  maxHeight: 380,
                  objectFit: 'contain',
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              {product.images.length > 1 && (
                <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', maxWidth: '100%', py: 0.5 }}>
                  {product.images.map((img, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={img}
                      alt={`Thumbnail ${i}`}
                      onClick={() => setSelectedImage(img)}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 1.5,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: selectedImage === img ? '2px solid #B76E79' : '1px solid #ddd',
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Grid>

          {/* Right Product Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {product.brand} · {product.department}
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', my: 0.5, lineHeight: 1.3 }}>
                {product.name}
              </Typography>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Rating value={product.rating} precision={0.1} size="small" readOnly sx={{ color: '#D4A373' }} />
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {product.rating} ({product.reviewCount} reviews)
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.2, mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', fontVariantNumeric: 'tabular-nums' }}>
                  {formatCurrency(product.price)}
                </Typography>
                {product.compareAtPrice && (
                  <Typography variant="body2" sx={{ color: '#888', textDecoration: 'line-through' }}>
                    {formatCurrency(product.compareAtPrice)}
                  </Typography>
                )}
                {discountPercent > 0 && (
                  <Chip label={`${discountPercent}% OFF`} size="small" sx={{ bgcolor: '#E91E63', color: '#fff', fontWeight: 700, fontSize: '0.68rem', height: 20 }} />
                )}
              </Box>

              <Typography variant="body2" sx={{ color: '#555', mb: 2.5, lineHeight: 1.6, fontSize: '0.86rem' }}>
                {product.shortDescription}
              </Typography>

              {/* Shades */}
              {product.shades && product.shades.length > 0 && (
                <Box sx={{ mb: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      Shade: <span style={{ color: '#B76E79' }}>{selectedShade?.name}</span>
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => {
                        setQuickViewProduct(null);
                        openShadeModal(product);
                      }}
                      startIcon={<AutoAwesomeIcon sx={{ fontSize: 13, color: '#D4A373' }} />}
                      sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#8C4852', p: 0 }}
                    >
                      Find My Match
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {product.shades.map((sh) => (
                      <Box
                        key={sh.id}
                        onClick={() => setSelectedShade(sh)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.6,
                          px: 1,
                          py: 0.5,
                          borderRadius: 1.5,
                          border: selectedShade?.id === sh.id ? '2px solid #1a1a1a' : '1px solid #ddd',
                          bgcolor: selectedShade?.id === sh.id ? 'rgba(183, 110, 121, 0.08)' : '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: sh.hexCode, border: '1px solid #ccc' }} />
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{sh.name}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 1.5 }} />

              {/* Stepper and Add to Bag */}
              <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto', pt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: 2, px: 0.5 }}>
                  <Button size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ minWidth: 28, p: 0.5 }}>-</Button>
                  <Typography sx={{ px: 1.5, fontWeight: 700, fontSize: '0.85rem' }}>{quantity}</Typography>
                  <Button size="small" onClick={() => setQuantity(quantity + 1)} sx={{ minWidth: 28, p: 0.5 }}>+</Button>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddToCart}
                  startIcon={justAdded ? <CheckIcon /> : <ShoppingBagIcon />}
                  sx={{ borderRadius: 2, fontWeight: 700, fontSize: '0.82rem' }}
                >
                  {justAdded ? 'Added to Bag!' : `Add to Bag · ${formatCurrency(product.price * quantity)}`}
                </Button>
                <IconButton onClick={() => toggleWishlist(product.id)} sx={{ border: '1px solid #ddd', borderRadius: 2, color: wishlisted ? '#E91E63' : '#666' }}>
                  {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>

              <Box sx={{ mt: 1.5, textAlign: 'center' }}>
                <Typography
                  component={Link}
                  to={`/product/${product.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  sx={{ fontSize: '0.78rem', color: '#B76E79', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  View Full Product Details & Customer Reviews →
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
