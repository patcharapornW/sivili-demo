import { USERS, generateToken } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password required' }, { status: 400 });
    }

    const user = USERS.find((u) => u.email === email && u.password === password);
    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const { password: _pwd, ...safeUser } = user;
    const token = generateToken(safeUser);

    return Response.json({
      user: { ...safeUser, token },
      message: 'Login successful',
    });
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
