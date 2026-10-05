import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Button,
  LinearProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useStore } from '../context/StoreContext';
import { BeautyProfile, Product } from '../types';
import { formatCurrency } from '../utils/format';

export const BeautyQuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { products, saveBeautyProfile, addToCart } = useStore();

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [quizState, setQuizState] = useState<BeautyProfile>({
    skinType: 'Combination',
    skinTone: 'Medium',
    undertone: 'warm',
    concerns: ['Hydration', 'Dark Spots'],
    makeupExperience: 'Intermediate',
    preferredStyle: 'Natural Dewy',
    budgetRange: 'Luxury Prestige (₹2,500+)',
    recommendedProductIds: [],
  });

  const [completed, setCompleted] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const handleConcernToggle = (c: string) => {
    setQuizState((prev) => {
      const exists = prev.concerns.includes(c);
      return {
        ...prev,
        concerns: exists ? prev.concerns.filter((item) => item !== c) : [...prev.concerns, c],
      };
    });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    // Generate tailored product recommendations based on answers
    const matchedIds = ['prod-1', 'prod-3']; // Foundation and Setting Spray

    if (quizState.skinType === 'Dry') {
      matchedIds.push('prod-4', 'prod-5'); // Ceramide cream + Peptide glaze
    } else if (quizState.skinType === 'Oily') {
      matchedIds.push('prod-9', 'prod-7'); // Clarifying cleanser + Airbrush powder
    } else {
      matchedIds.push('prod-5', 'prod-6'); // Peptide glaze + Sculpt palette
    }

    if (quizState.preferredStyle === 'High Glamour') {
      matchedIds.push('prod-2', 'prod-8'); // Velvet lipstick + Dior palette
    } else {
      matchedIds.push('prod-2');
    }

    const updatedProfile: BeautyProfile = {
      ...quizState,
      recommendedProductIds: matchedIds,
    };

    setQuizState(updatedProfile);
    saveBeautyProfile(updatedProfile);
    setCompleted(true);
  };

  const recommendedProducts: Product[] = products.filter((p) =>
    quizState.recommendedProductIds.includes(p.id)
  );

  const handleAddAllToCart = () => {
    recommendedProducts.forEach((p) => {
      addToCart(p, 1, p.shades?.[0]);
    });
  };

  const handleSaveToAccount = () => {
    saveBeautyProfile(quizState);
    setProfileSaved(true);
    setTimeout(() => {
      navigate('/account?tab=beauty-profile');
    }, 1200);
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="md">
        {!completed ? (
          <Card
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 4,
              bgcolor: '#ffffff',
              border: '1px solid rgba(183, 110, 121, 0.2)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
            }}
          >
            {/* Quiz Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
                label="AI Diagnostic Consultation"
                sx={{ bgcolor: 'rgba(183, 110, 121, 0.12)', color: '#8C4852', fontWeight: 700, mb: 1.5 }}
              />
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                Find Your Perfect Shade & Routine
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', maxWidth: 500, mx: 'auto' }}>
                Complete our 6-step personalized diagnostic to uncover the formulations engineered for your skin.
              </Typography>
            </Box>

            {/* Progress Bar */}
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#888' }}>
                  Step {step} of {totalSteps}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#B76E79' }}>
                  {Math.round((step / totalSteps) * 100)}% Complete
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(step / totalSteps) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(183, 110, 121, 0.12)',
                  '& .MuiLinearProgress-bar': { bgcolor: '#B76E79' },
                }}
              />
            </Box>

            {/* Step 1: Skin Type */}
            {step === 1 && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>
                  What is your primary skin type?
                </Typography>
                <RadioGroup
                  value={quizState.skinType}
                  onChange={(e) => setQuizState({ ...quizState, skinType: e.target.value as any })}
                >
                  {[
                    { val: 'Dry', label: 'Dry: Feels tight, prone to flaking or dullness' },
                    { val: 'Oily', label: 'Oily: Noticeable shine across T-zone and cheeks' },
                    { val: 'Combination', label: 'Combination: Oily forehead/nose, dry or normal cheeks' },
                    { val: 'Normal', label: 'Normal: Well balanced, rarely breaks out or flakes' },
                    { val: 'Sensitive', label: 'Sensitive: Easily reacts, flushed redness, stinging' },
                  ].map((item) => (
                    <Paper
                      key={item.val}
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: 1.5,
                        borderRadius: 2,
                        border: quizState.skinType === item.val ? '2px solid #B76E79' : '1px solid #e5e5e5',
                        bgcolor: quizState.skinType === item.val ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => setQuizState({ ...quizState, skinType: item.val as any })}
                    >
                      <FormControlLabel
                        value={item.val}
                        control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                        label={<Typography sx={{ fontSize: '0.92rem', fontWeight: 600 }}>{item.label}</Typography>}
                        sx={{ m: 0, width: '100%' }}
                      />
                    </Paper>
                  ))}
                </RadioGroup>
              </Box>
            )}

            {/* Step 2: Skin Tone */}
            {step === 2 && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>
                  How would you describe your complexion depth?
                </Typography>
                <RadioGroup
                  value={quizState.skinTone}
                  onChange={(e) => setQuizState({ ...quizState, skinTone: e.target.value as any })}
                >
                  {[
                    { val: 'Fair', desc: 'Porcelain or alabaster; burns easily in sunlight' },
                    { val: 'Light', desc: 'Light peach or ivory; gradual tan' },
                    { val: 'Medium', desc: 'Golden beige or neutral olive' },
                    { val: 'Tan', desc: 'Warm honey or bronze tones' },
                    { val: 'Deep', desc: 'Rich espresso, chestnut, or mahogany' },
                    { val: 'Dark', desc: 'Deep ebony with cool or neutral nuances' },
                  ].map((item) => (
                    <Paper
                      key={item.val}
                      elevation={0}
                      sx={{
                        p: 1.8,
                        mb: 1.5,
                        borderRadius: 2,
                        border: quizState.skinTone === item.val ? '2px solid #B76E79' : '1px solid #e5e5e5',
                        bgcolor: quizState.skinTone === item.val ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => setQuizState({ ...quizState, skinTone: item.val as any })}
                    >
                      <FormControlLabel
                        value={item.val}
                        control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                        label={
                          <Box>
                            <Typography sx={{ fontSize: '0.92rem', fontWeight: 700 }}>{item.val}</Typography>
                            <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>{item.desc}</Typography>
                          </Box>
                        }
                        sx={{ m: 0, width: '100%' }}
                      />
                    </Paper>
                  ))}
                </RadioGroup>
              </Box>
            )}

            {/* Step 3: Skin Concerns */}
            {step === 3 && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
                  What skin concerns do you want to target?
                </Typography>
                <Typography variant="body2" sx={{ color: '#777', textAlign: 'center', mb: 3 }}>
                  Select all that apply.
                </Typography>
                <FormGroup>
                  {[
                    'Hydration & Dry Patches',
                    'Acne & Blemish Prevention',
                    'Dark Spots & Hyperpigmentation',
                    'Fine Lines & Firmness',
                    'Uneven Texture & Large Pores',
                    'Redness & Barrier Sensitivity',
                  ].map((concern) => (
                    <Paper
                      key={concern}
                      elevation={0}
                      sx={{
                        p: 1.5,
                        mb: 1.5,
                        borderRadius: 2,
                        border: quizState.concerns.includes(concern) ? '2px solid #B76E79' : '1px solid #e5e5e5',
                        bgcolor: quizState.concerns.includes(concern) ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleConcernToggle(concern)}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={quizState.concerns.includes(concern)}
                            sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }}
                          />
                        }
                        label={<Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{concern}</Typography>}
                        sx={{ m: 0, width: '100%' }}
                      />
                    </Paper>
                  ))}
                </FormGroup>
              </Box>
            )}

            {/* Step 4: Makeup Experience */}
            {step === 4 && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>
                  What is your daily makeup experience level?
                </Typography>
                <RadioGroup
                  value={quizState.makeupExperience}
                  onChange={(e) => setQuizState({ ...quizState, makeupExperience: e.target.value as any })}
                >
                  {[
                    { val: 'Beginner', desc: '5-minute routine: Quick tinted moisturizer, brow gel, and balm.' },
                    { val: 'Intermediate', desc: '15-minute routine: Foundation, concealer, soft blush, and mascara.' },
                    { val: 'Advanced', desc: 'Full glam: Multi-shade contour, cut creases, setting bake, lash mapping.' },
                  ].map((item) => (
                    <Paper
                      key={item.val}
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: 1.5,
                        borderRadius: 2,
                        border: quizState.makeupExperience === item.val ? '2px solid #B76E79' : '1px solid #e5e5e5',
                        bgcolor: quizState.makeupExperience === item.val ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => setQuizState({ ...quizState, makeupExperience: item.val as any })}
                    >
                      <FormControlLabel
                        value={item.val}
                        control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                        label={
                          <Box>
                            <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.val}</Typography>
                            <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>{item.desc}</Typography>
                          </Box>
                        }
                        sx={{ m: 0, width: '100%' }}
                      />
                    </Paper>
                  ))}
                </RadioGroup>
              </Box>
            )}

            {/* Step 5: Preferred Style */}
            {step === 5 && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>
                  Which aesthetic finish resonates with you?
                </Typography>
                <RadioGroup
                  value={quizState.preferredStyle}
                  onChange={(e) => setQuizState({ ...quizState, preferredStyle: e.target.value as any })}
                >
                  {[
                    { val: 'Natural Dewy', desc: 'Fresh glass skin, flushed cheeks, and glazed lips.' },
                    { val: 'Velvet Soft-Matte', desc: 'Airbrushed poreless canvas, camera flash-proof, zero shine.' },
                    { val: 'High Glamour', desc: 'Sculpted cheekbones, dramatic smoked eyes, and bold lips.' },
                    { val: 'French Minimalist', desc: 'Feathered brows, mascara, and a stain of red berry on the lips.' },
                  ].map((item) => (
                    <Paper
                      key={item.val}
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: 1.5,
                        borderRadius: 2,
                        border: quizState.preferredStyle === item.val ? '2px solid #B76E79' : '1px solid #e5e5e5',
                        bgcolor: quizState.preferredStyle === item.val ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => setQuizState({ ...quizState, preferredStyle: item.val as any })}
                    >
                      <FormControlLabel
                        value={item.val}
                        control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                        label={
                          <Box>
                            <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.val}</Typography>
                            <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>{item.desc}</Typography>
                          </Box>
                        }
                        sx={{ m: 0, width: '100%' }}
                      />
                    </Paper>
                  ))}
                </RadioGroup>
              </Box>
            )}

            {/* Step 6: Budget Range */}
            {step === 6 && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>
                  What is your preferred product price tier?
                </Typography>
                <RadioGroup
                  value={quizState.budgetRange}
                  onChange={(e) => setQuizState({ ...quizState, budgetRange: e.target.value as any })}
                >
                  {[
                    { val: 'Under ₹999', desc: '₹499 – ₹999 essentials offering exceptional clean performance and daily glow.' },
                    { val: '₹1,000 – ₹2,500', desc: '₹1,000 – ₹2,500 high-performance staples with active botanicals and peptides.' },
                    { val: 'Luxury Prestige (₹2,500+)', desc: '₹2,500+ haute couture formulations with white truffle, 24K gold, and bridal longevity.' },
                  ].map((item) => (
                    <Paper
                      key={item.val}
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: 1.5,
                        borderRadius: 2,
                        border: quizState.budgetRange === item.val ? '2px solid #B76E79' : '1px solid #e5e5e5',
                        bgcolor: quizState.budgetRange === item.val ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => setQuizState({ ...quizState, budgetRange: item.val as any })}
                    >
                      <FormControlLabel
                        value={item.val}
                        control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                        label={
                          <Box>
                            <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.val}</Typography>
                            <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>{item.desc}</Typography>
                          </Box>
                        }
                        sx={{ m: 0, width: '100%' }}
                      />
                    </Paper>
                  ))}
                </RadioGroup>
              </Box>
            )}

            {/* Stepper Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 3, borderTop: '1px solid #eee' }}>
              <Button
                variant="text"
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                startIcon={<ArrowBackIcon />}
                sx={{ color: '#666' }}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                endIcon={step === totalSteps ? <AutoAwesomeIcon /> : <ArrowForwardIcon />}
                sx={{ px: 4, py: 1.2, borderRadius: 2, fontWeight: 700 }}
              >
                {step === totalSteps ? 'Generate My Profile' : 'Next Step'}
              </Button>
            </Box>
          </Card>
        ) : (
          /* Results View */
          <Box>
            <Paper
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                bgcolor: '#ffffff',
                border: '1px solid rgba(183, 110, 121, 0.25)',
                mb: 6,
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <CheckCircleIcon sx={{ fontSize: 56, color: '#B76E79', mb: 1.5 }} />
                <Typography variant="overline" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.2em' }}>
                  AI Beauty Diagnosis Complete
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 1 }}>
                  Your Personalized Prescription
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Engineered specifically for your {quizState.skinType} skin and {quizState.skinTone} complexion tone.
                </Typography>
              </Box>

              {/* Diagnosis Summary Pills */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 2, bgcolor: '#FAF8F5', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#777', display: 'block' }}>Skin Type</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>{quizState.skinType}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 2, bgcolor: '#FAF8F5', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#777', display: 'block' }}>Complexion Tone</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>{quizState.skinTone}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 2, bgcolor: '#FAF8F5', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#777', display: 'block' }}>Aesthetic Style</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>{quizState.preferredStyle}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 2, bgcolor: '#FAF8F5', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#777', display: 'block' }}>Matched Shade</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#B76E79' }}>Warm Almond 35W</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Recommended Routine Products */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                    Curated Product Regimen ({recommendedProducts.length} Formulations)
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleAddAllToCart}
                    startIcon={<ShoppingBagIcon />}
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                  >
                    Add All to Bag
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  {recommendedProducts.map((p) => (
                    <Grid item xs={12} sm={6} key={p.id}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          display: 'flex',
                          gap: 2,
                          alignItems: 'center',
                          border: '1px solid #e5e0da',
                        }}
                      >
                        <Box component="img" src={p.images[0]} alt={p.name} sx={{ width: 68, height: 68, borderRadius: 1.5, objectFit: 'cover' }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700 }}>
                            {p.category}
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                            {p.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#B76E79', fontWeight: 700, mt: 0.5 }}>
                            {formatCurrency(p.price)}
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => addToCart(p, 1, p.shades?.[0])}
                          sx={{ fontSize: '0.72rem', fontWeight: 700 }}
                        >
                          Add
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, pt: 3, borderTop: '1px solid #eee' }}>
                <Button
                  variant="outlined"
                  onClick={handleSaveToAccount}
                  startIcon={<PersonOutlineIcon />}
                  sx={{ borderRadius: 2, fontWeight: 700 }}
                >
                  {profileSaved ? 'Profile Saved! Redirecting...' : 'Save Profile to My Account'}
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    setStep(1);
                    setCompleted(false);
                  }}
                  sx={{ color: '#666' }}
                >
                  Retake Diagnostic
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};
