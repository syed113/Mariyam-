import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { FAQS } from '../data/mockData';

export const AboutContactPage: React.FC = () => {
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiry.name && inquiry.email && inquiry.message) {
      setSubmitted(true);
      setInquiry({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="xl">
        {/* Story Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 12 }}>
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative' }}>
              <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                <CardMedia
                  component="img"
                  image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Mariyam Lead Artist"
                  sx={{ height: 500, objectFit: 'cover' }}
                />
              </Card>
              <Paper
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: '#ffffff',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(183, 110, 121, 0.25)',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <Typography variant="h6" sx={{ color: '#B76E79', fontWeight: 700, fontSize: '0.9rem' }}>
                  10+ Years of Artistry
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  NYC Atelier & Destination Worldwide
                </Typography>
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
              The Story & Philosophy
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.6rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 3 }}>
              Meet Mariyam Maquillage
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.85, mb: 2.5 }}>
              Mariyam is an internationally celebrated makeup artist with over a decade of experience crafting high-impact glamour for modern brides, luxury fashion campaigns, and red carpets from Paris to New York.
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.85, mb: 3 }}>
              Her signature approach is rooted in dermatological skin preparation: understanding undertones, texture, lighting physics, and micro-blending so that skin breathes naturally while achieving an impervious, 16-hour camera-flash longevity.
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 4 }}>
              {[
                'Medical-Grade Tool Sanitation Protocol',
                'Fully Cruelty-Free & Dermatological Kit',
                'Custom Lash Cluster Mapping',
                'Worldwide Travel & Destination Weddings',
              ].map((point, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutlineIcon sx={{ color: '#B76E79', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                    {point}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Studio & Inquiry Form */}
        <Grid container spacing={6} sx={{ mb: 12 }}>
          {/* Contact Details & Hours */}
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 4, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid rgba(183, 110, 121, 0.2)', height: '100%' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3 }}>
                Studio Atelier
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <LocationOnIcon sx={{ color: '#B76E79', fontSize: 24, mt: 0.2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      Atelier Address
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      450 Madison Avenue, 8th Floor<br />New York, NY 10022
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <EmailIcon sx={{ color: '#B76E79', fontSize: 24, mt: 0.2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      Direct Correspondence
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      atelier@mariyam-maquillage.com
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <PhoneIcon sx={{ color: '#B76E79', fontSize: 24, mt: 0.2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      Studio Concierge
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      +1 (212) 555-4526
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <AccessTimeIcon sx={{ color: '#B76E79', fontSize: 24, mt: 0.2 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      Hours of Operation
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Tuesday – Sunday: 8:00 AM – 7:00 PM<br />Monday: Closed (or On-Set Travel)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Paper sx={{ p: 2.5, bgcolor: '#FAF8F5', borderRadius: 2, border: '1px dashed #d5c0b5' }}>
                <Typography variant="caption" sx={{ color: '#777', lineHeight: 1.6, display: 'block' }}>
                  ✨ <strong>Note for Destination Inquiries:</strong> Please specify flight dates, venue location, and expected call times so our travel coordinator can assemble logistics quickly.
                </Typography>
              </Paper>
            </Card>
          </Grid>

          {/* Quick Message Form */}
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 4, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid rgba(183, 110, 121, 0.2)' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                Send A Direct Message
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                Have questions regarding commercial contracts, destination rates, or editorial shoots? Send us a note below.
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Your message has been dispatched to Mariyam’s atelier desk. We will respond within 24 hours.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      value={inquiry.name}
                      onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={inquiry.email}
                      onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                      required
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Subject / Project Title"
                  placeholder="e.g., Destination Wedding Lake Como / Editorial Campaign"
                  value={inquiry.subject}
                  onChange={(e) => setInquiry({ ...inquiry, subject: e.target.value })}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Your Inquiry or Message"
                  placeholder="Share details on dates, venue, mood board, or questions..."
                  value={inquiry.message}
                  onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, letterSpacing: '0.08em' }}
                >
                  Send Message
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* FAQs Accordion */}
        <Box sx={{ maxWidth: 850, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
              Common Questions
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              Frequently Asked Questions
            </Typography>
          </Box>

          {FAQS.map((faq, idx) => (
            <Accordion
              key={idx}
              sx={{
                mb: 1.5,
                borderRadius: 2,
                border: '1px solid rgba(183, 110, 121, 0.15)',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#B76E79' }} />}>
                <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1rem' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
