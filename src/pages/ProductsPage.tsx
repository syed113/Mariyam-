import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Drawer,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCategory } from '../types';
import { formatCurrency } from '../utils/format';

const CATEGORIES: ProductCategory[] = ['All', 'Makeup', 'Skincare', 'Haircare', 'Fragrance', 'Bath & Body'];
const BRANDS = [
  'Mariyam Maquillage',
  'Charlotte Tilbury',
  'Dior',
  'Huda Beauty',
  'NARS',
  'Kay Beauty',
  'Lakmé',
  'SUGAR Cosmetics',
  'PAC Cosmetics',
  'Minimalist',
  'Laneige',
];
const SKIN_TYPES = ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'];

export const ProductsPage: React.FC = () => {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = (searchParams.get('cat') as ProductCategory) || 'All';
  const searchParam = searchParams.get('search') || '';

  const [category, setCategory] = useState<ProductCategory>(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) setCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (searchParam) setSearchQuery(searchParam);
  }, [searchParam]);

  const handleCategoryChange = (newCat: ProductCategory) => {
    setCategory(newCat);
    if (newCat === 'All') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', newCat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setCategory('All');
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedSkinTypes([]);
    setPriceRange([0, 5000]);
    setSortBy('featured');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    const result = products.filter((p) => {
      // Category
      if (category !== 'All' && p.category !== category) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }
      // Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      // Skin Type
      if (selectedSkinTypes.length > 0) {
        const matchesSkin = selectedSkinTypes.some((st) => p.skinTypeCompatibility.includes(st as any));
        if (!matchesSkin) return false;
      }
      // Price
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

      return true;
    });

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [products, category, searchQuery, selectedBrands, selectedSkinTypes, priceRange, sortBy]);

  const filterSidebar = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      {/* Brands */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, letterSpacing: '0.04em' }}>
          Brand
        </Typography>
        <FormGroup>
          {BRANDS.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  size="small"
                  checked={selectedBrands.includes(brand)}
                  onChange={(e) => {
                    if (e.target.checked) setSelectedBrands([...selectedBrands, brand]);
                    else setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                  }}
                  sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' }, p: 0.6 }}
                />
              }
              label={<Typography sx={{ fontSize: '0.85rem' }}>{brand}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Price Slider */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: '0.04em' }}>
            Price Range
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#B76E79' }}>
            {formatCurrency(priceRange[0])} – {formatCurrency(priceRange[1])}
          </Typography>
        </Box>
        <Slider
          value={priceRange}
          onChange={(_, val) => setPriceRange(val as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          step={50}
          sx={{ color: '#B76E79' }}
        />
      </Box>

      {/* Skin Type Compatibility */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, letterSpacing: '0.04em' }}>
          Skin Type Suitability
        </Typography>
        <FormGroup>
          {SKIN_TYPES.map((st) => (
            <FormControlLabel
              key={st}
              control={
                <Checkbox
                  size="small"
                  checked={selectedSkinTypes.includes(st)}
                  onChange={(e) => {
                    if (e.target.checked) setSelectedSkinTypes([...selectedSkinTypes, st]);
                    else setSelectedSkinTypes(selectedSkinTypes.filter((s) => s !== st));
                  }}
                  sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' }, p: 0.6 }}
                />
              }
              label={<Typography sx={{ fontSize: '0.85rem' }}>{st}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Reset Button */}
      <Button
        variant="outlined"
        size="small"
        startIcon={<RestartAltIcon />}
        onClick={handleResetFilters}
        sx={{ borderRadius: 2, fontSize: '0.8rem', mt: 1 }}
      >
        Reset All Filters
      </Button>
    </Box>
  );

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="xl">
        {/* Header Title */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
            Complete Collection
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3.4rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
            {category === 'All' ? 'All Beauty Formulations' : `${category} Collection`}
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ mb: 5, borderBottom: '1px solid rgba(183, 110, 121, 0.18)' }}>
          <Tabs
            value={category}
            onChange={(_, val) => handleCategoryChange(val)}
            centered
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': { bgcolor: '#B76E79', height: 3 },
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.06em',
                color: '#666',
                '&.Mui-selected': { color: '#8C4852' },
              },
            }}
          >
            {CATEGORIES.map((cat) => (
              <Tab key={cat} label={cat} value={cat} />
            ))}
          </Tabs>
        </Box>

        {/* Controls Bar: Search, Mobile Filter, Sort */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 2.5,
            bgcolor: '#ffffff',
            border: '1px solid rgba(183, 110, 121, 0.14)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Search Field */}
          <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 260 } }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search by product name, ingredient, or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#B76E79', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#FAF8F5', borderRadius: 2 } }}
            />
          </Box>

          {/* Mobile Filter Button */}
          <Button
            variant="outlined"
            size="small"
            startIcon={<FilterListIcon />}
            onClick={() => setMobileFilterOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, borderRadius: 2 }}
          >
            Filters
          </Button>

          {/* Results Count & Sort Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#777', fontWeight: 600 }}>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </Typography>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="featured">Featured First</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="newest">New Arrivals</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {/* Main Layout: Sidebar + Grid */}
        <Grid container spacing={4}>
          {/* Desktop Filter Sidebar */}
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(183, 110, 121, 0.15)',
              }}
            >
              {filterSidebar}
            </Paper>
          </Grid>

          {/* Products Grid */}
          <Grid item xs={12} md={9}>
            {filteredProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#ffffff', borderRadius: 3, p: 4, border: '1px solid #eee' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}>
                  No products found
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                  Try relaxing your search terms or resetting price filters.
                </Typography>
                <Button variant="contained" onClick={handleResetFilters} sx={{ borderRadius: 2, fontWeight: 700 }}>
                  Reset Filters
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredProducts.map((p) => (
                  <Grid item xs={12} sm={6} lg={4} key={p.id}>
                    <ProductCard product={p} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        PaperProps={{ sx: { width: 300, p: 3, bgcolor: '#FAF8F5' } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filter Catalog
          </Typography>
          <IconButton onClick={() => setMobileFilterOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {filterSidebar}
      </Drawer>
    </Box>
  );
};
