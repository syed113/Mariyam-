import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Chip,
  Paper,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PaletteIcon from '@mui/icons-material/Palette';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Link } from 'react-router-dom';

interface QuizState {
  eventType: string;
  undertone: string;
  finish: string;
  eyeFocus: string;
}

export const ShadeMatchTool: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizState>({
    eventType: 'Bridal',
    undertone: 'Warm Golden',
    finish: 'Velvet Semi-Matte',
    eyeFocus: 'Rose Gold Shimmer',
  });

  const [result, setResult] = useState<any | null>(null);

  const calculateResult = () => {
    let title = 'The Gilded Romance Signature Look';
    let palette = ['#E2B29F', '#C5A059', '#784B3D', '#EAD7D1', '#5B3A29'];
    let lip = 'Bespoke Nude Rose Velvet with Champagne Glaze';
    let prep = 'Hyaluronic Acid Plumping Ampoule + Micro-Glow Strobe Cream';
    let packageMatch = 'The Signature Bridal Experience';

    if (answers.eventType === 'Red Carpet') {
      title = 'The Hollywood Siren Haute Glam';
      palette = ['#1C1C1C', '#9E2A2B', '#D4AF37', '#E5D4C0', '#4A154B'];
      lip = 'Classic Blue-Based Crimson or Deep Espresso Ombré';
      prep = 'Cold Gua Sha Lymphatic Sculpt + 24-Hour Matte Lock Base';
      packageMatch = 'Red Carpet & Special Occasion';
    } else if (answers.eventType === 'Cocktail') {
      title = 'Midnight Bronze & Silk Glow';
      palette = ['#8A5A36', '#DDA15E', '#BC6C25', '#283618', '#606C38'];
      lip = 'Caramel Toffee Satin with Warm Peach Liner';
      prep = 'Lactic Micro-Peel Pad + Peptide Glaze';
      packageMatch = 'Red Carpet & Special Occasion';
    } else if (answers.eventType === 'Natural') {
      title = 'The French Riviera Clean Glow';
      palette = ['#E0AFA0', '#F4ACB7', '#9D8189', '#D8E2DC', '#FFE5D9'];
      lip = 'Berry Tinted Balm with Feathered Edge';
      prep = 'Ceramide Moisture Barrier Infusion + Dewy Face Mist';
      packageMatch = '1-on-1 Masterclass & Makeup Bag Audit';
    }

    setResult({
      title,
      palette,
      lip,
      prep,
      packageMatch,
      undertoneNote: `Tailored for ${answers.undertone} undertones with a ${answers.finish} complexion finish.`,
    });
    setStep(5);
  };

  const resetQuiz = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <Card
      sx={{
        p: { xs: 3, md: 5 },
        bgcolor: '#ffffff',
        border: '1px solid rgba(183, 110, 121, 0.2)',
        borderRadius: 4,
        boxShadow: '0 10px 40px rgba(183, 110, 121, 0.08)',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Chip
          icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
          label="Bespoke Beauty Consultation"
          sx={{
            bgcolor: 'rgba(183, 110, 121, 0.12)',
            color: '#8C4852',
            fontWeight: 700,
            mb: 1.5,
          }}
        />
        <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 1 }}>
          Discover Your Signature Look & Palette
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', maxWidth: 600, mx: 'auto' }}>
          Answer 4 quick beauty questions to receive Mariyam&apos;s tailored color harmony, skin preparation protocol, and bespoke service recommendation.
        </Typography>
      </Box>

      {step <= 4 && (
        <Box sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#888' }}>
              Step {step} of 4
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#B76E79' }}>
              {Math.round((step / 4) * 100)}% Completed
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(step / 4) * 100}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'rgba(183, 110, 121, 0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#B76E79',
              },
            }}
          />
        </Box>
      )}

      {/* Step 1: Occasion */}
      {step === 1 && (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
            What is the event or vision you are preparing for?
          </Typography>
          <RadioGroup
            value={answers.eventType}
            onChange={(e) => setAnswers({ ...answers, eventType: e.target.value })}
          >
            {[
              { val: 'Bridal', label: 'Wedding & Bridal (Bride, Veil, Full Celebration)' },
              { val: 'Red Carpet', label: 'Red Carpet, Gala & Black Tie Premiere' },
              { val: 'Cocktail', label: 'Evening Soirée, Milestone Birthday, or Party' },
              { val: 'Natural', label: 'Effortless Everyday Mastery & Masterclass' },
            ].map((item) => (
              <Paper
                key={item.val}
                elevation={0}
                sx={{
                  p: 1.5,
                  mb: 1.5,
                  borderRadius: 2,
                  border: answers.eventType === item.val ? '2px solid #B76E79' : '1px solid #EAEAEA',
                  bgcolor: answers.eventType === item.val ? 'rgba(183, 110, 121, 0.04)' : '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => setAnswers({ ...answers, eventType: item.val })}
              >
                <FormControlLabel
                  value={item.val}
                  control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                  label={<Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.label}</Typography>}
                  sx={{ width: '100%', m: 0 }}
                />
              </Paper>
            ))}
          </RadioGroup>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => setStep(2)}
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: 2 }}
            >
              Next Step
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 2: Undertone */}
      {step === 2 && (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
            What is your natural skin undertone?
          </Typography>
          <RadioGroup
            value={answers.undertone}
            onChange={(e) => setAnswers({ ...answers, undertone: e.target.value })}
          >
            {[
              { val: 'Warm Golden', label: 'Warm Golden / Yellow / Peachy (Gold jewelry looks radiant on you)' },
              { val: 'Cool Rose', label: 'Cool Rose / Pink / Blue (Silver jewelry looks most harmonious)' },
              { val: 'Neutral Olive', label: 'Neutral Olive / Subdued Greenish or Muted (Both gold and silver flatter)' },
              { val: 'Deep Rich', label: 'Deep Rich / Espresso with Red or Bronze Nuances' },
            ].map((item) => (
              <Paper
                key={item.val}
                elevation={0}
                sx={{
                  p: 1.5,
                  mb: 1.5,
                  borderRadius: 2,
                  border: answers.undertone === item.val ? '2px solid #B76E79' : '1px solid #EAEAEA',
                  bgcolor: answers.undertone === item.val ? 'rgba(183, 110, 121, 0.04)' : '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => setAnswers({ ...answers, undertone: item.val })}
              >
                <FormControlLabel
                  value={item.val}
                  control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                  label={<Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.label}</Typography>}
                  sx={{ width: '100%', m: 0 }}
                />
              </Paper>
            ))}
          </RadioGroup>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="text" onClick={() => setStep(1)} sx={{ color: '#666' }}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => setStep(3)}
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: 2 }}
            >
              Next Step
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 3: Finish */}
      {step === 3 && (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
            Which skin finish reflects your personal aesthetic?
          </Typography>
          <RadioGroup
            value={answers.finish}
            onChange={(e) => setAnswers({ ...answers, finish: e.target.value })}
          >
            {[
              { val: 'Velvet Semi-Matte', label: 'Velvet Soft-Matte: Flawless blur, camera flash-proof, zero shine.' },
              { val: 'Dewy Glass Skin', label: 'Radiant Glass Skin: Lit-from-within glow, moisture-rich, ultra luminous.' },
              { val: 'Satin Natural Glow', label: 'Balanced Natural Satin: Authentic skin look with subtle strategic highlight.' },
            ].map((item) => (
              <Paper
                key={item.val}
                elevation={0}
                sx={{
                  p: 1.5,
                  mb: 1.5,
                  borderRadius: 2,
                  border: answers.finish === item.val ? '2px solid #B76E79' : '1px solid #EAEAEA',
                  bgcolor: answers.finish === item.val ? 'rgba(183, 110, 121, 0.04)' : '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => setAnswers({ ...answers, finish: item.val })}
              >
                <FormControlLabel
                  value={item.val}
                  control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                  label={<Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.label}</Typography>}
                  sx={{ width: '100%', m: 0 }}
                />
              </Paper>
            ))}
          </RadioGroup>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="text" onClick={() => setStep(2)} sx={{ color: '#666' }}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => setStep(4)}
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: 2 }}
            >
              Next Step
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 4: Eye Glam */}
      {step === 4 && (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
            What is your favorite eye makeup emphasis?
          </Typography>
          <RadioGroup
            value={answers.eyeFocus}
            onChange={(e) => setAnswers({ ...answers, eyeFocus: e.target.value })}
          >
            {[
              { val: 'Rose Gold Shimmer', label: 'Rose Gold / Champagne Shimmer with Soft Lash Elongation' },
              { val: 'Smoked Wing', label: 'Dramatic Espresso or Charcoal Smoked Winged Liner' },
              { val: 'Cut-Crease', label: 'Defined Sculpted Cut-Crease with High Dimension' },
              { val: 'Barely-There', label: 'Soft Watercolor Wash & Natural Feathered Lashes' },
            ].map((item) => (
              <Paper
                key={item.val}
                elevation={0}
                sx={{
                  p: 1.5,
                  mb: 1.5,
                  borderRadius: 2,
                  border: answers.eyeFocus === item.val ? '2px solid #B76E79' : '1px solid #EAEAEA',
                  bgcolor: answers.eyeFocus === item.val ? 'rgba(183, 110, 121, 0.04)' : '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => setAnswers({ ...answers, eyeFocus: item.val })}
              >
                <FormControlLabel
                  value={item.val}
                  control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                  label={<Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.label}</Typography>}
                  sx={{ width: '100%', m: 0 }}
                />
              </Paper>
            ))}
          </RadioGroup>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="text" onClick={() => setStep(3)} sx={{ color: '#666' }}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={calculateResult}
              endIcon={<AutoAwesomeIcon />}
              sx={{ borderRadius: 2 }}
            >
              Generate My Beauty Prescription
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 5: Result Card */}
      {step === 5 && result && (
        <Box sx={{ maxWidth: 750, mx: 'auto', p: { xs: 2, md: 3 }, bgcolor: '#FAF8F5', borderRadius: 3, border: '1px solid #E5D5C5' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="overline" sx={{ color: '#B76E79', letterSpacing: '0.2em', fontWeight: 700 }}>
              Custom Beauty Prescription
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
              {result.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic', mt: 0.5 }}>
              {result.undertoneNote}
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Color Palette */}
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <PaletteIcon sx={{ color: '#B76E79', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                    Harmonized Color Palette
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                  {result.palette.map((color: string, i: number) => (
                    <Box
                      key={i}
                      sx={{
                        flex: 1,
                        height: 48,
                        borderRadius: 1.5,
                        bgcolor: color,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.08)',
                      }}
                      title={color}
                    />
                  ))}
                </Box>
                <Typography variant="caption" sx={{ color: '#777', display: 'block' }}>
                  Flattering shades: Champagne ivory base, burnished gold lid reflect, soft cocoa contour, warm terracotta flush.
                </Typography>
              </Paper>
            </Grid>

            {/* Lip & Skin Details */}
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2.5, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" sx={{ fontSize: '0.8rem', letterSpacing: '0.1em', mb: 1 }}>
                  Signature Lip Formula
                </Typography>
                <Typography variant="body2" sx={{ color: '#8C4852', fontWeight: 600, mb: 2 }}>
                  {result.lip}
                </Typography>

                <Typography variant="h6" sx={{ fontSize: '0.8rem', letterSpacing: '0.1em', mb: 1 }}>
                  Pre-Glam Skin Treatment
                </Typography>
                <Typography variant="body2" sx={{ color: '#444' }}>
                  {result.prep}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Paper sx={{ p: 2.5, borderRadius: 2, bgcolor: '#ffffff', mb: 3, border: '1px solid rgba(183, 110, 121, 0.3)' }}>
            <Typography variant="h6" sx={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: '#B76E79', mb: 0.5 }}>
              Recommended Experience Package
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
              {result.packageMatch}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Our signature treatment tailored with your specified color palette, lash placement, and skin longevity requirements.
            </Typography>
            <Button
              component={Link}
              to="/booking"
              variant="contained"
              sx={{ px: 3, py: 1.2, borderRadius: 2, fontWeight: 700 }}
            >
              Book This Experience Now
            </Button>
          </Paper>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="text"
              startIcon={<RestartAltIcon />}
              onClick={resetQuiz}
              sx={{ color: '#777', fontSize: '0.8rem' }}
            >
              Retake Consultation Quiz
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
};
