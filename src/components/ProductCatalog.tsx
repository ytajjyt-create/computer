import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, RotateCcw, Search, Check } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  compareList: Product[];
  initialCategory?: ProductCategory;
  categoryFilter?: ProductCategory;
  setCategoryFilter?: (cat: ProductCategory) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onViewProduct,
  onAddToCart,
  onToggleCompare,
  compareList,
  initialCategory = 'all',
  categoryFilter: controlledCategory,
  setCategoryFilter: setControlledCategory,
}) => {
  const [internalCategory, setInternalCategory] = useState<ProductCategory>(initialCategory);
  const activeCategory = controlledCategory || internalCategory;
  const setActiveCategory = setControlledCategory || setInternalCategory;

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [catalogSearch, setCatalogSearch] = useState<string>('');

  // Extract unique brands for the brand filter
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return ['all', ...Array.from(set).sort()];
  }, [products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        // Brand
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
        // In Stock
        if (inStockOnly && !p.inStock) return false;
        // Max Price
        if (p.price > maxPrice) return false;
        // Search
        if (catalogSearch.trim()) {
          const q = catalogSearch.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchSpecs = p.specs.some((s) => s.value.toLowerCase().includes(q));
          if (!matchName && !matchBrand && !matchSpecs) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default featured
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [products, activeCategory, selectedBrand, inStockOnly, maxPrice, catalogSearch, sortBy]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSelectedBrand('all');
    setInStockOnly(false);
    setMaxPrice(5000);
    setCatalogSearch('');
    setSortBy('featured');
  };

  const isFiltered =
    activeCategory !== 'all' ||
    selectedBrand !== 'all' ||
    inStockOnly ||
    maxPrice < 5000 ||
    catalogSearch.trim() !== '';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Horizontal Segmented Navigation */}
      <div className="border-b border-slate-800 pb-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-display font-bold text-white">
              Hardware Catalog &amp; Systems
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Showing {filteredProducts.length} enthusiast-grade components &amp; builds
            </p>
          </div>

          {/* Reset Filters if active */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          )}
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ProductCategory)}
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls Bar: Search, Brand, Price, Sort */}
      <div className="bg-[#0b101c] border border-slate-800/80 rounded-xl p-4 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {/* Quick Filter Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter within results..."
            value={catalogSearch}
            onChange={(e) => setCatalogSearch(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 text-xs text-slate-200 rounded-lg pl-9 pr-3 py-2 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Brand Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 whitespace-nowrap">Brand:</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-cyan-500"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b === 'all' ? 'All Brands' : b}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Max Price</span>
            <span className="font-mono text-cyan-400 font-semibold tabular-nums">
              ${maxPrice.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="5000"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Sort & In-Stock Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0 accent-cyan-400 cursor-pointer"
            />
            <span>In Stock Only</span>
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-cyan-500"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-[#090e18] border border-slate-800/80 p-8 space-y-4">
          <Filter className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">
            No hardware components match your criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try loosening price constraints, clearing search filters, or selecting a broader category.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 font-medium text-xs transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
              onAddToCart={onAddToCart}
              onToggleCompare={onToggleCompare}
              isCompared={compareList.some((item) => item.id === product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
