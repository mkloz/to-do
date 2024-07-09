import { ITag } from '../../types/projects';
import { LocalStorageUtils } from '../../utils/LocalStorageUtils';
import { IDSet } from './db/init';

export class TagMockApiService {
  readonly TAG_KEY = 'tags';

  getAll(): ITag[] {
    const res = LocalStorageUtils.getItem(this.TAG_KEY);

    return Array.isArray(res) ? res : [];
  }
  getByName(name: string) {
    return this.getAll().find((el) => el.name === name);
  }
  getById(id: number) {
    return this.getAll().find((el) => el.id === id);
  }

  create(tag: Omit<ITag, 'id'>) {
    const tags = this.getAll();

    if (this.getByName(tag.name)) throw new Error('Tag already exists');

    const idSet = new IDSet();
    const newTag = { ...tag, id: ++idSet.lastTagId };

    tags.push(newTag);
    this.save(tags);
    idSet.save();

    return newTag;
  }

  update(tag: ITag) {
    const tags = this.getAll();
    const index = tags.findIndex((el) => el.id === tag.id);

    tags[index] = tag;
    this.save(tags);

    return tag;
  }

  delete(id: number) {
    const tags = this.getAll();
    const index = tags.findIndex((el) => el.id === id);

    tags.splice(index, 1);
    this.save(tags);
  }

  save(tags: ITag[]) {
    typeof tags;
    LocalStorageUtils.setItem(this.TAG_KEY, tags);
  }
}

export const tagMockApiService = new TagMockApiService();
