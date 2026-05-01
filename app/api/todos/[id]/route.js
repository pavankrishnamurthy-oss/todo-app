import prisma from '../../../../lib/prisma';

export async function PATCH(request, ctx) {
  const { id } = await ctx.params;
  const todoId = Number(id);

  if (!Number.isInteger(todoId)) {
    return Response.json({ error: 'invalid id' }, { status: 400 });
  }

  const existing = await prisma.todo.findUnique({ where: { id: todoId } });
  if (!existing) {
    return Response.json({ error: 'not found' }, { status: 404 });
  }

  const updated = await prisma.todo.update({
    where: { id: todoId },
    data: { completed: !existing.completed },
  });
  return Response.json(updated);
}

export async function DELETE(_request, ctx) {
  const { id } = await ctx.params;
  const todoId = Number(id);

  if (!Number.isInteger(todoId)) {
    return Response.json({ error: 'invalid id' }, { status: 400 });
  }

  await prisma.todo.delete({ where: { id: todoId } });
  return new Response(null, { status: 204 });
}
