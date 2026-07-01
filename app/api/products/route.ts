import { NextRequest } from 'next/server';
import { PRODUCTS, CATEGORIES } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '999999');
  const brand = searchParams.get('brand') || '';
  const sort = searchParams.get('sort') || 'default';
  const featured = searchParams.get('featured') === 'true';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let products = [...PRODUCTS];

  if (category) {
    products = products.filter((p) => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.nameEn.toLowerCase().includes(q) ||
        p.nameTh.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    );
  }
  if (brand) {
    products = products.filter((p) => p.brand === brand);
  }
  products = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
  if (featured) {
    products = products.filter((p) => p.isFeatured);
  }

  switch (sort) {
    case 'price_asc':  products.sort((a, b) => a.price - b.price); break;
    case 'price_desc': products.sort((a, b) => b.price - a.price); break;
    case 'rating':     products.sort((a, b) => b.rating - a.rating); break;
    case 'newest':     products = products.filter((p) => p.isNew).concat(products.filter((p) => !p.isNew)); break;
  }

  const total = products.length;
  const start = (page - 1) * limit;
  const paginated = products.slice(start, start + limit);

  const brands = [...new Set(PRODUCTS.map((p) => p.brand))];
  const maxProductPrice = Math.max(...PRODUCTS.map((p) => p.price));

  return Response.json({
    products: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    categories: CATEGORIES,
    brands,
    maxPrice: maxProductPrice,
  });
}
