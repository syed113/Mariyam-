import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Avatar,
  Paper,
  Chip,
  Fade,
  Slide,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useStore } from '../../context/StoreContext';
import { ChatMessage, Product } from '../../types';
import { formatCurrency } from '../../utils/format';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'advisor',
    text: "Bonjour! I am Mariyam, your AI Beauty Concierge. Whether you need an exact foundation shade match, a customized barrier skincare routine, or event glam recommendations, I am here to help you look your most radiant.",
    timestamp: 'Just now',
  },
];

const SUGGESTIONS = [
  'Best foundation for dry/combination skin?',
  'How to find my exact undertone?',
  'Recommend a routine for dark spots & glow',
  'Transfer-proof lipstick for weddings',
];

export const BeautyAdvisorChatbot: React.FC = () => {
  const { isAdvisorOpen, setIsAdvisorOpen, products, addToCart } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAdvisorOpen) {
      scrollToBottom();
    }
  }, [messages, isAdvisorOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // AI Response generation logic based on query analysis
    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = '';
      let recommended: Product[] = [];

      if (lower.includes('foundation') || lower.includes('shade') || lower.includes('undertone')) {
        reply = "For seamless camera-proof wear without cakey dryness, I highly recommend our Royal Silk Luminous Foundation. If you have golden or olive nuances, Warm Almond 35W or Golden Sand 25W will illuminate your skin naturally. Don't forget to lock it with our 24K Micro-Mist!";
        recommended = products.filter((p) => p.subcategory === 'Foundation' || p.name.includes('Foundation') || p.id === 'mm-prod-1' || p.id === 'mm-prod-3').slice(0, 2);
      } else if (lower.includes('dry') || lower.includes('hydration') || lower.includes('barrier') || lower.includes('winter')) {
        reply = "When skin feels dehydrated, makeup tends to separate around the nose. Start with a hydrating peptide glaze to flood the skin with moisture, and restore the intercellular barrier with a rich ceramide night cream.";
        recommended = products.filter((p) => p.department === 'Skincare' || p.category === 'Skincare').slice(0, 2);
      } else if (lower.includes('lipstick') || lower.includes('lip') || lower.includes('wedding')) {
        reply = "For weddings and festive dinners, you need a formula that won't feather or transfer onto glasses. Our Hydra-Velvet Matte Liquid Lipstick in Bombay Nude or Sindoor Crimson gives 12-hour comfortable suede wear without flaking.";
        recommended = products.filter((p) => p.subcategory === 'Lipstick' || p.name.includes('Lipstick') || p.id === 'mm-prod-2').slice(0, 2);
      } else if (lower.includes('acne') || lower.includes('pore') || lower.includes('oil') || lower.includes('spot')) {
        reply = "For pore congestion and excess shine, use our Botanical Clarifying Gel Cleanser with encapsulated actives. Pair it with an airbrush compact powder to set and blur without clogging pores.";
        recommended = products.filter((p) => p.subcategory === 'Compact Powder' || (p.concerns && p.concerns.some(c => c.toLowerCase().includes('acne')))).slice(0, 2);
      } else if (lower.includes('routine') || lower.includes('glow') || lower.includes('prep')) {
        reply = "Here is my signature Glass-Skin Glamour Prep: 1) Cleanse gently with Botanical Gel Cleanser, 2) Press 3 drops of Peptide Glaze for bouncy radiance, 3) Smooth Royal Silk Foundation, and 4) Seal with 24K Setting Spray.";
        recommended = products.filter((p) => p.brand === 'Mariyam Maquillage').slice(0, 2);
      } else {
        reply = `Thank you for asking! Based on our artistry philosophy, the most radiant results come from nourishing the skin barrier and using micro-milled pigments that adapt to your facial contours. Here are our top hero essentials:`;
        recommended = products.slice(0, 2);
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'advisor',
        text: reply,
        timestamp: 'Just now',
        recommendedProducts: recommended,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 1, product.shades?.[0]);
    setAddedItemName(product.name);
    setTimeout(() => setAddedItemName(null), 2500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isAdvisorOpen && (
        <Slide in={!isAdvisorOpen} direction="up">
          <Paper
            elevation={4}
            onClick={() => setIsAdvisorOpen(true)}
            sx={{
              position: 'fixed',
              bottom: { xs: 20, md: 32 },
              right: { xs: 20, md: 32 },
              zIndex: 1200,
              bgcolor: '#1a1a1a',
              color: '#ffffff',
              borderRadius: 30,
              px: 2.5,
              py: 1.4,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              border: '1px solid rgba(212, 163, 115, 0.4)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'scale(1.04)',
                boxShadow: '0 12px 35px rgba(183, 110, 121, 0.35)',
              },
            }}
          >
            <Avatar
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
              sx={{ width: 34, height: 34, border: '2px solid #D4A373' }}
            />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', lineHeight: 1.1 }}>
                Ask Mariyam AI
              </Typography>
              <Typography variant="caption" sx={{ color: '#D4A373', fontSize: '0.7rem' }}>
                Beauty Advisor Online
              </Typography>
            </Box>
          </Paper>
        </Slide>
      )}

      {/* Chat Window Dialog */}
      {isAdvisorOpen && (
        <Fade in={isAdvisorOpen}>
          <Paper
            elevation={6}
            sx={{
              position: 'fixed',
              bottom: { xs: 10, sm: 24 },
              right: { xs: 10, sm: 24 },
              width: { xs: 'calc(100vw - 20px)', sm: 380, md: 410 },
              height: { xs: '85vh', sm: 580 },
              maxHeight: '90vh',
              zIndex: 1300,
              borderRadius: 3,
              bgcolor: '#FAF8F5',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(183, 110, 121, 0.25)',
              boxShadow: '0 16px 50px rgba(0,0,0,0.18)',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,
                bgcolor: '#1a1a1a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  sx={{ width: 38, height: 38, border: '2px solid #D4A373' }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.92rem', lineHeight: 1.2 }}>
                    Mariyam AI Concierge
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                    <Typography variant="caption" sx={{ color: '#D4A373', fontSize: '0.72rem' }}>
                      24/7 Virtual Beauty Expert
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <IconButton size="small" onClick={() => setIsAdvisorOpen(false)} sx={{ color: '#fff' }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Notification Toast for Quick Add */}
            {addedItemName && (
              <Box sx={{ bgcolor: '#E8F5E9', p: 1, px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ color: '#2E7D32', fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                  Added {addedItemName} to your bag!
                </Typography>
              </Box>
            )}

            {/* Message Stream */}
            <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      p: 1.8,
                      borderRadius: 2.5,
                      maxWidth: '85%',
                      bgcolor: msg.sender === 'user' ? '#B76E79' : '#ffffff',
                      color: msg.sender === 'user' ? '#ffffff' : '#222',
                      border: msg.sender === 'advisor' ? '1px solid rgba(183, 110, 121, 0.15)' : 'none',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: '0.86rem', lineHeight: 1.6 }}>
                      {msg.text}
                    </Typography>
                  </Box>

                  {/* Embedded Recommended Products */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <Box sx={{ mt: 1.5, width: '100%', maxWidth: '90%' }}>
                      <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 700, mb: 1, display: 'block' }}>
                        Recommended Formulations:
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {msg.recommendedProducts.map((p) => (
                          <Paper
                            key={p.id}
                            sx={{
                              p: 1.2,
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 1.5,
                              border: '1px solid #e8e2dc',
                              bgcolor: '#FFFDFB',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, overflow: 'hidden' }}>
                              <Box
                                component="img"
                                src={p.images[0]}
                                alt={p.name}
                                sx={{ width: 44, height: 44, borderRadius: 1.2, objectFit: 'cover' }}
                              />
                              <Box sx={{ minWidth: 0 }}>
                                <Typography variant="subtitle2" noWrap sx={{ fontSize: '0.8rem', fontWeight: 700 }}>
                                  {p.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#B76E79', fontWeight: 700 }}>
                                  {formatCurrency(p.price)}
                                </Typography>
                              </Box>
                            </Box>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handleQuickAdd(p)}
                              startIcon={<ShoppingBagIcon sx={{ fontSize: 14 }} />}
                              sx={{
                                py: 0.6,
                                px: 1.2,
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                borderRadius: 1.5,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Add
                            </Button>
                          </Paper>
                        ))}
                      </Box>
                    </Box>
                  )}

                  <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#999', mt: 0.4, px: 0.5 }}>
                    {msg.timestamp}
                  </Typography>
                </Box>
              ))}

              {isTyping && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                  <AutoAwesomeIcon sx={{ fontSize: 16, color: '#D4A373' }} />
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#777' }}>
                    Mariyam is analyzing your beauty profile...
                  </Typography>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>

            {/* Quick Suggestions Chips */}
            <Box sx={{ px: 2, py: 1, bgcolor: '#ffffff', borderTop: '1px solid #f0eae4', overflowX: 'auto', display: 'flex', gap: 0.8 }}>
              {SUGGESTIONS.map((s, i) => (
                <Chip
                  key={i}
                  label={s}
                  size="small"
                  onClick={() => handleSendMessage(s)}
                  sx={{
                    fontSize: '0.72rem',
                    bgcolor: 'rgba(183, 110, 121, 0.08)',
                    color: '#8C4852',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(183, 110, 121, 0.16)' },
                  }}
                />
              ))}
            </Box>

            {/* Input Bar */}
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              sx={{
                p: 1.5,
                bgcolor: '#ffffff',
                borderTop: '1px solid rgba(183, 110, 121, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <TextField
                size="small"
                fullWidth
                placeholder="Ask Mariyam anything about skin, shades..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                sx={{
                  bgcolor: '#FAF8F5',
                  borderRadius: 2,
                  '& .MuiInputBase-input': { fontSize: '0.85rem' },
                }}
              />
              <IconButton
                type="submit"
                color="primary"
                disabled={!inputValue.trim()}
                sx={{
                  bgcolor: '#B76E79',
                  color: '#fff',
                  '&:hover': { bgcolor: '#8C4852' },
                  '&.Mui-disabled': { bgcolor: '#e0d5ce', color: '#fff' },
                }}
              >
                <SendIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Paper>
        </Fade>
      )}
    </>
  );
};
