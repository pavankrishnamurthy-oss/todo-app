import prisma from '../../../lib/prisma';

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return Response.json(todos);
}

export async function POST(request) {
  const { text } = await request.json();

  if (typeof text !== 'string' || !text.trim()) {
    return Response.json({ error: 'text is required' }, { status: 400 });
  }

  const todo = await prisma.todo.create({
    data: { text: text.trim() },
  });
  return Response.json(todo, { status: 201 });
}
