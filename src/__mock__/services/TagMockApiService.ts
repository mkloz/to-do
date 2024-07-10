import { ITag } from '../../types/projects';
import { LocalStorageUtils } from '../../utils/LocalStorageUtils';
import { TimeUtils } from '../../utils/TimeUtils';
import { projectMockApiService } from './ProjectMockApiService';
import { IDSet } from './db/init';

export class TagMockApiService {
  readonly TAG_KEY = 'tags';

  async getAll(): Promise<ITag[]> {
    await TimeUtils.timeout(10);
    const res = LocalStorageUtils.getItem(this.TAG_KEY);

    return Array.isArray(res) ? res : [];
  }
  async getByName(name: string) {
    return (await this.getAll()).find((el) => el.name === name);
  }
  async getById(id: number) {
    return (await this.getAll()).find((el) => el.id === id);
  }

  async create(tag: Omit<ITag, 'id'>) {
    const tags = await this.getAll();

    if (await this.getByName(tag.name)) throw new Error('Tag already exists');

    const idSet = new IDSet();
    const newTag = { ...tag, id: ++idSet.lastTagId };

    tags.push(newTag);
    await this.save(tags);
    idSet.save();

    return newTag;
  }

  async update(tag: ITag) {
    const tags = await this.getAll();
    const index = tags.findIndex((el) => el.id === tag.id);

    tags[index] = tag;
    await this.save(tags);

    return tag;
  }

  async delete(id: number) {
    const tags = await this.getAll();
    const index = tags.findIndex((el) => el.id === id);
    const tag = tags[index];
    tags.splice(index, 1);
    await this.save(tags);

    const projects = await projectMockApiService.getAll();

    for await (const project of projects) {
      const index = project.tags.findIndex((el) => el.id === id);

      if (index !== -1) {
        project.tags.splice(index, 1);
        await projectMockApiService.update(project);
      }
    }

    return tag;
  }

  async save(tags: ITag[]) {
    LocalStorageUtils.setItem(this.TAG_KEY, tags);
  }
}

export const tagMockApiService = new TagMockApiService();
