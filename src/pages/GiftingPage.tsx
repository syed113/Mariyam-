import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/format';

const RECIPIENTS = [
  'Wife',
  'Mother',
  'Sister',
  'Bride-to-Be',
  'Best Friend',
  'Girlfriend',
  'Husband / Boyfriend',
  'Colleague',
];

const OCCASIONS = [
  'Birthday Celebration',
  'Wedding & Trousseau',
  'Anniversary',
  'Diwali & Festive Glow',
  'Thank You & Appreciation',
  'Self-Care Indulgence',
];

const BUDGET_TIERS = [
  { label: 'Under ₹999', max: 999 },
  { label: 'Under ₹1,999', max: 1999 },
  { label: 'Under ₹2,999', max: 2999 },
  { label: 'Luxury Prestige (₹5,000+)', max: 10000 },
];

export const GiftingPage: React.FC = () => {
  const { products, addToCart } = useStore();
  const [recipient, setRecipient] = useState('Wife');
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [budgetMax, setBudgetMax] = useState(2999);
  const [customNote, setCustomNote] = useState('Wishing you a day as luminous and beautiful as you are!');
  const [boxAdded, setBoxAdded] = useState(false);

  // Filter recommendations based on budget and recipient
  const recommendedGifts = useMemo(() => {
    let list = products.filter((p) => p.price <= budgetMax);
    if (recipient.includes('Husband') || recipient.includes('Boyfriend')) {
      const mens = products.filter((p) => p.department === "Men's Grooming" || p.subcategory.includes('Beard') || p.category === 'Haircare');
      if (mens.length > 0) list = mens;
    }
    return list.slice(0, 3);
  }, [products, budgetMax, recipient]);

  const boxTotal = recommendedGifts.reduce((sum, p) => sum + p.price, 0);

  const handleAddGiftBox = () => {
    recommendedGifts.forEach((p) => {
      addToCart(p, 1, p.shades?.[0]);
    });
    setBoxAdded(true);
    setTimeout(() => setBoxAdded(false), 2500);
  };

  return (
    <Box sx={{ bgcolor: '#FAF8F5', minHeight: '100vh', pb: 12 }}>
      {/* Gifting Banner */}
      <Box sx={{ bgcolor: '#161616', color: '#FAF8F5', py: { xs: 7, md: 10 }, borderBottom: '1px solid rgba(212, 163, 115, 0.25)' }}>
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: 720 }}>
            <Chip
              icon={<CardGiftcardIcon sx={{ fontSize: '14px !important', color: '#D4A373' }} />}
              label="LUXURY BESPOKE GIFTING ENGINE"
              sx={{ bgcolor: 'rgba(212, 163, 115, 0.15)', color: '#D4A373', fontWeight: 700, mb: 2, letterSpacing: '0.1em' }}
            />
            <Typography variant="h1" sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: '2.4rem', md: '3.8rem' }, fontWeight: 600, mb: 1.5 }}>
              Curate the Ultimate Beauty Gift Box
            </Typography>
            <Typography variant="body1" sx={{ color: '#ccc', lineHeight: 1.7, fontSize: '1.05rem' }}>
              Select the lucky recipient, event occasion, and price limit. We hand-pack each order in a satin-ribboned signature keepsake box with a personalized handwritten wax-sealed note.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Gifting Step Builder */}
      <Container maxWidth="xl" sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          {/* Controls */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, borderRadius: 3.5, bgcolor: '#ffffff', border: '1px solid #ece4dc' }}>
              {/* 1. Who is it for? */}
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                1. WHO IS THIS GIFT FOR?
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1.5 }}>
                {RECIPIENTS.map((rec) => (
                  <Chip
                    key={rec}
                    label={rec}
                    onClick={() => setRecipient(rec)}
                    sx={{
                      bgcolor: recipient === rec ? '#1a1a1a' : '#FAF8F5',
                      color: recipient === rec ? '#D4A373' : '#444',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: recipient === rec ? '1px solid #1a1a1a' : '1px solid #e0d8cf',
                      '&:hover': { bgcolor: recipient === rec ? '#1a1a1a' : '#f0eae4' },
                    }}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* 2. Occasion */}
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                2. WHAT IS THE OCCASION?
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1.5 }}>
                {OCCASIONS.map((occ) => (
                  <Chip
                    key={occ}
                    label={occ}
                    onClick={() => setOccasion(occ)}
                    sx={{
                      bgcolor: occasion === occ ? '#B76E79' : '#FAF8F5',
                      color: occasion === occ ? '#fff' : '#444',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: occasion === occ ? '1px solid #B76E79' : '1px solid #e0d8cf',
                      '&:hover': { bgcolor: occasion === occ ? '#8C4852' : '#f0eae4' },
                    }}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* 3. Budget */}
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                3. SELECT YOUR BUDGET TIER
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1.5 }}>
                {BUDGET_TIERS.map((tier) => (
                  <Chip
                    key={tier.label}
                    label={tier.label}
                    onClick={() => setBudgetMax(tier.max)}
                    sx={{
                      bgcolor: budgetMax === tier.max ? '#1a1a1a' : '#FAF8F5',
                      color: budgetMax === tier.max ? '#fff' : '#444',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: budgetMax === tier.max ? '1px solid #1a1a1a' : '1px solid #e0d8cf',
                    }}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* 4. Handwritten Note */}
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                4. PERSONALIZED GIFT NOTE (INCLUDED FREE)
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Write your note here..."
                sx={{ mt: 1.5, bgcolor: '#FAF8F5', borderRadius: 2 }}
              />
            </Paper>
          </Grid>

          {/* Generated Gift Box Preview */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 3.5, bgcolor: '#ffffff', border: '1px solid #ece4dc' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Chip
                    label="CURATED RECOMMENDATION"
                    size="small"
                    sx={{ bgcolor: 'rgba(183, 110, 121, 0.1)', color: '#8C4852', fontWeight: 700, mb: 0.5 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    The Bespoke {recipient} {occasion} Gift Hamper
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#777' }}>
                    Includes complimentary luxury keepsake packaging & wax-sealed calligraphy card.
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#B76E79' }}>
                    {formatCurrency(boxTotal)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddGiftBox}
                    startIcon={boxAdded ? <CheckCircleIcon /> : <ShoppingBagIcon />}
                    sx={{ mt: 1, borderRadius: 2, fontWeight: 700, px: 3 }}
                  >
                    {boxAdded ? 'Gift Box Added!' : 'Build & Add My Gift Box'}
                  </Button>
                </Box>
              </Box>

              <Grid container spacing={2.5}>
                {recommendedGifts.map((p, idx) => (
                  <Grid item xs={12} sm={4} key={p.id}>
                    <Paper sx={{ p: 2, borderRadius: 2.5, bgcolor: '#FAF8F5', border: '1px solid #eee', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ mb: 1 }}>
                        <Chip label={`Gift Item 0${idx + 1}`} size="small" sx={{ bgcolor: '#fff', color: '#B76E79', fontWeight: 700, fontSize: '0.65rem', height: 18 }} />
                      </Box>
                      <Box component="img" src={p.images[0]} alt={p.name} sx={{ width: '100%', height: 140, objectFit: 'contain', mb: 1.5 }} />
                      <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700 }}>
                        {p.brand}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1, fontSize: '0.85rem' }}>
                        {p.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 'auto' }}>
                        {formatCurrency(p.price)}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Gift Note Preview Box */}
              <Box sx={{ mt: 4, p: 2.5, bgcolor: '#FAF8F5', borderRadius: 2.5, border: '1px dashed rgba(183, 110, 121, 0.4)' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                  Enclosed Handwritten Wax-Sealed Card
                </Typography>
                <Typography sx={{ fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', color: '#333' }}>
                  "{customNote}"
                </Typography>
                <Typography variant="caption" sx={{ color: '#888', display: 'block', mt: 1 }}>
                  Packed with dried rose petals in eco-conscious luxury thermal boxes.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
