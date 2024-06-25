export interface IProject {
  id: number;
  name: string;
  status: string;
  isImportant: boolean;
  createdAt: string;
  tasks: ITask[];
  tags: ITag[];
}

export interface ITask {
  id: number;
  name: string;
  isDone: boolean;
  priority?: number;
  dueDates?: ITimeRange;
  createdAt: string;
  updatedAt: string;
}
export interface ITag {
  id: number;
  name: string;
  color: string;
  createdAt: string;
}
export interface ITimeRange {
  start: string;
  end: string;
}
