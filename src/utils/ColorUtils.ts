export enum Color {
  PURPLE = '#7f56d9',
  GREEN = '#12b05f',
  RED = '#ec39b7',
  ORANGE = '#ff3408',
  YELLOW = '#e8a308',
}

export class ColorUtils {
  static *getColorGenerator() {
    while (true) {
      yield Color.GREEN;
      yield Color.ORANGE;
      yield Color.PURPLE;
      yield Color.YELLOW;
      yield Color.RED;
    }
  }
}
