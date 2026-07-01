import { USERS, generateToken } from '@/lib/mockData';

// In-memory store for new registrations (resets on server restart)
const newUsers: typeof USERS = [];

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    const exists = [...USERS, ...newUsers].find((u) => u.email === email);
    if (exists) {
      return Response.json({ error: 'Email already registered' }, { status: 409 });
    }

    const user = {
      id: `u_${Date.now()}`,
      name,
      email,
      password,
      role: 'customer' as const,
      createdAt: new Date().toISOString(),
    };
    newUsers.push(user);

    const { password: _pwd, ...safeUser } = user;
    const token = generateToken(safeUser);

    return Response.json({
      user: { ...safeUser, token },
      message: 'Registration successful',
    }, { status: 201 });
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
