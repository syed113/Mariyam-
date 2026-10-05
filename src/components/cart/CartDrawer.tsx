import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
  LinearProgress,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/format';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    amountToFreeShipping,
    freeShippingThreshold,
    appliedPromo,
    applyPromo,
    removePromo,
  } = useStore();

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromo(promoInput);
    if (success) {
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try LUXE20 or GLAM15');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - amountToFreeShipping) / freeShippingThreshold) * 100));

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 420 },
          maxWidth: '100%',
          bgcolor: '#FAF8F5',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2.5, bgcolor: '#ffffff', borderBottom: '1px solid rgba(183, 110, 121, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingBagOutlinedIcon sx={{ color: '#B76E79' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.05em' }}>
            Shopping Bag ({cart.length})
          </Typography>
        </Box>
        <IconButton onClick={() => setIsCartOpen(false)} sx={{ color: '#666' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Free Shipping Progress Indicator */}
      <Box sx={{ p: 2, bgcolor: '#FFF6F7', borderBottom: '1px solid rgba(183, 110, 121, 0.12)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <LocalShippingOutlinedIcon sx={{ fontSize: 18, color: '#B76E79' }} />
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#8C4852' }}>
            {amountToFreeShipping > 0
              ? `Add ${formatCurrency(amountToFreeShipping)} more for COMPLIMENTARY shipping!`
              : '🎉 You have unlocked COMPLIMENTARY luxury shipping!'}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: 'rgba(183, 110, 121, 0.15)',
            '& .MuiLinearProgress-bar': { bgcolor: '#B76E79' },
          }}
        />
      </Box>

      {/* Cart Items List */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
        {cart.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 60, color: '#D4A373', mb: 2, opacity: 0.6 }} />
            <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 600, mb: 1 }}>
              Your shopping bag is empty
            </Typography>
            <Typography variant="body2" sx={{ color: '#777', mb: 3 }}>
              Explore our runway foundations, lipsticks, and skin elixirs.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setIsCartOpen(false);
                navigate('/shop');
              }}
              sx={{ borderRadius: 2, fontWeight: 700 }}
            >
              Explore Products
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 1.5,
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  border: '1px solid rgba(183, 110, 121, 0.12)',
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 76,
                    height: 76,
                    objectFit: 'cover',
                    borderRadius: 1.5,
                    border: '1px solid #eee',
                  }}
                />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3, fontSize: '0.85rem' }}>
                        {item.name}
                      </Typography>
                      <IconButton size="small" onClick={() => removeFromCart(item.id)} sx={{ color: '#999', p: 0.2 }}>
                        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 600, display: 'block' }}>
                      {item.brand}
                    </Typography>
                    {item.selectedShade && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.4 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.selectedShade.hexCode, border: '1px solid #ccc' }} />
                        <Typography variant="caption" sx={{ color: '#666' }}>
                          Shade: {item.selectedShade.name}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    {/* Stepper */}
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1 }}>
                      <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} sx={{ p: 0.3 }}>
                        <RemoveIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      <Typography sx={{ px: 1, fontSize: '0.8rem', fontWeight: 600 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)} sx={{ p: 0.3 }}>
                        <AddIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>

                    {/* Price */}
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      {formatCurrency(item.price * item.quantity)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Footer & Checkout Panel */}
      {cart.length > 0 && (
        <Box sx={{ p: 2.5, bgcolor: '#ffffff', borderTop: '1px solid rgba(183, 110, 121, 0.15)' }}>
          {/* Promo code */}
          {appliedPromo ? (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 1, bgcolor: '#F0F9F0', borderRadius: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlineIcon sx={{ color: '#2E7D32', fontSize: 18 }} />
                <Typography variant="caption" sx={{ color: '#2E7D32', fontWeight: 700 }}>
                  {appliedPromo.code} Applied ({appliedPromo.discountPercent}% OFF)
                </Typography>
              </Box>
              <Button size="small" color="error" onClick={removePromo} sx={{ minWidth: 'auto', p: 0, fontSize: '0.75rem' }}>
                Remove
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleApplyPromo} sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                placeholder="Promo Code (e.g. LUXE20)"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError('');
                }}
                fullWidth
                sx={{
                  '& .MuiInputBase-input': { fontSize: '0.82rem', py: 1 },
                  bgcolor: '#FAF8F5',
                }}
              />
              <Button type="submit" variant="outlined" sx={{ fontWeight: 700, fontSize: '0.75rem', px: 2 }}>
                Apply
              </Button>
            </Box>
          )}

          {promoError && (
            <Alert severity="error" sx={{ mb: 1.5, py: 0, fontSize: '0.75rem' }}>
              {promoError}
            </Alert>
          )}

          {/* Pricing calculations */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#666' }}>Subtotal</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCurrency(cartSubtotal)}</Typography>
            </Box>
            {cartDiscount > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#2E7D32' }}>Promotional Discount</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#2E7D32' }}>-{formatCurrency(cartDiscount)}</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#666' }}>Shipping</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {cartShipping === 0 ? <span style={{ color: '#2E7D32' }}>FREE</span> : formatCurrency(cartShipping)}
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#B76E79' }}>{formatCurrency(cartTotal)}</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleProceedCheckout}
            endIcon={<ArrowForwardIcon />}
            sx={{ py: 1.4, borderRadius: 2, fontWeight: 700, letterSpacing: '0.08em' }}
          >
            Checkout Securely
          </Button>

          <Typography variant="caption" sx={{ color: '#888', display: 'block', textAlign: 'center', mt: 1.5 }}>
            🔒 256-Bit SSL Encrypted Checkout · 30-Day Free Returns
          </Typography>
        </Box>
      )}
    </Drawer>
  );
};
