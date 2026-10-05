import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Chip,
  Grid,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { PortfolioLook } from '../types';

interface LookDetailModalProps {
  look: PortfolioLook | null;
  onClose: () => void;
}

export const LookDetailModal: React.FC<LookDetailModalProps> = ({ look, onClose }) => {
  if (!look) return null;

  return (
    <Dialog
      open={Boolean(look)}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: '#FAF8F5',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10,
            bgcolor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={look.imageUrl}
              alt={look.title}
              sx={{
                width: '100%',
                height: { xs: 300, md: '100%' },
                minHeight: { md: 480 },
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <DialogContent sx={{ p: { xs: 3, md: 4 }, flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Chip
                  label={look.category}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(183, 110, 121, 0.15)',
                    color: '#8C4852',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#777', fontSize: '0.75rem' }}>
                  <AccessTimeIcon sx={{ fontSize: 15 }} />
                  <span>{look.duration}</span>
                </Box>
              </Box>

              <Typography variant="h4" sx={{ color: '#1a1a1a', fontWeight: 700, mb: 1, lineHeight: 1.2 }}>
                {look.title}
              </Typography>

              <Typography variant="subtitle2" sx={{ color: '#B76E79', fontWeight: 600, mb: 2, letterSpacing: '0.05em' }}>
                {look.clientType}
              </Typography>

              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, mb: 3 }}>
                {look.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2.5 }}>
                <Typography variant="h6" sx={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: '#1a1a1a', mb: 1 }}>
                  Artistry Method & Focus
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <AutoAwesomeIcon sx={{ color: '#D4A373', fontSize: 18, mt: 0.2 }} />
                  <Typography variant="body2" sx={{ color: '#444', fontStyle: 'italic' }}>
                    {look.keyTechnique}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: '#1a1a1a', mb: 1.2 }}>
                  Hero Products Used
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                  {look.productsUsed.map((prod, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleOutlineIcon sx={{ color: '#B76E79', fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: '#333', fontSize: '0.85rem' }}>
                        {prod}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ pt: 1 }}>
                <Button
                  component={Link}
                  to="/booking"
                  onClick={onClose}
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.3,
                    borderRadius: 2,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  Book Look Experience
                </Button>
              </Box>
            </DialogContent>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};
