import React, { useEffect } from 'react';
import { Product } from '../../types';

interface SeoHeadProps {
  title?: string;
  description?: string;
  product?: Product;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ title, description, product }) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | Mariyam Maquillage`
      : 'Mariyam Maquillage | Luxury Indian Beauty & AI Shade Studio';
    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        description ||
          'Luxury Indian beauty-commerce destination featuring AI precision shade matching, personalized skincare consultations, bridal ateliers, and curated premium cosmetics.'
      );
    }

    // Inject Schema.org JSON-LD
    let schemaJson: any = {
      '@context': 'https://schema.org',
      '@type': 'BeautySalon',
      name: 'Mariyam Maquillage',
      description:
        'Luxury Indian beauty-commerce destination featuring AI precision shade matching, personalized skincare consultations, and bridal ateliers.',
      url: 'https://www.mariyammaquillage.com',
      telephone: '+91-98450-12345',
      priceRange: '₹₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, Credit Card, UPI, Net Banking',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Atelier Suites, Vittal Mallya Rd, Indiranagar',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560001',
        addressCountry: 'IN',
      },
    };

    if (product) {
      schemaJson = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: product.images,
        description: product.description,
        sku: product.sku,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        offers: {
          '@type': 'Offer',
          url: window.location.href,
          priceCurrency: 'INR',
          price: product.price,
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: Math.max(1, product.reviewCount),
        },
      };
    }

    const scriptId = 'mariyam-schema-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaJson);
  }, [title, description, product]);

  return null;
};
