jest.mock('../prisma/prisma.service.js', () => ({ PrismaService: class {} }));

import { TaskService } from './task.service.js';

describe('TaskService', () => {
  it('emits task:updated via the gateway when a task is updated', async () => {
    const task = { id: 'task-1', status: 'DONE' };
    const prisma = {
      task: {
        findFirst: jest.fn().mockResolvedValue(task),
        update: jest.fn().mockResolvedValue(task),
      },
    } as any;
    const gateway = { emitTaskUpdated: jest.fn() } as any;

    const service = new TaskService(prisma, gateway);
    await service.update('user-1', 'task-1', { status: 'DONE' });

    expect(gateway.emitTaskUpdated).toHaveBeenCalledWith(task);
  });
});
