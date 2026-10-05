import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Grid,
  Chip,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useStore } from '../../context/StoreContext';
import { checkPincodeServiceability } from '../../data/catalogData';

const POPULAR_HUBS = [
  { city: 'Bengaluru', pincode: '560038', area: 'Indiranagar Hub', express: true, badge: 'Next-Day Express' },
  { city: 'Bengaluru', pincode: '560034', area: 'Koramangala Hub', express: true, badge: 'Next-Day Express' },
  { city: 'Bengaluru', pincode: '560066', area: 'Whitefield Hub', express: true, badge: 'Next-Day Express' },
  { city: 'Bhopal', pincode: '462016', area: 'Arera Colony Hub', express: true, badge: 'Local Priority Hub' },
  { city: 'Bhopal', pincode: '462023', area: 'MP Nagar Hub', express: true, badge: 'Local Priority Hub' },
  { city: 'Bhopal', pincode: '462001', area: 'Old City Hub', express: true, badge: 'Local Priority Hub' },
  { city: 'Delhi NCR', pincode: '110001', area: 'Connaught Place Central', express: true, badge: 'Metro Express' },
  { city: 'Mumbai', pincode: '400001', area: 'South Mumbai Central', express: true, badge: 'Metro Express' },
  { city: 'Hyderabad', pincode: '500001', area: 'Banjara / Central Hub', express: true, badge: 'Metro Express' },
];

export const CitySelectorModal: React.FC = () => {
  const { isCityModalOpen, setIsCityModalOpen, selectedCity, selectedPincode, setSelectedCityAndPincode } = useStore();
  const [customPin, setCustomPin] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelectHub = (city: string, pin: string) => {
    setSelectedCityAndPincode(city, pin);
    setFeedback(`Delivering to ${city} (${pin})`);
    setTimeout(() => {
      setFeedback(null);
      setIsCityModalOpen(false);
    }, 400);
  };

  const handleCheckCustomPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPin.trim() || customPin.trim().length !== 6) {
      setFeedback('Please enter a valid 6-digit Indian pincode.');
      return;
    }
    const info = checkPincodeServiceability(customPin.trim());
    if (info.serviceable) {
      setSelectedCityAndPincode(info.city, info.pincode);
      setFeedback(`✓ ${info.city}, ${info.state} serviceable (${info.estimatedDays} days delivery)!`);
      setTimeout(() => {
        setFeedback(null);
        setIsCityModalOpen(false);
      }, 700);
    } else {
      setFeedback('Currently not serviceable for express courier. Showing standard dispatch.');
    }
  };

  return (
    <Dialog
      open={isCityModalOpen}
      onClose={() => setIsCityModalOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          bgcolor: '#ffffff',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon sx={{ color: '#B76E79' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.02em' }}>
            Choose Delivery Location
          </Typography>
        </Box>
        <IconButton onClick={() => setIsCityModalOpen(false)} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ color: '#666', mb: 2.5, lineHeight: 1.6 }}>
          Select your local fulfilment hub or enter your pincode for accurate stock availability, next-day courier routing, and Cash on Delivery verification.
        </Typography>

        {/* Custom Pincode Input */}
        <Box component="form" onSubmit={handleCheckCustomPin} sx={{ display: 'flex', gap: 1.2, mb: 3 }}>
          <TextField
            size="small"
            placeholder="Enter 6-digit Pincode (e.g. 560001, 462001)"
            value={customPin}
            onChange={(e) => setCustomPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
            fullWidth
            sx={{
              bgcolor: '#FAF8F5',
              borderRadius: 2,
              '& .MuiInputBase-input': { fontSize: '0.88rem' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 3, fontWeight: 700, borderRadius: 2, whiteSpace: 'nowrap' }}
          >
            Apply
          </Button>
        </Box>

        {feedback && (
          <Paper sx={{ p: 1.2, mb: 2.5, bgcolor: '#FFF6F7', border: '1px solid rgba(183, 110, 121, 0.2)', borderRadius: 2 }}>
            <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 600 }}>
              {feedback}
            </Typography>
          </Paper>
        )}

        <Typography variant="caption" sx={{ fontWeight: 700, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', mb: 1.5 }}>
          Priority Fulfilment Hubs (Bengaluru & Bhopal)
        </Typography>

        <Grid container spacing={1.5}>
          {POPULAR_HUBS.map((hub) => {
            const isSelected = selectedPincode === hub.pincode;
            return (
              <Grid item xs={12} sm={6} key={hub.pincode}>
                <Paper
                  onClick={() => handleSelectHub(hub.city, hub.pincode)}
                  sx={{
                    p: 1.8,
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: isSelected ? '2px solid #B76E79' : '1px solid #eee',
                    bgcolor: isSelected ? 'rgba(183, 110, 121, 0.06)' : '#FAF8F5',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#B76E79',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      {hub.city} · {hub.pincode}
                    </Typography>
                    {isSelected && <CheckCircleIcon sx={{ fontSize: 18, color: '#B76E79' }} />}
                  </Box>
                  <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                    {hub.area}
                  </Typography>
                  <Chip
                    icon={<FlashOnIcon sx={{ fontSize: '13px !important' }} />}
                    label={hub.badge}
                    size="small"
                    sx={{
                      mt: 1,
                      height: 20,
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      bgcolor: '#fff',
                      color: '#8C4852',
                      border: '1px solid rgba(183, 110, 121, 0.3)',
                    }}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0eae4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: '#888' }}>
            Current: <strong>{selectedCity} ({selectedPincode})</strong>
          </Typography>
          <Button size="small" onClick={() => setIsCityModalOpen(false)} sx={{ fontWeight: 700, color: '#B76E79' }}>
            Done
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
