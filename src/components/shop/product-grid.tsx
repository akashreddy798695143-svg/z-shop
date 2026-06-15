'use client';

import { useEffect, useState, useCallback } from 'react';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { useShopStore, type SortOption } from '@/store/use-shop-store';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  category: { name: string; slug: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { products: number };
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const {
    searchQuery,
    selectedCategory,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
  } = useShopStore();

  // Fetch categories
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedCategory) params.set('category', selectedCategory);
      if (sortBy && sortBy !== 'featured') params.set('sort', sortBy);
      if (sortBy === 'featured') params.set('sort', 'featured');

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug);
    setFilterOpen(false);
  };

  const activeCategory = categories.find((c) => c.slug === selectedCategory);

  // Filter sidebar content
  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              !selectedCategory
                ? 'bg-emerald-50 text-emerald-700 font-medium'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                selectedCategory === cat.slug
                  ? 'bg-emerald-50 text-emerald-700 font-medium'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat._count.products}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Sort By</h3>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {activeCategory ? activeCategory.name : searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
        </h1>
        {!loading && (
          <p className="text-sm text-muted-foreground mt-1">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9 pr-9"
          />
          {localSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </form>

        {/* Desktop Sort */}
        <div className="hidden sm:block">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Filter Button */}
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetTitle className="mb-4">Filters</SheetTitle>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {(selectedCategory || searchQuery) && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {selectedCategory && (
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-red-50 hover:text-red-600 gap-1"
              onClick={() => setSelectedCategory(null)}
            >
              {activeCategory?.name}
              <X className="h-3 w-3" />
            </Badge>
          )}
          {searchQuery && (
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-red-50 hover:text-red-600 gap-1"
              onClick={handleClearSearch}
            >
              &ldquo;{searchQuery}&rdquo;
              <X className="h-3 w-3" />
            </Badge>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <FilterContent />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-5 w-1/3" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  handleClearSearch();
                  setSelectedCategory(null);
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
