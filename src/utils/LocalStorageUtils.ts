export class LocalStorageUtils {
  static setItem(key: string, value: string | number | boolean | object): void {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value.toString());
    }
  }

  static getItem(key: string): string | number | boolean | object | null {
    const item = localStorage.getItem(key);

    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch {
      if (['true', 'false'].includes(item)) {
        return item === 'true';
      }
      if (!isNaN(Number(item))) {
        return Number(item);
      }
      return item;
    }
  }

  static clear() {
    localStorage.clear();
  }

  static getLength() {
    return localStorage.length;
  }

  static getKeys() {
    return Object.keys(localStorage);
  }

  static getValues() {
    return Object.values(localStorage);
  }

  static getEntries() {
    return Object.entries(localStorage);
  }
}
