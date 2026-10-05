import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Divider,
  Paper,
  Alert,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SERVICE_PACKAGES, ADD_ON_OPTIONS } from '../data/mockData';
import { BookingFormData } from '../types';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get('service') || 'bridal-signature';

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceId: initialServiceId,
    eventDate: '',
    eventTime: '10:00',
    locationType: 'studio',
    eventAddress: '',
    partySize: 1,
    selectedAddOns: [],
    specialRequests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const sId = searchParams.get('service');
    if (sId && SERVICE_PACKAGES.some((s) => s.id === sId)) {
      setFormData((prev) => ({ ...prev, serviceId: sId }));
    }
  }, [searchParams]);

  const selectedService = useMemo(() => {
    return SERVICE_PACKAGES.find((s) => s.id === formData.serviceId) || SERVICE_PACKAGES[0];
  }, [formData.serviceId]);

  // Calculate pricing breakdown
  const pricing = useMemo(() => {
    const basePrice = selectedService.price;
    const additionalGuests = Math.max(0, formData.partySize - 1);
    const guestFee = additionalGuests * 185; // $185 per extra bridal party member

    let addOnsTotal = 0;
    formData.selectedAddOns.forEach((addonId) => {
      const opt = ADD_ON_OPTIONS.find((a) => a.id === addonId);
      if (opt) addOnsTotal += opt.price;
    });

    const locationFee = formData.locationType === 'on-location' ? 75 : 0;
    const subtotal = basePrice + guestFee + addOnsTotal + locationFee;
    const retainer = Math.round(subtotal * 0.3); // 30% retainer to secure date

    return {
      basePrice,
      guestFee,
      addOnsTotal,
      locationFee,
      subtotal,
      retainer,
    };
  }, [selectedService, formData.partySize, formData.selectedAddOns, formData.locationType]);

  const handleAddOnToggle = (addonId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedAddOns.includes(addonId);
      return {
        ...prev,
        selectedAddOns: exists
          ? prev.selectedAddOns.filter((id) => id !== addonId)
          : [...prev.selectedAddOns, addonId],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.eventDate) {
      setErrorMsg('Please complete all required fields (Name, Email, Phone, and Event Date).');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Box sx={{ py: 12, bgcolor: '#FAF8F5', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: 4,
              border: '1px solid rgba(183, 110, 121, 0.25)',
              boxShadow: '0 15px 45px rgba(183, 110, 121, 0.1)',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 72, color: '#B76E79', mb: 2 }} />
            <Typography variant="overline" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.2em' }}>
              Booking Request Received
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 1, mb: 2 }}>
              Thank You, {formData.fullName}!
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', maxWidth: 560, mx: 'auto', mb: 4, lineHeight: 1.8 }}>
              We have reserved your preliminary date hold for <strong>{formData.eventDate}</strong> at{' '}
              <strong>{formData.eventTime}</strong>. Mariyam’s studio manager will review your party details and send your official contract and retainer invoice to <strong>{formData.email}</strong> within 24 hours.
            </Typography>

            <Box sx={{ bgcolor: '#FAF8F5', p: 3, borderRadius: 2, maxWidth: 500, mx: 'auto', mb: 4, textAlign: 'left' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#1a1a1a' }}>
                Summary of Requested Reservation:
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', mb: 0.5 }}>
                • <strong>Service:</strong> {selectedService.title} (${selectedService.price})
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', mb: 0.5 }}>
                • <strong>Party Size:</strong> {formData.partySize} {formData.partySize === 1 ? 'person' : 'people'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', mb: 0.5 }}>
                • <strong>Location:</strong> {formData.locationType === 'studio' ? 'Madison Ave Studio' : `On-Location: ${formData.eventAddress || 'To be specified'}`}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', mb: 0.5 }}>
                • <strong>Estimated Total:</strong> ${pricing.subtotal} (30% Retainer: ${pricing.retainer})
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => setIsSubmitted(false)}
              sx={{ borderRadius: 2, px: 4, py: 1.2, fontWeight: 700 }}
            >
              Submit Another Reservation Inquiry
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 750, mx: 'auto' }}>
          <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
            Schedule Artistry
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.6rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 2 }}>
            Reserve Your Experience
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
            Select your preferred package, date, and luxury enhancements. Receive an instant preliminary estimate and lock in your priority appointment.
          </Typography>
        </Box>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            {errorMsg}
          </Alert>
        )}

        <Grid container spacing={5}>
          {/* Left Form Col */}
          <Grid item xs={12} md={7}>
            <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid rgba(183, 110, 121, 0.2)' }}>
              <Box component="form" onSubmit={handleSubmit}>
                {/* 1. Service Selection */}
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoAwesomeIcon sx={{ color: '#B76E79', fontSize: 22 }} />
                  1. Choose Artistry Service
                </Typography>

                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel id="service-select-label">Select Package</InputLabel>
                  <Select
                    labelId="service-select-label"
                    value={formData.serviceId}
                    label="Select Package"
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  >
                    {SERVICE_PACKAGES.map((pkg) => (
                      <MenuItem key={pkg.id} value={pkg.id}>
                        {pkg.title} — ${pkg.price} ({pkg.duration})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* 2. Date, Time & Location */}
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarMonthIcon sx={{ color: '#B76E79', fontSize: 22 }} />
                  2. Event Date & Venue
                </Typography>

                <Grid container spacing={2.5} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Event Date"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Preferred Start Time"
                      type="time"
                      value={formData.eventTime}
                      onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
                        Glamour Location Preference:
                      </Typography>
                      <RadioGroup
                        row
                        value={formData.locationType}
                        onChange={(e) => setFormData({ ...formData, locationType: e.target.value as 'studio' | 'on-location' })}
                      >
                        <FormControlLabel value="studio" control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />} label="Madison Ave Studio, NYC" />
                        <FormControlLabel value="on-location" control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />} label="On-Location / Hotel / Venue (+$75 travel base)" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {formData.locationType === 'on-location' && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Venue or Hotel Address"
                        placeholder="e.g., The Plaza Hotel, Fifth Ave Suite 402, New York"
                        value={formData.eventAddress}
                        onChange={(e) => setFormData({ ...formData, eventAddress: e.target.value })}
                        InputProps={{
                          startAdornment: <LocationOnIcon sx={{ color: '#B76E79', mr: 1 }} />,
                        }}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Total Party Size"
                      type="number"
                      inputProps={{ min: 1, max: 15 }}
                      value={formData.partySize}
                      onChange={(e) => setFormData({ ...formData, partySize: Math.max(1, parseInt(e.target.value) || 1) })}
                      helperText="Includes bride/host + bridesmaids or guests ($185/guest)"
                    />
                  </Grid>
                </Grid>

                {/* 3. Luxury Add-Ons */}
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2, mt: 4 }}>
                  3. Luxury Enhancements (Optional)
                </Typography>

                <Box sx={{ mb: 4 }}>
                  {ADD_ON_OPTIONS.map((opt) => (
                    <Paper
                      key={opt.id}
                      elevation={0}
                      sx={{
                        p: 1.5,
                        mb: 1.5,
                        borderRadius: 2,
                        border: formData.selectedAddOns.includes(opt.id)
                          ? '2px solid #B76E79'
                          : '1px solid #e5e5e5',
                        bgcolor: formData.selectedAddOns.includes(opt.id)
                          ? 'rgba(183, 110, 121, 0.05)'
                          : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleAddOnToggle(opt.id)}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.selectedAddOns.includes(opt.id)}
                            sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                {opt.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#666' }}>
                                {opt.description}
                              </Typography>
                            </Box>
                            <Typography variant="subtitle2" sx={{ color: '#B76E79', fontWeight: 700, ml: 2 }}>
                              +${opt.price}
                            </Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                  ))}
                </Box>

                {/* 4. Client Contact Details */}
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2.5 }}>
                  4. Contact Information
                </Typography>

                <Grid container spacing={2.5} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Legal Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Special Requests, Skin Allergies, or Vision"
                      placeholder="Tell us about your dress neckline, wedding theme, inspiration, or any sensitive skin considerations..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ py: 1.8, borderRadius: 2, fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.1em' }}
                >
                  Confirm & Reserve Date
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Right Summary Col */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
              <Card sx={{ p: 4, borderRadius: 3, bgcolor: '#FAF8F5', border: '1px solid rgba(183, 110, 121, 0.25)' }}>
                <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.15em' }}>
                  Reservation Overview
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 1 }}>
                  {selectedService.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#777', display: 'block', mb: 3 }}>
                  Estimated Duration: {selectedService.duration}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      Base Package:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${pricing.basePrice}
                    </Typography>
                  </Box>

                  {formData.partySize > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#555' }}>
                        Additional Guests ({formData.partySize - 1} × $185):
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        +${pricing.guestFee}
                      </Typography>
                    </Box>
                  )}

                  {pricing.locationFee > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#555' }}>
                        On-Location Travel Base:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        +${pricing.locationFee}
                      </Typography>
                    </Box>
                  )}

                  {pricing.addOnsTotal > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#555' }}>
                        Selected Add-Ons ({formData.selectedAddOns.length}):
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        +${pricing.addOnsTotal}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                    Total Estimated:
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#B76E79' }}>
                    ${pricing.subtotal}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 3 }}>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Date Security Retainer (30%):
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#8C4852', fontWeight: 700 }}>
                    ${pricing.retainer}
                  </Typography>
                </Box>

                <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2, border: '1px dashed #d5c0b5' }}>
                  <Typography variant="caption" sx={{ color: '#666', lineHeight: 1.6, display: 'block' }}>
                    🔒 <strong>Peace of Mind Guarantee:</strong> Your date is held for 48 hours without obligation while contract details are tailored to your schedule.
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
