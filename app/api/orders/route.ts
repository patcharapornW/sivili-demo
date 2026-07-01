import { ORDERS, PRODUCTS } from '@/lib/mockData';
import { verifyToken } from '@/lib/mockData';

// In-memory orders store
const runtimeOrders: typeof ORDERS = [...ORDERS];

export async function GET(request: Request) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.replace('Bearer ', '');
  const user = verifyToken(token);

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userOrders = user.role === 'admin'
    ? runtimeOrders
    : runtimeOrders.filter((o) => o.userId === user.id);

  return Response.json({ orders: userOrders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, paymentMethod, shippingInfo } = body;

    if (!items || !paymentMethod || !shippingInfo) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const total = items.reduce((sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity, 0);

    const order = {
      id: `ord_${Date.now()}`,
      userId: 'guest',
      items,
      total,
      status: 'confirmed' as const,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };
    runtimeOrders.push(order);

    return Response.json({ order, message: 'Order placed successfully' }, { status: 201 });
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
