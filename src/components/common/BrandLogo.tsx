import React from 'react';
import { Box, Typography } from '@mui/material';
import { getBrandInfo } from '../../data/brandData';

interface BrandLogoProps {
  brandName: string;
  variant?: 'dark' | 'light' | 'auto';
  height?: number | string;
  showTextFallback?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  brandName,
  variant = 'auto',
  height = 20,
  showTextFallback = true,
}) => {
  const brand = getBrandInfo(brandName);
  const logoSrc = variant === 'dark' ? (brand.logoDark || brand.logo) : (brand.logoLight || brand.logo);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        maxWidth: 160,
      }}
      title={brand.brandName}
    >
      <Box
        component="img"
        src={logoSrc}
        alt={`${brand.brandName} logo`}
        referrerPolicy="no-referrer"
        sx={{
          height: '100%',
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
        onError={(e) => {
          // If image fails, replace with clean text fallback
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.nextElementSibling) {
            (target.nextElementSibling as HTMLElement).style.display = 'inline-block';
          }
        }}
      />
      {showTextFallback && (
        <Typography
          variant="caption"
          sx={{
            display: 'none',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: variant === 'dark' ? '#ffffff' : '#1a1a1a',
            fontSize: '0.75rem',
          }}
        >
          {brand.brandName}
        </Typography>
      )}
    </Box>
  );
};
