import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Rating,
  Chip,
  Tabs,
  Tab,
  Paper,
  Divider,
  Breadcrumbs,
  TextField,
  Alert,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useStore } from '../context/StoreContext';
import { ProductShade, UserReview } from '../types';
import { INITIAL_REVIEWS } from '../data/initialCatalog';
import { checkPincodeServiceability } from '../data/catalogData';
import { ProductCard } from '../components/product/ProductCard';
import { BrandLogo } from '../components/common/BrandLogo';
import { formatCurrency } from '../utils/format';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, addToCart, toggleWishlist, isWishlisted } = useStore();

  const product = useMemo(() => {
    return products.find((p) => p.slug === slug) || products[0];
  }, [products, slug]);

  const galleryImages = useMemo(() => {
    const list: string[] = [];
    if (product.primaryImage) list.push(product.primaryImage);
    if (product.images) {
      product.images.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    if (product.lifestyleImage && !list.includes(product.lifestyleImage)) {
      list.push(product.lifestyleImage);
    }
    if (product.swatchImage && !list.includes(product.swatchImage)) {
      list.push(product.swatchImage);
    }
    if (product.alternateViews) {
      product.alternateViews.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    return list.length > 0 ? list : ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'];
  }, [product]);

  const [selectedImage, setSelectedImage] = useState<string>(() => galleryImages[0]);
  const [selectedShade, setSelectedShade] = useState<ProductShade | undefined>(
    product.shades && product.shades.length > 0 ? product.shades[0] : undefined
  );

  React.useEffect(() => {
    if (selectedShade?.image) {
      setSelectedImage(selectedShade.image);
    } else if (galleryImages.length > 0 && !galleryImages.includes(selectedImage)) {
      setSelectedImage(galleryImages[0]);
    }
  }, [selectedShade, galleryImages]);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('560001');
  const [pincodeCheck, setPincodeCheck] = useState(() => checkPincodeServiceability('560001'));

  // Review submission state
  const [reviews, setReviews] = useState<UserReview[]>(() => {
    return INITIAL_REVIEWS.filter((r) => r.productId === product.id);
  });
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState<number | null>(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedShade);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newRev: UserReview = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: newReviewAuthor,
      rating: newReviewRating || 5,
      date: 'Just now',
      title: newReviewTitle || 'Great product!',
      comment: newReviewComment,
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    setReviews([newRev, ...reviews]);
    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  const relatedProducts = useMemo(() => {
    return products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  }, [products, product]);

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" sx={{ color: '#aaa' }} />}
          sx={{ mb: 3 }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: '#666', fontSize: '0.85rem' }}>
            Home
          </Link>
          <Link to="/shop" style={{ textDecoration: 'none', color: '#666', fontSize: '0.85rem' }}>
            Shop
          </Link>
          <Link
            to={`/shop?cat=${product.category}`}
            style={{ textDecoration: 'none', color: '#666', fontSize: '0.85rem' }}
          >
            {product.category}
          </Link>
          <Typography sx={{ color: '#1a1a1a', fontWeight: 600, fontSize: '0.85rem' }}>
            {product.name}
          </Typography>
        </Breadcrumbs>

        {/* Product Purchase Section */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          {/* Gallery Col */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 2 }}>
              {/* Thumbnails */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', sm: 'column' },
                  gap: 1.5,
                  overflowX: 'auto',
                }}
              >
                {galleryImages.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    alt={`Thumbnail ${i}`}
                    onClick={() => setSelectedImage(img)}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80';
                    }}
                    sx={{
                      width: { xs: 60, sm: 80 },
                      height: { xs: 60, sm: 80 },
                      objectFit: 'cover',
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: selectedImage === img ? '2px solid #B76E79' : '1px solid #ddd',
                      opacity: selectedImage === img ? 1 : 0.7,
                      transition: 'all 0.2s ease',
                      '&:hover': { opacity: 1 },
                    }}
                  />
                ))}
              </Box>

              {/* Main Image */}
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  borderRadius: 3,
                  overflow: 'hidden',
                  bgcolor: '#FAF8F5',
                  border: '1px solid rgba(183, 110, 121, 0.15)',
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src={selectedImage || galleryImages[0]}
                  alt={product.name}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';
                  }}
                  sx={{
                    width: '100%',
                    height: { xs: 350, sm: 520 },
                    objectFit: 'contain',
                    p: 2,
                    display: 'block',
                    transition: 'all 0.3s ease',
                  }}
                />
                {discountPercent > 0 && (
                  <Chip
                    label={`${discountPercent}% OFF`}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: '#E91E63',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  />
                )}
                {product.brandType === 'Mariyam Signature' && (
                  <Chip
                    label="ATELIER EXCLUSIVE"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: '#1a1a1a',
                      color: '#D4A373',
                      fontWeight: 700,
                      fontSize: '0.68rem',
                    }}
                  />
                )}
              </Paper>
            </Box>
          </Grid>

          {/* Sticky Purchase Details Col */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <BrandLogo brandName={product.brand} height={22} />
                <Typography variant="caption" sx={{ color: '#888', fontWeight: 600, letterSpacing: '0.05em' }}>
                  {product.category} &bull; {product.subcategory}
                </Typography>
              </Box>

              <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 1.5, fontSize: { xs: '1.8rem', md: '2.4rem' }, lineHeight: 1.2 }}>
                {product.name}
              </Typography>

              {/* Ratings & reviews count */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Rating value={product.rating} precision={0.1} readOnly sx={{ color: '#D4A373' }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                  {product.rating}
                </Typography>
                <Typography variant="caption" sx={{ color: '#777' }}>
                  ({product.reviewCount} customer reviews)
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', fontVariantNumeric: 'tabular-nums' }}>
                  {formatCurrency(product.price)}
                </Typography>
                {product.compareAtPrice && (
                  <Typography variant="h6" sx={{ color: '#888', textDecoration: 'line-through' }}>
                    {formatCurrency(product.compareAtPrice)}
                  </Typography>
                )}
              </Box>

              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, mb: 3 }}>
                {product.shortDescription}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              {/* Shade Selector */}
              {product.shades && product.shades.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Selected Shade: <span style={{ color: '#B76E79' }}>{selectedShade?.name}</span>
                    </Typography>
                    {selectedShade?.undertone && (
                      <Typography variant="caption" sx={{ color: '#777', textTransform: 'capitalize' }}>
                        {selectedShade.undertone} undertone
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
                    {product.shades.map((sh) => (
                      <Box
                        key={sh.id}
                        onClick={() => setSelectedShade(sh)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.8,
                          px: 1.5,
                          py: 0.8,
                          borderRadius: 2,
                          border: selectedShade?.id === sh.id ? '2px solid #1a1a1a' : '1px solid #ddd',
                          bgcolor: selectedShade?.id === sh.id ? 'rgba(183, 110, 121, 0.08)' : '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          '&:hover': { borderColor: '#B76E79' },
                        }}
                      >
                        <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: sh.hexCode, border: '1px solid #bbb', flexShrink: 0 }} />
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>{sh.name}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Quantity and Actions */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                {/* Stepper */}
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: 2, px: 1 }}>
                  <Button
                    size="small"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    sx={{ minWidth: 32, p: 0.5, color: '#333' }}
                  >
                    -
                  </Button>
                  <Typography sx={{ px: 2, fontWeight: 700 }}>{quantity}</Typography>
                  <Button
                    size="small"
                    onClick={() => setQuantity(quantity + 1)}
                    sx={{ minWidth: 32, p: 0.5, color: '#333' }}
                  >
                    +
                  </Button>
                </Box>

                {/* Add to Bag */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleAddToCart}
                  startIcon={justAdded ? <CheckIcon /> : <ShoppingBagIcon />}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    bgcolor: justAdded ? '#2E7D32' : undefined,
                    '&:hover': { bgcolor: justAdded ? '#1B5E20' : undefined },
                  }}
                >
                  {justAdded ? 'Added to Bag!' : `Add to Bag · ${formatCurrency(product.price * quantity)}`}
                </Button>

                {/* Wishlist */}
                <IconButton
                  onClick={() => toggleWishlist(product.id)}
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    px: 1.5,
                    color: wishlisted ? '#E91E63' : '#666',
                  }}
                >
                  {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>

              {/* Stock and Shipping Guarantees */}
              <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #f0eae4', display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShippingOutlinedIcon sx={{ color: '#B76E79', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#444' }}>
                    <strong>Complimentary Express Shipping</strong> on orders over ₹999.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VerifiedUserOutlinedIcon sx={{ color: '#B76E79', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#444' }}>
                    <strong>100% Guaranteed Authentic</strong> — Direct from {product.brand} authorized supply.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SpaOutlinedIcon sx={{ color: '#B76E79', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#444' }}>
                    <strong>Dermatologically Approved</strong> for sensitive and South Asian skin types.
                  </Typography>
                </Box>
              </Box>

              {/* Delivery Pincode Checker */}
              <Box sx={{ mt: 2, p: 2, bgcolor: '#FAF8F5', borderRadius: 2, border: '1px solid #ece4dc' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', mb: 1 }}>
                  Check Pincode Delivery & COD Availability
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    placeholder="Enter 6-digit Pincode (e.g. 560001, 462001)"
                    sx={{ flex: 1, bgcolor: '#fff', '& .MuiInputBase-input': { fontSize: '0.82rem', py: 0.8 } }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setPincodeCheck(checkPincodeServiceability(pincodeInput))}
                    sx={{ px: 2, fontWeight: 700, fontSize: '0.75rem', borderColor: '#B76E79', color: '#B76E79' }}
                  >
                    Check
                  </Button>
                </Box>
                {pincodeCheck && (
                  <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                    <Typography variant="caption" sx={{ color: pincodeCheck.serviceable ? '#2E7D32' : '#D32F2F', fontWeight: 600 }}>
                      {pincodeCheck.serviceable
                        ? `✓ Express delivery to ${pincodeCheck.city || 'your area'} (${pincodeCheck.state}) in ${pincodeCheck.estimatedDays} business day${pincodeCheck.estimatedDays > 1 ? 's' : ''}`
                        : '✕ Currently not serviceable for standard express delivery.'}
                    </Typography>
                    {pincodeCheck.serviceable && (
                      <Typography variant="caption" sx={{ color: '#666', fontSize: '0.72rem' }}>
                        {pincodeCheck.codAvailable ? '• Cash on Delivery (COD) Available' : '• Online Prepaid Only'} · {pincodeCheck.isExpressAvailable ? '• Next-Day Hub Express Eligible' : '• Standard Insured Dispatch'}
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Product In-Depth Tabs */}
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, mb: 10, bgcolor: '#ffffff', border: '1px solid rgba(183, 110, 121, 0.15)' }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            sx={{
              borderBottom: '1px solid #eee',
              mb: 4,
              '& .MuiTabs-indicator': { bgcolor: '#B76E79', height: 3 },
              '& .MuiTab-root': { fontWeight: 700, fontSize: '0.9rem', color: '#666', '&.Mui-selected': { color: '#8C4852' } },
            }}
          >
            <Tab label="Description & Key Benefits" />
            <Tab label="Full Ingredients" />
            <Tab label="How to Apply" />
            <Tab label={`Verified Reviews (${reviews.length})`} />
          </Tabs>

          {/* Tab 0: Description & Benefits */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8, mb: 3 }}>
                {product.description}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2 }}>
                Key Performance Benefits
              </Typography>
              <Grid container spacing={2}>
                {product.benefits.map((b, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AutoAwesomeIcon sx={{ color: '#B76E79', fontSize: 18 }} />
                      <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                        {b}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Tab 1: Ingredients */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Clean Formulation Standards
              </Typography>
              <Typography variant="caption" sx={{ color: '#777', display: 'block', mb: 2 }}>
                Free of parabens, phthalates, synthetic micro-plastics, and harsh drying alcohols.
              </Typography>
              <Paper sx={{ p: 2.5, bgcolor: '#FAF8F5', borderRadius: 2, border: '1px dashed #d5c8be' }}>
                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8, fontStyle: 'italic' }}>
                  {product.ingredients}
                </Typography>
              </Paper>
            </Box>
          )}

          {/* Tab 2: How to Apply */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Mariyam’s Artistry Application Method
              </Typography>
              <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8, mb: 2 }}>
                {product.howToUse}
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#FFF6F7', borderRadius: 2, borderLeft: '4px solid #B76E79' }}>
                <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700, display: 'block', mb: 0.5 }}>
                  PRO ARTIST TIP:
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  Always hydrate the skin with a lightweight essence and wait 2 minutes before application. This ensures seamless pigment adherence and eliminates creasing.
                </Typography>
              </Box>
            </Box>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 3 && (
            <Box>
              {/* Existing Reviews */}
              <Box sx={{ mb: 5 }}>
                {reviews.map((rev) => (
                  <Box key={rev.id} sx={{ py: 2.5, borderBottom: '1px solid #f0eae4' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {rev.author}
                        </Typography>
                        {rev.verifiedPurchase && (
                          <Chip label="Verified Purchase" size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 700 }} />
                        )}
                      </Box>
                      <Typography variant="caption" sx={{ color: '#888' }}>
                        {rev.date}
                      </Typography>
                    </Box>
                    <Rating value={rev.rating} size="small" readOnly sx={{ color: '#D4A373', mb: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 0.5 }}>
                      {rev.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6 }}>
                      {rev.comment}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Add a review form */}
              <Box component="form" onSubmit={handleReviewSubmit} sx={{ p: 3, bgcolor: '#FAF8F5', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                  Leave A Verified Review
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 2.5 }}>
                  Share your experience with finish, longevity, and skin compatibility.
                </Typography>

                {reviewSubmitted && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Thank you! Your verified review has been posted.
                  </Alert>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Your Rating:</Typography>
                  <Rating
                    value={newReviewRating}
                    onChange={(_, val) => setNewReviewRating(val)}
                    sx={{ color: '#D4A373' }}
                  />
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Your Name"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Headline Summary"
                      placeholder="e.g. Flawless all-day finish!"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Your Detailed Review"
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      required
                    />
                  </Grid>
                </Grid>

                <Button type="submit" variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }}>
                  Submit Review
                </Button>
              </Box>
            </Box>
          )}
        </Paper>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3 }}>
              Complete Your Glamour Routine
            </Typography>
            <Grid container spacing={3}>
              {relatedProducts.map((p) => (
                <Grid item xs={12} sm={6} md={4} key={p.id}>
                  <ProductCard product={p} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};
