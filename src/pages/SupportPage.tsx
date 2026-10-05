import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { useStore } from '../context/StoreContext';

const FAQ_LIST = [
  {
    cat: 'Orders & Delivery',
    q: 'How fast is express delivery to Bengaluru and Bhopal?',
    a: 'Orders placed before 2:00 PM for Bengaluru (Whitefield, Indiranagar, Koramangala) and Bhopal (Arera Colony, MP Nagar) are dispatched the same day for next-day doorstep delivery. All other pan-India metros take 2-3 business days.',
  },
  {
    cat: 'Authenticity Guarantee',
    q: 'Are all cosmetics and serums 100% authentic?',
    a: 'Yes. Every single product is sourced directly from brand laboratories and authorized Indian distributors. Each shipment features a tamper-evident holographic seal and batch serial codes verifiable with manufacturers.',
  },
  {
    cat: 'Returns & Replacements',
    q: 'What is the return policy if my shade does not match?',
    a: 'We offer an easy 15-day return and exchange policy on all intact, sealed items. If you used our AI Shade Matcher, our Beauty Concierge will gladly assist in an exchange for your adjacent shade harmony.',
  },
  {
    cat: 'Payments & COD',
    q: 'Is Cash on Delivery (COD) available across India?',
    a: 'Yes, Cash on Delivery is available across 18,000+ Indian pincodes without any hidden surcharge on orders above ₹499.',
  },
  {
    cat: 'Damaged / Missing Items',
    q: 'What if an item arrives damaged in transit?',
    a: 'Every luxury parcel is thermally padded. In the rare event of transit damage, submit a ticket below with a photo, and our team will issue an immediate replacement or full UPI/Card refund within 24 hours.',
  },
];

export const SupportPage: React.FC = () => {
  const { tickets, createSupportTicket, orders, user, setIsAdvisorOpen } = useStore();

  const [formCategory, setFormCategory] = useState<any>('Track Order');
  const [selectedOrder, setSelectedOrder] = useState<string>(orders[0]?.orderNumber || '');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const created = createSupportTicket({
      orderNumber: selectedOrder || undefined,
      customerName: name,
      email,
      phone,
      category: formCategory,
      subject,
      message,
    });

    setTicketSuccess(`Support Ticket #${created.ticketId} successfully submitted! Our concierge team responds within 2 business hours.`);
    setSubject('');
    setMessage('');
    setTimeout(() => setTicketSuccess(null), 8000);
  };

  return (
    <Box sx={{ bgcolor: '#FAF8F5', minHeight: '100vh', pb: 12 }}>
      {/* Care Banner */}
      <Box sx={{ bgcolor: '#161616', color: '#FAF8F5', py: { xs: 7, md: 10 }, borderBottom: '1px solid rgba(212, 163, 115, 0.25)' }}>
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: 760 }}>
            <Chip
              icon={<SupportAgentIcon sx={{ fontSize: '15px !important', color: '#D4A373' }} />}
              label="MARIYAM CARE · 24/7 DEDICATED CONCIERGE"
              sx={{ bgcolor: 'rgba(212, 163, 115, 0.15)', color: '#D4A373', fontWeight: 700, mb: 2, letterSpacing: '0.1em' }}
            />
            <Typography variant="h1" sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: '2.5rem', md: '3.8rem' }, fontWeight: 600, mb: 1.5 }}>
              How May Our Atelier Assist You?
            </Typography>
            <Typography variant="body1" sx={{ color: '#ccc', fontSize: '1.05rem', lineHeight: 1.7, mb: 3 }}>
              From live courier tracking and shade exchanges to authenticity verification and bridal appointments, our beauty concierge team is here for your every need.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setIsAdvisorOpen(true)}
              startIcon={<AutoAwesomeIcon sx={{ color: '#D4A373' }} />}
              sx={{
                bgcolor: '#fff',
                color: '#1a1a1a',
                fontWeight: 700,
                borderRadius: 2,
                px: 3,
                py: 1.2,
                '&:hover': { bgcolor: '#f0eae4' },
              }}
            >
              Chat With AI Beauty Advisor Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Support Grid */}
      <Container maxWidth="xl" sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          {/* Left: Raise a Ticket & Returns Form */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3.5, bgcolor: '#ffffff', border: '1px solid #ece4dc' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <AssignmentTurnedInIcon sx={{ color: '#B76E79' }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                  Raise a Support or Return Ticket
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                Every request receives a tracked Ticket ID with direct updates via SMS and email.
              </Typography>

              {ticketSuccess && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  {ticketSuccess}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmitTicket} sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formCategory}
                    label="Category"
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <MenuItem value="Track Order">Track Order & Courier OTP</MenuItem>
                    <MenuItem value="Returns & Refunds">Return or Shade Exchange</MenuItem>
                    <MenuItem value="Damaged/Missing Item">Report Damaged or Missing Item</MenuItem>
                    <MenuItem value="Authenticity Query">Authenticity & Batch Verification</MenuItem>
                    <MenuItem value="Payment Issue">Payment / Refund Status</MenuItem>
                    <MenuItem value="Beauty Advice">Custom Formulation / Shade Advice</MenuItem>
                  </Select>
                </FormControl>

                {orders.length > 0 && (
                  <FormControl fullWidth size="small">
                    <InputLabel>Associated Order</InputLabel>
                    <Select
                      value={selectedOrder}
                      label="Associated Order"
                      onChange={(e) => setSelectedOrder(e.target.value)}
                    >
                      <MenuItem value="">None / General Inquiry</MenuItem>
                      {orders.map((o) => (
                        <MenuItem key={o.id} value={o.orderNumber}>
                          {o.orderNumber} — Placed {o.date} ({o.status})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Your Name"
                      size="small"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone Number"
                      size="small"
                      fullWidth
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Email Address"
                  size="small"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <TextField
                  label="Subject"
                  size="small"
                  fullWidth
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Return request for Golden Sand Foundation"
                  required
                />

                <TextField
                  label="Detailed Message"
                  multiline
                  rows={4}
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide any batch numbers, shade details, or courier concerns..."
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ py: 1.3, borderRadius: 2, fontWeight: 700 }}
                >
                  Generate Ticket & Submit
                </Button>
              </Box>
            </Paper>

            {/* Existing Active Tickets List */}
            {tickets.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                  Your Active Support Tickets ({tickets.length})
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {tickets.map((tkt) => (
                    <Paper key={tkt.id} sx={{ p: 2.5, borderRadius: 2.5, bgcolor: '#ffffff', border: '1px solid #e8e2dc' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#B76E79' }}>
                          {tkt.ticketId} · {tkt.category}
                        </Typography>
                        <Chip
                          label={tkt.status}
                          size="small"
                          sx={{
                            bgcolor: tkt.status === 'Resolved' ? '#E8F5E9' : '#FFF3E0',
                            color: tkt.status === 'Resolved' ? '#2E7D32' : '#E65100',
                            fontWeight: 700,
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 0.5 }}>
                        {tkt.subject}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1.5 }}>
                        {tkt.message}
                      </Typography>
                      {tkt.replyNote && (
                        <Box sx={{ p: 1.5, bgcolor: '#FAF8F5', borderRadius: 1.5, borderLeft: '3px solid #B76E79' }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852', display: 'block' }}>
                            Atelier Concierge Response:
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#444' }}>
                            {tkt.replyNote}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}
          </Grid>

          {/* Right: FAQs and Help Channels */}
          <Grid item xs={12} md={6}>
            {/* Quick Contact Affordances */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {[
                { title: 'Bengaluru & Bhopal Hubs', desc: 'Direct express dispatch support', icon: <LocalShippingIcon sx={{ color: '#B76E79' }} /> },
                { title: 'Clinical Authenticity', desc: 'Tamper-evident holographic pack', icon: <VerifiedUserIcon sx={{ color: '#D4A373' }} /> },
                { title: 'UPI & Instant Refund', desc: 'Refunds processed within 24 hours', icon: <PaymentIcon sx={{ color: '#B76E79' }} /> },
              ].map((item, idx) => (
                <Grid item xs={12} sm={4} key={idx}>
                  <Paper sx={{ p: 2, borderRadius: 2.5, bgcolor: '#ffffff', border: '1px solid #eee', textAlign: 'center', height: '100%' }}>
                    <Box sx={{ mb: 1 }}>{item.icon}</Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.82rem' }}>{item.title}</Typography>
                    <Typography variant="caption" sx={{ color: '#777' }}>{item.desc}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Accordion FAQs */}
            <Paper sx={{ p: 3.5, borderRadius: 3.5, bgcolor: '#ffffff', border: '1px solid #ece4dc' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <HelpOutlineIcon sx={{ color: '#B76E79' }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Frequently Answered Inquiries
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                Answers to our most common delivery, payment, and formulation questions.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {FAQ_LIST.map((faq, i) => (
                  <Accordion
                    key={i}
                    elevation={0}
                    sx={{
                      border: '1px solid #eee',
                      borderRadius: '12px !important',
                      '&:before': { display: 'none' },
                      bgcolor: '#FAF8F5',
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#B76E79' }} />}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.92rem', color: '#1a1a1a' }}>
                        {faq.q}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                      <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, fontSize: '0.88rem' }}>
                        {faq.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
