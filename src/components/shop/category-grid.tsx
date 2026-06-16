'use client';

import { useEffect, useState } from 'react';
import { useShopStore } from '@/store/use-shop-store';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  _count: { products: number };
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useShopStore((s) => s.navigate);
  const setSelectedCategory = useShopStore((s) => s.setSelectedCategory);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    navigate('shop');
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {categories.map((category) => (
          <div key={category.id}>
            <Card
              className="group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 py-0 gap-0"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="relative aspect-square overflow-hidden">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-emerald-50">
                    <span className="text-3xl font-bold text-emerald-200">
                      {category.name[0]}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <CardContent className="p-3 text-center">
                <h3 className="font-semibold text-sm truncate">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {category._count.products} products
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
