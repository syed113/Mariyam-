import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Rating,
  Chip,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Product, ProductShade } from '../../types';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/format';
import { BrandLogo } from '../common/BrandLogo';

interface ProductCardProps {
  product: Product;
  showCompare?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showCompare = true }) => {
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, isInCompare, setQuickViewProduct, openShadeModal } = useStore();
  const [selectedShade, setSelectedShade] = useState<ProductShade | undefined>(
    product.shades && product.shades.length > 0 ? product.shades[0] : undefined
  );
  const [justAdded, setJustAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const compared = isInCompare(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, selectedShade);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleFindMatch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openShadeModal(product);
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        bgcolor: '#ffffff',
        border: compared ? '2px solid #B76E79' : '1px solid rgba(183, 110, 121, 0.16)',
        boxShadow: isHovered ? '0 12px 32px rgba(183, 110, 121, 0.14)' : '0 2px 10px rgba(0,0,0,0.03)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Badges */}
      <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 3, display: 'flex', flexDirection: 'column', gap: 0.6 }}>
        {product.isBestseller && (
          <Chip
            label="BESTSELLER"
            size="small"
            sx={{
              bgcolor: '#1a1a1a',
              color: '#D4A373',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              height: 20,
            }}
          />
        )}
        {product.isNew && (
          <Chip
            label="NEW ATELIER"
            size="small"
            sx={{
              bgcolor: '#B76E79',
              color: '#ffffff',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              height: 20,
            }}
          />
        )}
        {discountPercent > 0 && (
          <Chip
            label={`${discountPercent}% OFF`}
            size="small"
            sx={{
              bgcolor: '#E91E63',
              color: '#ffffff',
              fontSize: '0.62rem',
              fontWeight: 700,
              height: 20,
            }}
          />
        )}
      </Box>

      {/* Top Actions: Wishlist & Quick View */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <IconButton
          size="small"
          onClick={handleWishlist}
          aria-label="Wishlist"
          sx={{
            bgcolor: 'rgba(255,255,255,0.92)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            color: wishlisted ? '#E91E63' : '#777',
            '&:hover': { bgcolor: '#ffffff', color: '#E91E63' },
          }}
        >
          {wishlisted ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
        </IconButton>

        <Tooltip title="Quick View">
          <IconButton
            size="small"
            onClick={handleQuickView}
            aria-label="Quick View"
            sx={{
              bgcolor: 'rgba(255,255,255,0.92)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              color: '#555',
              opacity: { xs: 1, sm: isHovered ? 1 : 0 },
              transition: 'opacity 0.2s ease',
              '&:hover': { bgcolor: '#ffffff', color: '#B76E79' },
            }}
          >
            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Clickable Image Container */}
      {(() => {
        const displayImage = selectedShade?.image
          ? selectedShade.image
          : isHovered && product.lifestyleImage
          ? product.lifestyleImage
          : isHovered && product.images.length > 1
          ? product.images[1]
          : product.primaryImage || product.images[0];

        return (
          <Box
            component={Link}
            to={`/product/${product.slug}`}
            sx={{
              display: 'block',
              position: 'relative',
              paddingTop: '100%',
              bgcolor: '#FAF8F5',
              overflow: 'hidden',
              textDecoration: 'none',
            }}
          >
            <CardMedia
              component="img"
              image={displayImage}
              alt={product.name}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80';
              }}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                p: 2,
                transition: 'transform 0.5s ease',
                transform: isHovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />

            {/* Hover Quick Action Strip */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 1,
                bgcolor: 'rgba(255,255,255,0.94)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                transform: { xs: 'none', sm: isHovered ? 'translateY(0)' : 'translateY(100%)' },
                transition: 'transform 0.25s ease',
                borderTop: '1px solid rgba(183, 110, 121, 0.15)',
              }}
            >
              <Button
                size="small"
                onClick={handleQuickView}
                sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#1a1a1a', py: 0.3 }}
              >
                Quick View
              </Button>
              {product.shades && product.shades.length > 0 && (
                <Button
                  size="small"
                  onClick={handleFindMatch}
                  startIcon={<AutoAwesomeIcon sx={{ fontSize: 12, color: '#D4A373' }} />}
                  sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#8C4852', py: 0.3 }}
                >
                  Find Match
                </Button>
              )}
            </Box>
          </Box>
        );
      })()}

      {/* Card Content */}
      <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Brand & Department */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8, minHeight: 22 }}>
          <BrandLogo brandName={product.brand} height={16} />
          {product.brandType === 'Mariyam Signature' && (
            <Chip label="Signature" size="small" sx={{ bgcolor: 'rgba(212, 163, 115, 0.15)', color: '#8C4852', fontSize: '0.6rem', height: 16, fontWeight: 700 }} />
          )}
        </Box>

        {/* Product Title */}
        <Typography
          component={Link}
          to={`/product/${product.slug}`}
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: '#1a1a1a',
            textDecoration: 'none',
            fontSize: '0.88rem',
            lineHeight: 1.35,
            mb: 0.8,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.4rem',
            '&:hover': { color: '#B76E79' },
          }}
        >
          {product.name}
        </Typography>

        {/* Rating & Reviews */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 1 }}>
          <Rating value={product.rating} precision={0.1} size="small" readOnly sx={{ color: '#D4A373', fontSize: '0.9rem' }} />
          <Typography variant="caption" sx={{ color: '#666', fontSize: '0.74rem', fontWeight: 600 }}>
            {product.rating} ({product.reviewCount})
          </Typography>
        </Box>

        {/* Shade Swatch Dots */}
        {product.shades && product.shades.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.2, flexWrap: 'wrap' }}>
            {product.shades.slice(0, 5).map((sh) => (
              <Tooltip key={sh.id} title={`${sh.name} (${sh.undertone || 'balanced'})`}>
                <Box
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedShade(sh);
                  }}
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    bgcolor: sh.hexCode,
                    border: selectedShade?.id === sh.id ? '2px solid #1a1a1a' : '1px solid #ccc',
                    cursor: 'pointer',
                    transform: selectedShade?.id === sh.id ? 'scale(1.2)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                />
              </Tooltip>
            ))}
            {product.shades.length > 5 && (
              <Typography variant="caption" sx={{ color: '#888', fontSize: '0.68rem', ml: 0.2 }}>
                +{product.shades.length - 5}
              </Typography>
            )}
          </Box>
        )}

        {/* Price & MRP Row */}
        <Box sx={{ mt: 'auto', pt: 1, borderTop: '1px solid #f2ede8' }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a', fontVariantNumeric: 'tabular-nums', fontSize: '0.96rem' }}>
                {formatCurrency(product.price)}
              </Typography>
              {product.compareAtPrice && (
                <Typography variant="caption" sx={{ color: '#999', textDecoration: 'line-through' }}>
                  {formatCurrency(product.compareAtPrice)}
                </Typography>
              )}
            </Box>
            {product.inStock === false ? (
              <Chip label="Out of Stock" size="small" sx={{ bgcolor: '#eee', color: '#777', fontSize: '0.62rem', height: 18 }} />
            ) : (
              <Typography variant="caption" sx={{ color: '#2E7D32', fontWeight: 600, fontSize: '0.7rem' }}>
                In Stock
              </Typography>
            )}
          </Box>

          {/* Quick Add CTA */}
          <Button
            size="small"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAdd}
            disabled={product.inStock === false}
            startIcon={justAdded ? <CheckIcon sx={{ fontSize: 14 }} /> : <ShoppingBagIcon sx={{ fontSize: 14 }} />}
            sx={{
              py: 0.7,
              fontSize: '0.76rem',
              fontWeight: 700,
              borderRadius: 1.8,
              bgcolor: justAdded ? '#2E7D32' : undefined,
              '&:hover': { bgcolor: justAdded ? '#1B5E20' : undefined },
            }}
          >
            {justAdded ? 'Added to Bag' : 'Add to Bag'}
          </Button>

          {/* Bottom Secondary Affordance: Compare checkbox */}
          {showCompare && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.8, pt: 0.6 }}>
              <Box
                component="div"
                onClick={handleCompareClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  cursor: 'pointer',
                  color: compared ? '#B76E79' : '#777',
                  '&:hover': { color: '#B76E79' },
                }}
              >
                <CompareArrowsIcon sx={{ fontSize: 15 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                  {compared ? 'In Comparison' : 'Compare'}
                </Typography>
              </Box>

              {product.shades && product.shades.length > 0 && (
                <Typography
                  component="span"
                  onClick={handleFindMatch}
                  sx={{
                    fontSize: '0.7rem',
                    color: '#8C4852',
                    cursor: 'pointer',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    '&:hover': { color: '#B76E79' },
                  }}
                >
                  Match Shade
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
