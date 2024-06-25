import { useState } from 'react';
import { RandomUtils } from './RandomUtils';
import { useInterval } from 'react-use';

export class TipUtils {
  static TIPS = [
    'Use emojis to make your projects more fun',
    'Click on the project name to see the tasks',
    'Use straightforward and easily understandable titles for your projects and sections',
    'Use the search bar to find your projects and tasks',
    'Define specific, achievable goals for each project or task.',
    "Use 'Important' to mark the most important tasks",
    'Identify high-priority tasks and focus on those first.',
    'Use tags to organize your projects',
    'Use the calendar to plan your projects and tasks',
    'Write down all tasks you need to complete and check them off as you go.',
  ];

  static getRandomTip() {
    return TipUtils.TIPS.at(
      RandomUtils.getRandomInt(0, TipUtils.TIPS.length - 1),
    );
  }
  static useRandomTip() {
    const [tip, setTip] = useState(TipUtils.getRandomTip());

    useInterval(() => {
      setTip(TipUtils.getRandomTip());
    }, 100 * 1000);

    const updateTip = () => {
      setTip(TipUtils.getRandomTip());
    };

    return [tip, setTip, updateTip] as const;
  }
}
