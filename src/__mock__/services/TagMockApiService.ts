import { ITag } from '../../types/projects';
import { LocalStorageUtils } from '../../utils/LocalStorageUtils';
import { ID_SET } from './db/init';

export class TagMockApiService {
  readonly TAG_KEY = 'tags';

  getAll(): ITag[] {
    const res = LocalStorageUtils.getItem(this.TAG_KEY);

    return Array.isArray(res) ? res : [];
  }

  getById(id: number) {
    return this.getAll().find((el) => el.id === id);
  }

  create(tag: Omit<ITag, 'id'>) {
    const tags = this.getAll();
    const newTag = { ...tag, id: ++ID_SET.lastTagId };

    tags.push(newTag);
    this.save(tags);

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
