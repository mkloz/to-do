import { IProject, ITag } from '../../types/projects';
import { tagMockApiService } from './TagMockApiService';
import dayjs from 'dayjs';
import { LocalStorageUtils } from '../../utils/LocalStorageUtils';
import { IDSet } from './db/init';
import { TimeUtils } from '../../utils/TimeUtils';

interface IProjectInDB extends Omit<IProject, 'tags'> {
  tags: number[];
}

export class ProjectMockApiService {
  readonly PROJECT_KEY = 'projects';

  async read(): Promise<IProjectInDB[]> {
    await TimeUtils.timeout(20);
    const res = LocalStorageUtils.getItem(this.PROJECT_KEY);

    return Array.isArray(res) ? res : [];
  }

  async save(projects: IProjectInDB[]) {
    LocalStorageUtils.setItem(this.PROJECT_KEY, projects);
  }

  async getAll() {
    const db: IProjectInDB[] = await this.read();
    const projects: IProject[] = [];

    for (const project of db) {
      const tags: ITag[] = [];

      for (const tagId of project.tags) {
        const tag = await tagMockApiService.getById(tagId);

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
      const tag = await tagMockApiService.getById(tagId);

      if (tag) tags.push(tag);
    }

    return { ...project, tags };
  }

  async delete(id: number) {
    const db: IProjectInDB[] = await this.read();
    const index = db.findIndex((el) => el.id === id);

    db.splice(index, 1);
    await this.save(db);
  }
  async create(project: Omit<IProject, 'id'>) {
    const db: IProjectInDB[] = await this.read();
    const idSet = new IDSet();
    const newProject = {
      ...project,
      id: ++idSet.lastProjectId,
      tags: project.tags.map((el) => el.id),
    };
    db.push(newProject);
    await this.save(db);
    idSet.save();

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

    return db[index].isImportant;
  }
  async addTag(projectId: number, tag: ITag) {
    const db: IProjectInDB[] = await this.read();
    const index = db.findIndex((el) => el.id === projectId);

    if (db[index].tags.includes(tag.id)) return;

    db[index].tags.push(tag.id);
    await this.save(db);
  }

  async removeTag(projectId: number, tag: ITag) {
    const db: IProjectInDB[] = await this.read();
    const index = db.findIndex((el) => el.id === projectId);
    const tagIndex = db[index].tags.findIndex((el) => el === tag.id);
    db[index].tags.splice(tagIndex, 1);
    await this.save(db);

    return tag;
  }
}

export const projectMockApiService = new ProjectMockApiService();
