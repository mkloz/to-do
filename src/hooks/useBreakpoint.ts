import { createBreakpoint } from 'react-use';

export enum Breakpoint {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  LAPTOP = 'laptop',
  DESKTOP = 'desktop',
}

const params = {
  [Breakpoint.MOBILE]: 350,
  [Breakpoint.TABLET]: 768,
  [Breakpoint.LAPTOP]: 1024,
  [Breakpoint.DESKTOP]: 1280,
};

export const useBreakpoint = createBreakpoint(params) as () => Breakpoint;
