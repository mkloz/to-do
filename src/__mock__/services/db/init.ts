import dayjs from 'dayjs';
import { projectMockApiService } from '../ProjectMockApiService';
import { tagMockApiService } from '../TagMockApiService';
import { LocalStorageUtils } from '../../../utils/LocalStorageUtils';

function generateDueDates(
  dayOffset: number,
  startOffset: number,
  endOffset: number,
): { start: string; end: string } {
  const now = dayjs().hour(0).minute(0).add(dayOffset, 'day');
  const start = now.add(startOffset, 'hour');
  const end = now.add(endOffset, 'hour');

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}
export class IDSet {
  lastProjectId = 15;
  lastTagId = 10;
  lastTaskId = 15;

  constructor() {
    this.read();
  }

  read() {
    const idSet = LocalStorageUtils.getItem('idSet');
    if (!idSet || typeof idSet !== 'object') {
      return this;
    }
    Object.assign(this, idSet);

    return this;
  }
  save() {
    LocalStorageUtils.setItem('idSet', this);

    return this;
  }
}

const seeds = {
  projects: [
    {
      id: 1,
      name: 'Personal Development',
      status: 'In Progress',
      isImportant: true,
      createdAt: new Date().toISOString(),
      tasks: [
        {
          id: 1,
          name: 'Read a book',
          isDone: false,
          priority: 2,
          dueDates: generateDueDates(-1, 12, 19),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Exercise',
          isDone: false,
          priority: 1,
          dueDates: generateDueDates(-1, 11, 11.75),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'Meditate',
          isDone: false,
          priority: 3,
          dueDates: generateDueDates(-1, 7, 10),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 4,
          name: 'Learn a new skill',
          isDone: false,
          priority: 2,
          dueDates: generateDueDates(-1, 8, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      tags: [1, 2],
    },
    {
      id: 2,
      name: 'Work Projects',
      status: 'Not Started',
      isImportant: true,
      createdAt: new Date().toISOString(),
      tasks: [
        {
          id: 5,
          name: 'Finish report',
          isDone: false,
          priority: 1,
          dueDates: generateDueDates(0, 7, 8),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 6,
          name: 'Prepare presentation',
          isDone: false,
          priority: 2,
          dueDates: generateDueDates(0, 9, 11),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 7,
          name: 'Team meeting',
          isDone: false,
          priority: 3,
          dueDates: generateDueDates(0, 12, 15.5),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 8,
          name: 'Code review',
          isDone: false,
          priority: 2,
          dueDates: generateDueDates(0, 15, 16),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 9,
          name: 'Client call',
          isDone: false,
          priority: 1,
          dueDates: generateDueDates(0, 16.5, 20.5),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 15,
          name: 'Coding challenge',
          isDone: false,
          priority: 1,
          dueDates: generateDueDates(0, 22, 26),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      tags: [2, 3],
    },
    {
      id: 3,
      name: 'Home Renovation',
      status: 'Completed',
      isImportant: false,
      createdAt: new Date().toISOString(),
      tasks: [
        {
          id: 10,
          name: 'Paint the walls',
          isDone: true,
          priority: 3,
          dueDates: generateDueDates(1, 7.5, 11),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 11,
          name: 'Install new kitchen cabinets',
          isDone: true,
          priority: 2,
          dueDates: generateDueDates(1, 12, 14),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 12,
          name: 'Fix the roof',
          isDone: true,
          priority: 1,
          dueDates: generateDueDates(1, 15.5, 17.75),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 13,
          name: 'Replace windows',
          isDone: true,
          priority: 2,
          dueDates: generateDueDates(1, 18, 18.5),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 14,
          name: 'Update lighting fixtures',
          isDone: true,
          priority: 3,
          dueDates: generateDueDates(1, 20, 22),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      tags: [4],
    },
  ],
  tags: [
    {
      id: 1,
      name: 'Personal',
      color: '#FF5733',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Urgent',
      color: '#C70039',
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Work',
      color: '#900C3F',
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'Home',
      color: '#581845',
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'Fitness',
      color: '#28B463',
      createdAt: new Date().toISOString(),
    },
    {
      id: 6,
      name: 'Hobby',
      color: '#3498DB',
      createdAt: new Date().toISOString(),
    },
    {
      id: 7,
      name: 'Shopping',
      color: '#F1C40F',
      createdAt: new Date().toISOString(),
    },
    {
      id: 8,
      name: 'Travel',
      color: '#AF7AC5',
      createdAt: new Date().toISOString(),
    },
    {
      id: 9,
      name: 'Education',
      color: '#5D6D7E',
      createdAt: new Date().toISOString(),
    },
    {
      id: 10,
      name: 'Health',
      color: '#E74C3C',
      createdAt: new Date().toISOString(),
    },
  ],
};

export function initMockDB(seed: boolean = false) {
  if (
    LocalStorageUtils.getItem('projects') &&
    LocalStorageUtils.getItem('tags')
  ) {
    return;
  }

  const db = seed ? seeds : { projects: [], tags: [] };

  projectMockApiService.save(db.projects);
  tagMockApiService.save(db.tags);

  const ids = new IDSet();

  ids.save();
}
