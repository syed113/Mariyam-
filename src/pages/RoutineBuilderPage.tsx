import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Tabs,
  Tab,
  Button,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { formatCurrency } from '../utils/format';

export const RoutineBuilderPage: React.FC = () => {
  const { products, addToCart } = useStore();
  const [timeOfDay, setTimeOfDay] = useState<'AM' | 'PM'>('AM');
  const [skinGoal, setSkinGoal] = useState<'glass-skin' | 'barrier-repair' | 'matte-glam'>('glass-skin');
  const [bundleAdded, setBundleAdded] = useState(false);

  // Dynamic routine matching based on goal and time
  const routineData = {
    'glass-skin': {
      title: 'Glass Skin & Luminous Complexion Regimen',
      subtitle: 'Engineered for multidimensional dewy hydration that catches natural light and holds makeup for 14 hours.',
      amSteps: [
        {
          step: 1,
          name: 'Gentle Awakening Cleanse',
          desc: 'Wash with lukewarm water and a pea-sized pump of Botanical Clarifying Gel Cleanser.',
          product: products.find((p) => p.id === 'prod-9'),
        },
        {
          step: 2,
          name: 'Hydra-Infusion & Peptide Glaze',
          desc: 'Press 3 drops of Peptide Glaze into damp skin to lock moisture deep in the dermal layer.',
          product: products.find((p) => p.id === 'prod-5'),
        },
        {
          step: 3,
          name: 'Breathable Silk Base Coverage',
          desc: 'Buff 1 pump of Royal Silk Luminous Foundation from center outward.',
          product: products.find((p) => p.id === 'prod-1'),
        },
        {
          step: 4,
          name: '24K Micro-Mist Shield',
          desc: 'Seal with 24K Micro-Mist for 18-hour transfer-proof radiance.',
          product: products.find((p) => p.id === 'prod-3'),
        },
      ],
      pmSteps: [
        {
          step: 1,
          name: 'Double Cleanse & Clarify',
          desc: 'Massage Botanical Gel Cleanser for 60 seconds to break down sunscreen and long-wear pigments.',
          product: products.find((p) => p.id === 'prod-9'),
        },
        {
          step: 2,
          name: 'Peptide Cellular Recovery',
          desc: 'Generously layer Peptide Glaze Drops to activate overnight collagen synthesis.',
          product: products.find((p) => p.id === 'prod-5'),
        },
        {
          step: 3,
          name: 'Ceramide Moisture Barrier Lock',
          desc: 'Press Midnight Renewal Cream over face and neck to eliminate transepidermal water loss.',
          product: products.find((p) => p.id === 'prod-4'),
        },
      ],
    },
    'barrier-repair': {
      title: 'Lipid Barrier Recovery & Calming Regimen',
      subtitle: 'Formulated for sensitized, peeling, or dry skin suffering from harsh weather or active acids.',
      amSteps: [
        {
          step: 1,
          name: 'Hydrating Botanical Prep',
          desc: 'Cleanse with mild botanicals to retain natural sebum.',
          product: products.find((p) => p.id === 'prod-9'),
        },
        {
          step: 2,
          name: 'Intensive Ceramide Seal',
          desc: 'Apply a dime-sized amount of Midnight Renewal Cream to soothe redness and seal micro-cracks.',
          product: products.find((p) => p.id === 'prod-4'),
        },
        {
          step: 3,
          name: 'Protective Silk Base',
          desc: 'Smooth Royal Silk Foundation SPF 25 to defend against environmental pollutants and UV rays.',
          product: products.find((p) => p.id === 'prod-1'),
        },
      ],
      pmSteps: [
        {
          step: 1,
          name: 'Nourishing Night Melt',
          desc: 'Gently wipe away environmental debris with Botanical Gel Cleanser.',
          product: products.find((p) => p.id === 'prod-9'),
        },
        {
          step: 2,
          name: 'Overnight Intensive Ceramide Infusion',
          desc: 'Apply a generous mask layer of Midnight Renewal Cream before sleeping.',
          product: products.find((p) => p.id === 'prod-4'),
        },
      ],
    },
    'matte-glam': {
      title: 'Velvet Haute Red Carpet Protocol',
      subtitle: 'The 16-hour sweat-proof, poreless finish designed for gala premieres, wedding banquets, and stage photography.',
      amSteps: [
        {
          step: 1,
          name: 'Pore Clarification Prep',
          desc: 'Cleanse deeply with Botanical Gel Cleanser to control excess sebum.',
          product: products.find((p) => p.id === 'prod-9'),
        },
        {
          step: 2,
          name: 'High-Definition Base Layering',
          desc: 'Stipple Royal Silk Foundation for seamless, camera-ready full coverage.',
          product: products.find((p) => p.id === 'prod-1'),
        },
        {
          step: 3,
          name: 'Airbrush Finishing Powder',
          desc: 'Press Charlotte Tilbury Airbrush Powder into the T-zone and smile lines.',
          product: products.find((p) => p.id === 'prod-7'),
        },
        {
          step: 4,
          name: '18-Hour 24K Lock Shield',
          desc: 'Mist liberally to lock pigments in place all day and night.',
          product: products.find((p) => p.id === 'prod-3'),
        },
      ],
      pmSteps: [
        {
          step: 1,
          name: 'Complete Pigment Dissolution',
          desc: 'Cleanse thoroughly with Botanical Gel Cleanser.',
          product: products.find((p) => p.id === 'prod-9'),
        },
        {
          step: 2,
          name: 'Midnight Lipid Recovery',
          desc: 'Rebalance skin moisture with Midnight Renewal Ceramide Cream.',
          product: products.find((p) => p.id === 'prod-4'),
        },
      ],
    },
  };

  const currentRoutine = routineData[skinGoal];
  const steps = timeOfDay === 'AM' ? currentRoutine.amSteps : currentRoutine.pmSteps;

  const validProducts = steps
    .map((s) => s.product)
    .filter((p): p is Product => Boolean(p));

  const routineSubtotal = validProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = Math.round(routineSubtotal * 0.15 * 100) / 100;
  const bundleTotal = Math.round((routineSubtotal - bundleDiscount) * 100) / 100;

  const handleAddBundle = () => {
    validProducts.forEach((p) => {
      addToCart(p, 1, p.shades?.[0]);
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2500);
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 750, mx: 'auto' }}>
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
            label="Interactive Skincare Architecture"
            sx={{ bgcolor: 'rgba(183, 110, 121, 0.12)', color: '#8C4852', fontWeight: 700, mb: 1.5 }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3.5rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 2 }}>
            Custom Routine Generator
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
            Build your personalized Morning (AM) and Evening (PM) rituals to balance barrier health, optimize hydration, and ensure your makeup wears flawlessly.
          </Typography>
        </Box>

        {/* Goal Selector Segmented Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 0.6,
              borderRadius: 3,
              bgcolor: '#ffffff',
              border: '1px solid rgba(183, 110, 121, 0.2)',
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { id: 'glass-skin', label: 'Radiant Glass Skin' },
              { id: 'barrier-repair', label: 'Barrier Repair & Soothing' },
              { id: 'matte-glam', label: 'Velvet Haute Red Carpet' },
            ].map((goal) => (
              <Button
                key={goal.id}
                onClick={() => setSkinGoal(goal.id as any)}
                sx={{
                  px: 3,
                  py: 1.2,
                  borderRadius: 2.5,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  bgcolor: skinGoal === goal.id ? '#B76E79' : 'transparent',
                  color: skinGoal === goal.id ? '#fff' : '#444',
                  '&:hover': {
                    bgcolor: skinGoal === goal.id ? '#8C4852' : 'rgba(183,110,121,0.08)',
                  },
                }}
              >
                {goal.label}
              </Button>
            ))}
          </Paper>
        </Box>

        {/* AM vs PM Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Tabs
            value={timeOfDay}
            onChange={(_, val) => setTimeOfDay(val)}
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 2,
              p: 0.5,
              border: '1px solid #e0e0e0',
              '& .MuiTabs-indicator': { bgcolor: '#B76E79', height: '100%', borderRadius: 1.5, zIndex: 0 },
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: '0.88rem',
                zIndex: 1,
                minHeight: 44,
                px: 4,
                color: '#666',
                '&.Mui-selected': { color: '#ffffff' },
              },
            }}
          >
            <Tab icon={<WbSunnyOutlinedIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Morning Routine (AM)" value="AM" />
            <Tab icon={<BedtimeOutlinedIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Night Recovery (PM)" value="PM" />
          </Tabs>
        </Box>

        {/* Routine Title Card */}
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            bgcolor: '#ffffff',
            border: '1px solid rgba(183, 110, 121, 0.2)',
            mb: 6,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box sx={{ maxWidth: 650 }}>
              <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.15em' }}>
                {timeOfDay === 'AM' ? 'Morning Radiance Protocol' : 'Night-Time Cellular Regeneration'}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 1 }}>
                {currentRoutine.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>
                {currentRoutine.subtitle}
              </Typography>
            </Box>

            {/* Bundle Buy Card */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: '#FAF8F5',
                border: '1px solid rgba(183, 110, 121, 0.25)',
                minWidth: 260,
                textAlign: { xs: 'left', sm: 'right' },
              }}
            >
              <Chip label="15% Routine Bundle Discount" size="small" sx={{ bgcolor: '#E91E63', color: '#fff', fontWeight: 700, mb: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, gap: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#B76E79' }}>
                  {formatCurrency(bundleTotal)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#999', textDecoration: 'line-through' }}>
                  {formatCurrency(routineSubtotal)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={handleAddBundle}
                startIcon={<ShoppingBagIcon />}
                sx={{ mt: 1.5, py: 1, borderRadius: 2, fontWeight: 700, width: '100%' }}
              >
                {bundleAdded ? 'Bundle Added to Bag!' : `Add All ${steps.length} Steps to Bag`}
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Step by step cards */}
          <Grid container spacing={4}>
            {steps.map((st) => (
              <Grid item xs={12} md={6} key={st.step}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 2.5,
                    border: '1px solid rgba(183, 110, 121, 0.18)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Chip
                        label={`Step ${st.step}`}
                        size="small"
                        sx={{ bgcolor: '#1a1a1a', color: '#D4A373', fontWeight: 700, height: 22 }}
                      />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                        {st.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, mb: 2.5 }}>
                      {st.desc}
                    </Typography>
                  </Box>

                  {/* Paired Product Card */}
                  {st.product && (
                    <Box
                      sx={{
                        p: 1.8,
                        borderRadius: 2,
                        bgcolor: '#FAF8F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid #eee',
                        gap: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          component="img"
                          src={st.product.images[0]}
                          alt={st.product.name}
                          sx={{ width: 56, height: 56, borderRadius: 1.5, objectFit: 'cover' }}
                        />
                        <Box>
                          <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700 }}>
                            {st.product.brand}
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                            {st.product.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#B76E79', fontWeight: 700 }}>
                            {formatCurrency(st.product.price)}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => addToCart(st.product!, 1, st.product!.shades?.[0])}
                        sx={{ fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}
                      >
                        Add Step
                      </Button>
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
