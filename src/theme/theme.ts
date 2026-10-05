import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#B76E79', // Rose gold
      light: '#D4A373',
      dark: '#8C4852',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1A1A1A', // Deep Editorial Black
      light: '#333333',
      dark: '#0A0A0A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAF8F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#242424',
      secondary: '#666666',
    },
    divider: 'rgba(183, 110, 121, 0.18)',
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h3: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    h4: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    h5: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      fontSize: '0.85rem',
    },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 14px rgba(183, 110, 121, 0.25)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #B76E79 0%, #D4A373 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #A45D68 0%, #C39263 100%)',
          },
        },
        outlinedPrimary: {
          borderColor: '#B76E79',
          color: '#8C4852',
          '&:hover': {
            borderColor: '#8C4852',
            backgroundColor: 'rgba(183, 110, 121, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(183, 110, 121, 0.12)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(183, 110, 121, 0.12)',
          },
        },
      },
    },
  },
});
