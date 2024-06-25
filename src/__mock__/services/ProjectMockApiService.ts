import { IProject, ITag } from '../../types/projects';
import { tagMockApiService } from './TagMockApiService';
import dayjs from 'dayjs';
import { LocalStorageUtils } from '../../utils/LocalStorageUtils';
import { ID_SET } from './db/init';

interface IProjectInDB extends Omit<IProject, 'tags'> {
  tags: number[];
}

export class ProjectMockApiService {
  readonly PROJECT_KEY = 'projects';

  async read(): Promise<IProjectInDB[]> {
    const res = LocalStorageUtils.getItem(this.PROJECT_KEY);

    return Array.isArray(res) ? res : [];
  }

  async save(projects: IProjectInDB[]) {
    console.log(projects);
    LocalStorageUtils.setItem(this.PROJECT_KEY, projects);

    console.log(LocalStorageUtils.getItem(this.PROJECT_KEY));
  }

  async getAll() {
    const db: IProjectInDB[] = await this.read();
    const projects: IProject[] = [];

    for (const project of db) {
      const tags: ITag[] = [];

      for (const tagId of project.tags) {
        const tag = tagMockApiService.getById(tagId);

        if (tag) tags.push(tag);
      }
      projects.push({ ...project, tags });
    }

    return projects;
  }

  async getByTag(tag?: string) {
    if (!tag) return this.getAll();

    const db = await this.getAll();
    const projects: IProject[] = [];

    for (const project of db) {
      if (project.tags.find((el) => el.name === tag)) projects.push(project);
    }

    return projects;
  }

  async getById(id: number) {
    const db: IProjectInDB[] = await this.read();
    const project = db.find((el) => el.id === id);

    if (!project) return null;

    const tags: ITag[] = [];

    for (const tagId of project.tags) {
      const tag = tagMockApiService.getById(tagId);

      if (tag) tags.push(tag);
    }

    return { ...project, tags };
  }

  async create(project: Omit<IProject, 'id'>) {
    const db: IProjectInDB[] = await this.read();
    const newProject = { ...project, id: ID_SET.lastProjectId, tags: [] };

    db.push(newProject);
    await this.save(db);

    return newProject;
  }

  async update(project: IProject) {
    const db: IProjectInDB[] = await this.read();
    const index = db.findIndex((el) => el.id === project.id);

    db[index] = { ...project, tags: project.tags.map((el) => el.id) };
    await this.save(db);

    return project;
  }

  async getTodaysProjects(currentDay: Date = new Date()) {
    const allProjects = await this.getAll();

    for (const project of allProjects) {
      project.tasks = project.tasks.filter(
        (el) =>
          el.dueDates &&
          (dayjs(el.dueDates.start).isSame(currentDay, 'day') ||
            dayjs(el.dueDates.end).isSame(currentDay, 'day')),
      );
    }

    return allProjects.filter((el) => el.tasks.length > 0);
  }

  async getImportantProjects() {
    const db = await this.getAll();
    return db.filter((el) => el.isImportant);
  }

  async toggleImportant(id: number) {
    const db: IProjectInDB[] = await this.read();
    const index = db.findIndex((el) => el.id === id);

    db[index].isImportant = !db[index].isImportant;
    await this.save(db);
  }
}

export const projectMockApiService = new ProjectMockApiService();
