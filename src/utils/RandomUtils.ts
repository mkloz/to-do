import { v4 } from 'uuid';

export class RandomUtils {
  static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  static getRandomDate() {
    return new Date(
      new Date().getTime() -
        RandomUtils.getRandomInt(0, 100) * 24 * 60 * 60 * 1000,
    ).toISOString();
  }
  static getRandomBoolean() {
    return Math.random() < 0.5;
  }
  static getRandomString() {
    return Math.random().toString(36).substring(7);
  }
  static getRandomUuid() {
    return v4();
  }

  static generateId() {
    return RandomUtils.getRandomUuid();
  }
}
