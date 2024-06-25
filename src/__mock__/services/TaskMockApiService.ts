import { IProject, ITask } from '../../types/projects';
import { projectMockApiService } from './ProjectMockApiService';
import { ID_SET } from './db/init';

export class TaskMockApiService {
  async create(task: Omit<ITask, 'id'>, projectId: number) {
    console.log(task, projectId);
    const db: IProject | null = await projectMockApiService.getById(projectId);

    if (!db) throw new Error('Project not found');
    console.log(db.tasks.length);
    const newTask = { ...task, id: ++ID_SET.lastTaskId };
    db.tasks.push(newTask);
    console.log(db.tasks, db.tasks.length);
    await projectMockApiService.update(db);

    return newTask;
  }

  async update(task: ITask) {
    const db: IProject[] | null = await projectMockApiService.getAll();

    if (!db) throw new Error('Task not found');

    const project = db.find((el) => el.tasks.find((t) => t.id === task.id));

    if (!project) throw new Error('Task not found');

    const index = project.tasks.findIndex((el) => el.id === task.id);

    project.tasks[index] = task;

    await projectMockApiService.update(project);

    return task;
  }

  async delete(id: number) {
    const db: IProject[] | null = await projectMockApiService.getAll();

    if (!db) throw new Error('Task not found');

    const project = db.find((el) => el.tasks.find((task) => task.id === id));

    if (!project) throw new Error('Task not found');

    project.tasks = project.tasks.filter((task) => task.id !== id);

    await projectMockApiService.update(project);
  }

  async getByProjectId(projectId: number) {
    const db: IProject | null = await projectMockApiService.getById(projectId);

    if (!db) throw new Error('Project not found');

    return db.tasks;
  }

  async getById(id: number, projectId: number) {
    const db: IProject | null = await projectMockApiService.getById(projectId);

    if (!db) throw new Error('Project not found');

    const task = db.tasks.find((el) => el.id === id);

    if (!task) throw new Error('Task not found');

    return task;
  }

  async toggleDone(id: number, projectId: number) {
    const db: IProject | null = await projectMockApiService.getById(projectId);

    if (!db) throw new Error('Project not found');

    const index = db.tasks.findIndex((el) => el.id === id);

    db.tasks[index].isDone = !db.tasks[index].isDone;

    await projectMockApiService.update(db);

    return db.tasks[index];
  }

  async updatePriority(id: number, priority: number, projectId: number) {
    const db: IProject | null = await projectMockApiService.getById(projectId);

    if (!db) throw new Error('Project not found');

    const index = db.tasks.findIndex((el) => el.id === id);

    db.tasks[index].priority = priority;

    await projectMockApiService.update(db);

    return db.tasks[index];
  }
}

export const taskMockApiService = new TaskMockApiService();
