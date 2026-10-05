import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { formatCurrency } from '../utils/format';

interface BridalEvent {
  id: string;
  name: string;
  subtitle: string;
  vibe: string;
}

const BRIDAL_EVENTS: BridalEvent[] = [
  { id: 'engagement', name: 'Engagement / Roka', subtitle: 'Luminous pastel glam', vibe: 'Romantic Dewy' },
  { id: 'haldi', name: 'Haldi Ceremony', subtitle: 'Sweat-resistant sun-drenched glow', vibe: 'Fresh Sunlit' },
  { id: 'mehendi-sangeet', name: 'Mehendi & Sangeet', subtitle: '14-Hour dance-proof high definition', vibe: 'Bold Festive Drama' },
  { id: 'wedding', name: 'Main Wedding Ceremony', subtitle: 'Royal heritage camera-flash perfection', vibe: 'Traditional Royal Bride' },
  { id: 'reception', name: 'Reception Gala', subtitle: 'Editorial red-carpet cocktail radiance', vibe: 'Hollywood Modern Glam' },
  { id: 'guest', name: 'Wedding Guest / Bridesmaid', subtitle: 'Effortless photo-ready chic', vibe: 'Chic Sophistication' },
];

export const BridalStudioPage: React.FC = () => {
  const { products, addToCart } = useStore();
  const [selectedEvent, setSelectedEvent] = useState('wedding');
  const [skinType, setSkinType] = useState('Combination');
  const [makeupStyle, setMakeupStyle] = useState('Royal Heritage Glam');
  const [budgetTier, setBudgetTier] = useState<'Under ₹5,000' | '₹5,000 – ₹15,000' | 'Luxury Royal (₹15,000+)'>('₹5,000 – ₹15,000');
  const [bundleAdded, setBundleAdded] = useState(false);

  // Selected event object
  const currentEvent = useMemo(() => {
    return BRIDAL_EVENTS.find((e) => e.id === selectedEvent) || BRIDAL_EVENTS[3];
  }, [selectedEvent]);

  // Curate products for bridal kit
  const bridalKitProducts: Product[] = useMemo(() => {
    const fnd = products.find((p) => p.subcategory === 'Foundation' || p.id === 'mm-prod-1') || products[0];
    const lip = products.find((p) => p.subcategory === 'Lipstick' || p.id === 'mm-prod-2') || products[1];
    const mist = products.find((p) => p.subcategory === 'Setting Spray' || p.id === 'mm-prod-3') || products[2];
    const high = products.find((p) => p.subcategory === 'Highlighter' || p.id === 'mm-prod-4') || products[3];
    const serum = products.find((p) => p.department === 'Skincare' || p.id === 'mm-prod-5') || products[4];

    return [fnd, lip, mist, high, serum];
  }, [products]);

  const kitSubtotal = bridalKitProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = Math.round(kitSubtotal * 0.18); // 18% bridal bundle discount
  const kitFinalTotal = kitSubtotal - bundleDiscount;

  const handleAddEntireKit = () => {
    bridalKitProducts.forEach((p) => {
      addToCart(p, 1, p.shades?.[0]);
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2500);
  };

  return (
    <Box sx={{ bgcolor: '#FAF8F5', minHeight: '100vh', pb: 12 }}>
      {/* Bridal Hero Banner */}
      <Box
        sx={{
          bgcolor: '#161616',
          color: '#FAF8F5',
          py: { xs: 8, md: 11 },
          position: 'relative',
          borderBottom: '1px solid rgba(212, 163, 115, 0.3)',
          backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(183, 110, 121, 0.25) 0%, transparent 60%)',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: '14px !important', color: '#D4A373' }} />}
                label="MARIYAM MAQUILLAGE BRIDAL ATELIER"
                sx={{
                  bgcolor: 'rgba(212, 163, 115, 0.15)',
                  color: '#D4A373',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  mb: 2,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: { xs: '2.5rem', sm: '3.6rem', md: '4.2rem' },
                  fontWeight: 600,
                  lineHeight: 1.1,
                  mb: 2,
                }}
              >
                The Royal Bridal Beauty Studio
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#D4A373',
                  fontWeight: 400,
                  fontSize: { xs: '1.05rem', md: '1.25rem' },
                  lineHeight: 1.6,
                  maxWidth: 600,
                  mb: 3,
                }}
              >
                Curated camera-flash-tested cosmetics, sweat-proof setting mists, and 6-week skin barrier protocols designed for the modern South Asian bride.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Typography variant="caption" sx={{ color: '#bbb', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <CheckCircleOutlineIcon sx={{ color: '#D4A373', fontSize: 16 }} />
                  Zero Flashback Formulations
                </Typography>
                <Typography variant="caption" sx={{ color: '#bbb', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <CheckCircleOutlineIcon sx={{ color: '#D4A373', fontSize: 16 }} />
                  14-Hour Humidity & Tears Resistance
                </Typography>
                <Typography variant="caption" sx={{ color: '#bbb', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <CheckCircleOutlineIcon sx={{ color: '#D4A373', fontSize: 16 }} />
                  18% Complete Bridal Kit Savings
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper
                sx={{
                  p: 3.5,
                  borderRadius: 3.5,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(212, 163, 115, 0.3)',
                  color: '#fff',
                }}
              >
                <Typography variant="overline" sx={{ color: '#D4A373', letterSpacing: '0.15em', fontWeight: 700 }}>
                  CONSULTATION PREVIEW
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, my: 1 }}>
                  Generate Your Bespoke Bridal Plan
                </Typography>
                <Typography variant="body2" sx={{ color: '#ccc', mb: 2.5, lineHeight: 1.6 }}>
                  Choose your ceremony, skin type, and makeup vibe below to receive tailored product kits, shade harmonies, and pre-wedding timeline advice.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    const el = document.getElementById('bridal-planner');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  sx={{
                    bgcolor: '#D4A373',
                    color: '#1a1a1a',
                    fontWeight: 700,
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#c59362' },
                  }}
                >
                  Configure My Bridal Plan
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Interactive Studio */}
      <Container maxWidth="xl" sx={{ mt: 6 }} id="bridal-planner">
        {/* Event Selection */}
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          STEP 1: SELECT YOUR WEDDING OCCASION
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 3 }}>
          Which Ceremony Are You Prepping For?
        </Typography>

        <Grid container spacing={2} sx={{ mb: 6 }}>
          {BRIDAL_EVENTS.map((evt) => {
            const isSelected = selectedEvent === evt.id;
            return (
              <Grid item xs={12} sm={6} md={4} key={evt.id}>
                <Paper
                  onClick={() => setSelectedEvent(evt.id)}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    cursor: 'pointer',
                    bgcolor: isSelected ? '#ffffff' : '#fff',
                    border: isSelected ? '2px solid #B76E79' : '1px solid #e8e2dc',
                    boxShadow: isSelected ? '0 8px 24px rgba(183, 110, 121, 0.15)' : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: '#B76E79', transform: 'translateY(-2px)' },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isSelected ? '#B76E79' : '#1a1a1a' }}>
                      {evt.name}
                    </Typography>
                    {isSelected && <CheckCircleOutlineIcon sx={{ color: '#B76E79' }} />}
                  </Box>
                  <Typography variant="body2" sx={{ color: '#555', mb: 1.5 }}>
                    {evt.subtitle}
                  </Typography>
                  <Chip label={evt.vibe} size="small" sx={{ bgcolor: 'rgba(183, 110, 121, 0.08)', color: '#8C4852', fontWeight: 600, fontSize: '0.7rem' }} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Step 2: Skin Type, Makeup Style & Budget Configuration */}
        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3.5, bgcolor: '#ffffff', border: '1px solid #ece4dc', mb: 6 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            STEP 2: CUSTOMIZE YOUR BRIDAL PROFILE
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, mb: 3 }}>
            Skin Chemistry & Aesthetic Preference
          </Typography>

          <Grid container spacing={4}>
            {/* Skin Type */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                Skin Type
              </Typography>
              <RadioGroup value={skinType} onChange={(e) => setSkinType(e.target.value)}>
                {['Dry / Dehydrated', 'Combination T-Zone', 'Oily / Humid Prone', 'Delicate Sensitive'].map((st) => (
                  <FormControlLabel
                    key={st}
                    value={st}
                    control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                    label={<Typography sx={{ fontSize: '0.88rem' }}>{st}</Typography>}
                  />
                ))}
              </RadioGroup>
            </Grid>

            {/* Makeup Style */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                Preferred Bridal Glam Style
              </Typography>
              <RadioGroup value={makeupStyle} onChange={(e) => setMakeupStyle(e.target.value)}>
                {['Royal Heritage Glam', 'Glass Dewy Radiance', 'Velvet Suede Red Lip', 'Modern French Minimalist'].map((ms) => (
                  <FormControlLabel
                    key={ms}
                    value={ms}
                    control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                    label={<Typography sx={{ fontSize: '0.88rem' }}>{ms}</Typography>}
                  />
                ))}
              </RadioGroup>
            </Grid>

            {/* Budget Tier */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                Bridal Kit Budget Tier
              </Typography>
              <RadioGroup value={budgetTier} onChange={(e) => setBudgetTier(e.target.value as any)}>
                {[
                  { tier: 'Under ₹5,000', note: 'Essential bridal touch-up & complexion kit' },
                  { tier: '₹5,000 – ₹15,000', note: 'Complete 5-piece royal couture trousseau' },
                  { tier: 'Luxury Royal (₹15,000+)', note: 'Masterclass collection + prestige skincare protocol' },
                ].map((item) => (
                  <FormControlLabel
                    key={item.tier}
                    value={item.tier}
                    control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                    label={
                      <Box>
                        <Typography sx={{ fontSize: '0.88rem', fontWeight: 600 }}>{item.tier}</Typography>
                        <Typography variant="caption" sx={{ color: '#777' }}>{item.note}</Typography>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
        </Paper>

        {/* Step 3: Generated Bridal Plan */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Chip label="BESPOKE BRIDAL PLAN" size="small" sx={{ bgcolor: '#1a1a1a', color: '#D4A373', fontWeight: 700, mb: 0.5 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                Your {currentEvent.name} Beauty Suite
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Formulated for {skinType} skin with a {makeupStyle} finish.
              </Typography>
            </Box>

            {/* Bundle Buy CTA */}
            <Paper sx={{ p: 2, borderRadius: 2.5, bgcolor: '#ffffff', border: '1px solid #e8e2dc', textAlign: 'right' }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, justifyContent: 'flex-end' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#B76E79' }}>
                  {formatCurrency(kitFinalTotal)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888', textDecoration: 'line-through' }}>
                  {formatCurrency(kitSubtotal)}
                </Typography>
                <Chip label="SAVE 18%" size="small" sx={{ bgcolor: '#E91E63', color: '#fff', fontWeight: 700, height: 20 }} />
              </Box>
              <Button
                variant="contained"
                onClick={handleAddEntireKit}
                startIcon={<ShoppingBagIcon />}
                sx={{ mt: 1, borderRadius: 2, fontWeight: 700, px: 3 }}
              >
                {bundleAdded ? 'Bridal Kit Added!' : 'Add Entire Bridal Kit to Bag'}
              </Button>
            </Paper>
          </Box>

          {/* Product Cards Grid */}
          <Grid container spacing={3}>
            {bridalKitProducts.map((p, idx) => (
              <Grid item xs={12} sm={6} md={2.4} key={p.id}>
                <Card sx={{ height: '100%', borderRadius: 2.5, bgcolor: '#ffffff', border: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ p: 1, bgcolor: '#FAF8F5' }}>
                    <Chip label={`Step 0${idx + 1}`} size="small" sx={{ bgcolor: '#fff', color: '#8C4852', fontWeight: 700, fontSize: '0.65rem', height: 18 }} />
                  </Box>
                  <CardMedia component="img" image={p.images[0]} alt={p.name} sx={{ height: 160, objectFit: 'contain', p: 1.5, bgcolor: '#FAF8F5' }} />
                  <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700, textTransform: 'uppercase' }}>
                      {p.subcategory}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, my: 0.5, lineHeight: 1.3, fontSize: '0.85rem' }}>
                      {p.name}
                    </Typography>
                    <Box sx={{ mt: 'auto', pt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                        {formatCurrency(p.price)}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => addToCart(p, 1, p.shades?.[0])}
                        sx={{ fontSize: '0.7rem', fontWeight: 700 }}
                      >
                        Add
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 6-Week Pre-Wedding Aesthetician Timeline */}
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3.5, bgcolor: '#ffffff', border: '1px solid #ece4dc', mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <CalendarMonthIcon sx={{ color: '#B76E79' }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              6-Week Pre-Wedding Skincare Protocol
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#666', mb: 4 }}>
            Clinical aesthetician timeline for healthy barrier preparation, preventing breakouts from heavy wedding jewelry, and camera-ready radiance.
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                time: '6 Weeks Out',
                title: 'Barrier Hydration Infusion',
                desc: 'Begin daily peptide and ceramide glazes. Eliminate aggressive chemical peels and new acids to avoid unforeseen contact dermatitis.',
              },
              {
                time: '3 Weeks Out',
                title: 'Chromatic Shade Swatch Test',
                desc: 'Confirm your foundation and lipstick undertones in morning daylight and evening flash cameras while wearing your bridal lehenga dupatta.',
              },
              {
                time: '1 Week Out',
                title: 'Haldi & Mehendi Prep',
                desc: 'Coat lips and cuticles with deep barrier salves before turmeric application to prevent unwanted yellow staining on porous lips.',
              },
              {
                time: 'Wedding Morning',
                title: 'The Royal Canvas Application',
                desc: 'Hydrate with alcohol-free rose mist, smooth luminous foundation, and seal with 24K setting spray for tear-proof perfection.',
              },
            ].map((step, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Paper sx={{ p: 2.5, borderRadius: 2, bgcolor: '#FAF8F5', border: '1px solid #eee', height: '100%' }}>
                  <Chip label={step.time} size="small" sx={{ bgcolor: '#B76E79', color: '#fff', fontWeight: 700, mb: 1.5 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, fontSize: '0.84rem' }}>
                    {step.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
