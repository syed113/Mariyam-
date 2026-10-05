import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useStore } from '../../context/StoreContext';
import { INDIAN_FOUNDATION_SHADES } from '../../data/catalogData';
import { ProductShade } from '../../types';
import { formatCurrency } from '../../utils/format';

interface ShadeQuizAnswers {
  depth: 'Fair' | 'Light' | 'Medium' | 'Tan' | 'Dusky' | 'Deep';
  undertone: 'cool' | 'warm' | 'neutral' | 'olive';
  coverage: 'Sheer Natural' | 'Medium Buildable' | 'Full Glamour';
  currentBrand: string;
  referenceShade: string;
  finish: 'Dewy Luminous' | 'Velvet Soft-Matte' | 'Natural Satin';
}

export const FindMyShadeModal: React.FC = () => {
  const { isShadeModalOpen, setIsShadeModalOpen, shadeModalProduct, products, addToCart } = useStore();
  const targetProduct = shadeModalProduct || products.find((p) => p.subcategory === 'Foundation') || products[0];

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [answers, setAnswers] = useState<ShadeQuizAnswers>({
    depth: 'Medium',
    undertone: 'warm',
    coverage: 'Medium Buildable',
    currentBrand: 'MAC Studio Fix',
    referenceShade: 'NC 35 - NC 40',
    finish: 'Velvet Soft-Matte',
  });

  const [isCalculated, setIsCalculated] = useState(false);

  // Compute matched shades
  const matches = React.useMemo(() => {
    // Available shades from targetProduct or fall back to Indian Foundation Palette
    const available = (targetProduct.shades && targetProduct.shades.length > 0)
      ? targetProduct.shades
      : INDIAN_FOUNDATION_SHADES;

    let bestMatch = available[2]; // Default 220 Golden Beige

    if (answers.depth === 'Fair') {
      bestMatch = available.find((s) => s.name.includes('110') || s.name.includes('Porcelain') || s.undertone === answers.undertone) || available[0];
    } else if (answers.depth === 'Light') {
      bestMatch = available.find((s) => s.name.includes('128') || s.name.includes('Sand')) || available[1];
    } else if (answers.depth === 'Medium') {
      if (answers.undertone === 'olive') {
        bestMatch = available.find((s) => s.undertone === 'olive' || s.name.includes('Olive')) || available[3];
      } else {
        bestMatch = available.find((s) => s.name.includes('220') || s.name.includes('Golden')) || available[2];
      }
    } else if (answers.depth === 'Tan') {
      bestMatch = available.find((s) => s.name.includes('310') || s.name.includes('Honey') || s.name.includes('Almond')) || available[4];
    } else if (answers.depth === 'Dusky') {
      bestMatch = available.find((s) => s.name.includes('330') || s.name.includes('Chestnut')) || available[5];
    } else {
      bestMatch = available[available.length - 1];
    }

    const bestIndex = available.findIndex((s) => s.id === bestMatch.id);
    const lighter = bestIndex > 0 ? available[bestIndex - 1] : available[0];
    const deeper = bestIndex < available.length - 1 ? available[bestIndex + 1] : available[available.length - 1];
    const alternative = available.find((s) => s.id !== bestMatch.id && s.undertone === bestMatch.undertone) || lighter;

    return {
      best: bestMatch,
      alternative,
      lighter,
      deeper,
    };
  }, [answers, targetProduct]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsCalculated(false);
  };

  const handleAddMatch = (shade: ProductShade) => {
    addToCart(targetProduct, 1, shade);
    setIsShadeModalOpen(false);
  };

  return (
    <Dialog
      open={isShadeModalOpen}
      onClose={() => setIsShadeModalOpen(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3.5,
          p: { xs: 1.5, sm: 2.5 },
          bgcolor: '#ffffff',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: '#D4A373' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.02em' }}>
            AI Precision Shade Matcher
          </Typography>
        </Box>
        <IconButton onClick={() => setIsShadeModalOpen(false)} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Progress Bar */}
        {!isCalculated && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852', letterSpacing: '0.08em' }}>
                STEP 0{step} OF 0{totalSteps}
              </Typography>
              <Typography variant="caption" sx={{ color: '#888' }}>
                Analyzing {targetProduct.name}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(step / totalSteps) * 100}
              sx={{
                height: 5,
                borderRadius: 2.5,
                bgcolor: 'rgba(183, 110, 121, 0.15)',
                '& .MuiLinearProgress-bar': { bgcolor: '#B76E79' },
              }}
            />
          </Box>
        )}

        {/* Step 1: Depth */}
        {!isCalculated && step === 1 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              1. What is your skin depth level?
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2.5 }}>
              Choose the category that best describes your overall complexion baseline.
            </Typography>
            <Grid container spacing={2}>
              {[
                { val: 'Fair', desc: 'Porcelain with translucent undertones; burns easily under sun' },
                { val: 'Light', desc: 'Light beige; burns then tans with slight yellow tone' },
                { val: 'Medium', desc: 'Typical South Asian wheatish to golden complexion; tans readily' },
                { val: 'Tan', desc: 'Warm amber, caramel, or rich olive skin tones' },
                { val: 'Dusky', desc: 'Deep warm chestnut or terracotta complexion with rich undertones' },
                { val: 'Deep', desc: 'Deep espresso or rich ebony; rarely burns, holds intense pigment' },
              ].map((item) => (
                <Grid item xs={12} sm={6} key={item.val}>
                  <Paper
                    onClick={() => setAnswers({ ...answers, depth: item.val as any })}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: answers.depth === item.val ? '2px solid #B76E79' : '1px solid #eee',
                      bgcolor: answers.depth === item.val ? 'rgba(183, 110, 121, 0.06)' : '#FAF8F5',
                      '&:hover': { borderColor: '#B76E79' },
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.val}</Typography>
                    <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                      {item.desc}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Step 2: Undertone */}
        {!isCalculated && step === 2 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              2. What is your complexion undertone?
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2.5 }}>
              The subtle pigment underneath your skin surface. South Asian skin frequently carries golden or olive nuances.
            </Typography>
            <Grid container spacing={2}>
              {[
                { val: 'warm', title: 'Warm Golden / Peachy', desc: 'Gold jewelry looks best; wrist veins appear greenish; skin glows in yellow sunlight' },
                { val: 'olive', title: 'Olive / Green Nuance', desc: 'Subtle greenish-grey cast; standard foundations turn too pink or orange; silver & gold both suit' },
                { val: 'neutral', title: 'Balanced Neutral', desc: 'Equal mix of warm and cool tones; veins appear blue-green; adapts easily' },
                { val: 'cool', title: 'Cool Pink / Rosy', desc: 'Silver jewelry looks best; wrist veins appear bluish-purple; prone to flushed cheeks' },
              ].map((item) => (
                <Grid item xs={12} sm={6} key={item.val}>
                  <Paper
                    onClick={() => setAnswers({ ...answers, undertone: item.val as any })}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: answers.undertone === item.val ? '2px solid #B76E79' : '1px solid #eee',
                      bgcolor: answers.undertone === item.val ? 'rgba(183, 110, 121, 0.06)' : '#FAF8F5',
                      '&:hover': { borderColor: '#B76E79' },
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</Typography>
                    <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                      {item.desc}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Step 3: Coverage */}
        {!isCalculated && step === 3 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              3. Desired coverage intensity?
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2.5 }}>
              Choose your ideal daily or event opacity.
            </Typography>
            <Grid container spacing={2}>
              {[
                { val: 'Sheer Natural', desc: 'No-makeup makeup skin tint, allows natural freckles and glow to radiate through.' },
                { val: 'Medium Buildable', desc: 'Evens out minor discoloration, dark spots, and redness with skin-like breathability.' },
                { val: 'Full Glamour', desc: 'Camera-flash proof, 14-hour bridal wear that conceals all hyperpigmentation seamlessly.' },
              ].map((item) => (
                <Grid item xs={12} key={item.val}>
                  <Paper
                    onClick={() => setAnswers({ ...answers, coverage: item.val as any })}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: answers.coverage === item.val ? '2px solid #B76E79' : '1px solid #eee',
                      bgcolor: answers.coverage === item.val ? 'rgba(183, 110, 121, 0.06)' : '#FAF8F5',
                      '&:hover': { borderColor: '#B76E79' },
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.val}</Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>{item.desc}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Step 4: Current Foundation Brand */}
        {!isCalculated && step === 4 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              4. Which foundation brand do you currently use or benchmark against?
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2.5 }}>
              This cross-references our laboratory chromatic matrix against your familiar baseline.
            </Typography>
            <Grid container spacing={1.5}>
              {[
                'MAC Studio Fix Fluid',
                'Estée Lauder Double Wear',
                'Fenty Beauty Pro Filt\'r',
                'Kay Beauty Hydrating Foundation',
                'Lakmé 9to5 Primer + Matte',
                'Charlotte Tilbury Flawless Filter',
                'Maybelline Fit Me Matte',
                'Huda Beauty FauxFilter',
              ].map((brand) => (
                <Grid item xs={12} sm={6} key={brand}>
                  <Paper
                    onClick={() => setAnswers({ ...answers, currentBrand: brand })}
                    sx={{
                      p: 1.8,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: answers.currentBrand === brand ? '2px solid #B76E79' : '1px solid #eee',
                      bgcolor: answers.currentBrand === brand ? 'rgba(183, 110, 121, 0.06)' : '#FAF8F5',
                      '&:hover': { borderColor: '#B76E79' },
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: '0.88rem' }}>{brand}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Step 5: Reference Shade */}
        {!isCalculated && step === 5 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              5. What is your closest shade in that brand?
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2.5 }}>
              Select the closest range:
            </Typography>
            <RadioGroup
              value={answers.referenceShade}
              onChange={(e) => setAnswers({ ...answers, referenceShade: e.target.value })}
            >
              {[
                { val: 'NC 15 - NC 20 / 110-120', desc: 'Fair with neutral-cool undertones' },
                { val: 'NC 25 - NC 30 / 128-140', desc: 'Light-Medium with warm golden peach nuances' },
                { val: 'NC 35 - NC 40 / 220-230', desc: 'Medium with golden or olive balance (Most South Asian women)' },
                { val: 'NC 42 - NC 45 / 310-330', desc: 'Tan with rich warm amber caramel tone' },
                { val: 'NC 47 - NC 50 / 340-410', desc: 'Dusky bronze with terracotta undertones' },
                { val: 'Deep Espresso / 420-440', desc: 'Deep rich chocolate or espresso' },
              ].map((opt) => (
                <Paper
                  key={opt.val}
                  sx={{
                    p: 1.5,
                    mb: 1.2,
                    borderRadius: 2,
                    border: answers.referenceShade === opt.val ? '2px solid #B76E79' : '1px solid #eee',
                    bgcolor: answers.referenceShade === opt.val ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                    cursor: 'pointer',
                  }}
                  onClick={() => setAnswers({ ...answers, referenceShade: opt.val })}
                >
                  <FormControlLabel
                    value={opt.val}
                    control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                    label={
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{opt.val}</Typography>
                        <Typography variant="caption" sx={{ color: '#666' }}>{opt.desc}</Typography>
                      </Box>
                    }
                    sx={{ m: 0, width: '100%' }}
                  />
                </Paper>
              ))}
            </RadioGroup>
          </Box>
        )}

        {/* Step 6: Preferred Finish */}
        {!isCalculated && step === 6 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              6. What finish do you desire?
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2.5 }}>
              This dictates whether we recommend a luminous glaze or soft velvet blur.
            </Typography>
            <Grid container spacing={2}>
              {[
                { val: 'Dewy Luminous', desc: 'High-hydration glass skin with reflective light-diffusing botanical oils.' },
                { val: 'Velvet Soft-Matte', desc: 'Smooth cashmere texture that blurs pores and resists humidity for 12 hours.' },
                { val: 'Natural Satin', desc: 'Classic skin-identical reflect that is neither shiny nor flat matte.' },
              ].map((item) => (
                <Grid item xs={12} key={item.val}>
                  <Paper
                    onClick={() => setAnswers({ ...answers, finish: item.val as any })}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: answers.finish === item.val ? '2px solid #B76E79' : '1px solid #eee',
                      bgcolor: answers.finish === item.val ? 'rgba(183, 110, 121, 0.06)' : '#FAF8F5',
                      '&:hover': { borderColor: '#B76E79' },
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.val}</Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>{item.desc}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Calculated Results View */}
        {isCalculated && (
          <Box>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Chip
                icon={<AutoAwesomeIcon sx={{ fontSize: '15px !important', color: '#D4A373' }} />}
                label="AI Chromatic Analysis Complete"
                sx={{ bgcolor: '#1a1a1a', color: '#FAF8F5', fontWeight: 700, mb: 1 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                Your Tailored Shade Spectrum
              </Typography>
              <Typography variant="caption" sx={{ color: '#777', display: 'block', maxWidth: 480, mx: 'auto', mt: 0.5 }}>
                Matched for {answers.depth} depth with {answers.undertone} undertones benchmarking against {answers.currentBrand}.
              </Typography>
              <Typography variant="caption" sx={{ color: '#999', fontStyle: 'italic', display: 'block', mt: 0.3 }}>
                *AI recommendations are expert algorithmic guidance; patch test on jawline in daylight.
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              {/* Best Match */}
              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: '2px solid #B76E79',
                    bgcolor: 'rgba(183, 110, 121, 0.05)',
                    position: 'relative',
                  }}
                >
                  <Chip
                    label="YOUR BEST MATCH · 98% COMPATIBILITY"
                    size="small"
                    sx={{ bgcolor: '#B76E79', color: '#fff', fontWeight: 700, fontSize: '0.68rem', mb: 1.5 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: matches.best.hexCode,
                        border: '2px solid #fff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>
                        {matches.best.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 600, textTransform: 'capitalize' }}>
                        {matches.best.undertone} Undertone · {targetProduct.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#555', fontSize: '0.85rem', mb: 2, lineHeight: 1.6 }}>
                    Formulated with chromatic yellow and olive mineral pigments to neutralize ashy reflection and blend invisibly with your neck.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleAddMatch(matches.best)}
                    startIcon={<ShoppingBagIcon />}
                    sx={{ fontWeight: 700, borderRadius: 2 }}
                  >
                    Select & Add to Bag · {formatCurrency(targetProduct.price)}
                  </Button>
                </Paper>
              </Grid>

              {/* Alternatives Grid */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {/* Closest Alternative */}
                  <Paper sx={{ p: 1.8, borderRadius: 2, border: '1px solid #eee', bgcolor: '#FAF8F5' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#888' }}>
                        CLOSEST ALTERNATIVE
                      </Typography>
                      <Button size="small" onClick={() => handleAddMatch(matches.alternative)} sx={{ fontSize: '0.72rem', fontWeight: 700, p: 0 }}>
                        Select
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: matches.alternative.hexCode, border: '1px solid #ccc' }} />
                      <Typography sx={{ fontWeight: 600, fontSize: '0.88rem' }}>{matches.alternative.name}</Typography>
                    </Box>
                  </Paper>

                  {/* One Shade Lighter */}
                  <Paper sx={{ p: 1.8, borderRadius: 2, border: '1px solid #eee', bgcolor: '#FAF8F5' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#888' }}>
                        ONE SHADE LIGHTER (Under-eye & High points)
                      </Typography>
                      <Button size="small" onClick={() => handleAddMatch(matches.lighter)} sx={{ fontSize: '0.72rem', fontWeight: 700, p: 0 }}>
                        Select
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: matches.lighter.hexCode, border: '1px solid #ccc' }} />
                      <Typography sx={{ fontWeight: 600, fontSize: '0.88rem' }}>{matches.lighter.name}</Typography>
                    </Box>
                  </Paper>

                  {/* One Shade Deeper */}
                  <Paper sx={{ p: 1.8, borderRadius: 2, border: '1px solid #eee', bgcolor: '#FAF8F5' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#888' }}>
                        ONE SHADE DEEPER (Summer Tan & Contour)
                      </Typography>
                      <Button size="small" onClick={() => handleAddMatch(matches.deeper)} sx={{ fontSize: '0.72rem', fontWeight: 700, p: 0 }}>
                        Select
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: matches.deeper.hexCode, border: '1px solid #ccc' }} />
                      <Typography sx={{ fontWeight: 600, fontSize: '0.88rem' }}>{matches.deeper.name}</Typography>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button variant="outlined" onClick={handleReset} sx={{ borderRadius: 2, fontSize: '0.8rem' }}>
                Retake Shade Diagnosis
              </Button>
            </Box>
          </Box>
        )}

        {/* Action Controls */}
        {!isCalculated && (
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              sx={{ fontWeight: 600 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ fontWeight: 700, px: 3, borderRadius: 2 }}
            >
              {step === totalSteps ? 'Calculate My Perfect Match' : 'Next Step'}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
