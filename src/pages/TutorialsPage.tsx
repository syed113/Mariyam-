import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BrushIcon from '@mui/icons-material/Brush';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { TUTORIALS } from '../data/mockData';
import { Tutorial } from '../types';

export const TutorialsPage: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial>(TUTORIALS[0]);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 7, maxWidth: 750, mx: 'auto' }}>
          <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
            The Beauty Journal
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.6rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 2 }}>
            Masterclass Guides & Pro Secrets
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
            Curated techniques directly from Mariyam’s studio chair. Discover how to prep skin for humidity, execute seamless graphic wings, and time your bridal aesthetic journey.
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {/* Main Article Display */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: '#ffffff', border: '1px solid rgba(183, 110, 121, 0.2)', p: { xs: 3, md: 5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                <Chip
                  label={selectedTutorial.category}
                  sx={{ bgcolor: 'rgba(183, 110, 121, 0.15)', color: '#8C4852', fontWeight: 700 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#777', fontSize: '0.8rem' }}>
                  <AccessTimeIcon sx={{ fontSize: 16 }} />
                  <span>{selectedTutorial.readTime}</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#777', fontSize: '0.8rem' }}>
                  <CalendarTodayIcon sx={{ fontSize: 16 }} />
                  <span>{selectedTutorial.date}</span>
                </Box>
              </Box>

              <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3, lineHeight: 1.2 }}>
                {selectedTutorial.title}
              </Typography>

              <CardMedia
                component="img"
                image={selectedTutorial.coverImage}
                alt={selectedTutorial.title}
                sx={{ width: '100%', height: { xs: 260, md: 420 }, objectFit: 'cover', borderRadius: 2, mb: 4 }}
              />

              <Typography variant="body1" sx={{ color: '#444', fontSize: '1.05rem', lineHeight: 1.8, mb: 4, fontStyle: 'italic', bgcolor: '#FAF8F5', p: 2.5, borderRadius: 2, borderLeft: '4px solid #B76E79' }}>
                &ldquo;{selectedTutorial.summary}&rdquo;
              </Typography>

              {/* Step By Step Accordion */}
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2.5 }}>
                Step-by-Step Execution
              </Typography>

              <Box sx={{ mb: 4 }}>
                {selectedTutorial.steps.map((st) => (
                  <Accordion
                    key={st.stepNumber}
                    defaultExpanded={st.stepNumber === 1}
                    sx={{
                      mb: 1.5,
                      borderRadius: 2,
                      border: '1px solid #ECECEC',
                      '&:before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#B76E79' }} />}>
                      <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '0.95rem' }}>
                        Step {st.stepNumber}: {st.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8 }}>
                        {st.instruction}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Pro Artist Secrets */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#8C4852', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoAwesomeIcon sx={{ color: '#D4A373' }} />
                  Mariyam’s Studio Golden Rules:
                </Typography>
                {selectedTutorial.proTips.map((tip, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                    <CheckCircleOutlineIcon sx={{ color: '#B76E79', fontSize: 18, mt: 0.2 }} />
                    <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.6 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Recommended Kit Tools */}
              <Paper sx={{ p: 3, bgcolor: '#FAF8F5', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BrushIcon sx={{ color: '#B76E79', fontSize: 18 }} />
                  Essential Tools For This Look:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedTutorial.recommendedTools.map((tool, idx) => (
                    <Chip key={idx} label={tool} sx={{ bgcolor: '#ffffff', border: '1px solid #ddd', fontWeight: 600, fontSize: '0.8rem' }} />
                  ))}
                </Box>
              </Paper>
            </Card>
          </Grid>

          {/* Sidebar / More Guides */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: { lg: 'sticky' }, top: { lg: 100 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3 }}>
                All Journal Guides
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {TUTORIALS.map((tut) => {
                  const isCurrent = tut.id === selectedTutorial.id;
                  return (
                    <Card
                      key={tut.id}
                      onClick={() => setSelectedTutorial(tut)}
                      sx={{
                        cursor: 'pointer',
                        borderRadius: 3,
                        border: isCurrent ? '2px solid #B76E79' : '1px solid #EAEAEA',
                        bgcolor: isCurrent ? 'rgba(183, 110, 121, 0.04)' : '#ffffff',
                        transition: 'all 0.25s ease',
                        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' },
                      }}
                    >
                      <Grid container>
                        <Grid item xs={4}>
                          <CardMedia
                            component="img"
                            image={tut.coverImage}
                            alt={tut.title}
                            sx={{ height: '100%', minHeight: 110, objectFit: 'cover' }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <CardContent sx={{ p: 2 }}>
                            <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700 }}>
                              {tut.category}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3, mt: 0.5 }}>
                              {tut.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#777', mt: 1, display: 'block' }}>
                              {tut.readTime}
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  );
                })}
              </Box>

              {/* Private Masterclass promo banner */}
              <Paper
                sx={{
                  mt: 4,
                  p: 3.5,
                  borderRadius: 3,
                  bgcolor: '#1a1a1a',
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              >
                <AutoAwesomeIcon sx={{ color: '#D4A373', fontSize: 32, mb: 1 }} />
                <Typography variant="h5" sx={{ fontFamily: '"Cormorant Garamond", serif', color: '#D4A373', mb: 1 }}>
                  Want In-Person Hands-On Training?
                </Typography>
                <Typography variant="body2" sx={{ color: '#ccc', mb: 3, fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Book our 2.5-hour 1-on-1 private masterclass. Mariyam audits your kit and teaches your face shape step-by-step.
                </Typography>
                <Button
                  component="a"
                  href="/booking?service=masterclass-private"
                  variant="contained"
                  sx={{
                    bgcolor: '#D4A373',
                    color: '#1a1a1a',
                    fontWeight: 700,
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#c39263' },
                  }}
                >
                  Reserve Masterclass ($295)
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
