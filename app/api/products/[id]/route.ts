import { PRODUCTS } from '@/lib/mockData';

export async function GET(_req: Request, ctx: RouteContext<'/api/products/[id]'>) {
  const { id } = await ctx.params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    return Response.json({ error: 'Product not found' }, { status: 404 });
  }
  // Also return related products (same category, excluding self)
  const related = PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  return Response.json({ product, related });
}
