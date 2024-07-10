import { IProject, ITask } from '@/types/projects';
import { BasilAddOutline } from '@/components/icons';
import styles from './index.module.css';
import { AccordionBox } from '@/components/ui/accordion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectMockApiService } from '../../../__mock__/services/ProjectMockApiService';
import { RandomUtils } from '../../../utils/RandomUtils';
import { clsx } from 'clsx';
import Project from './project';
import {
  Alert,
  AlertType,
  useAlertsStore,
} from '../../../store/useAlertsStore';

export function generateEmptyProject(): IProject {
  return {
    id: RandomUtils.getRandomInt(1, Number.MAX_SAFE_INTEGER),
    name: 'New project',
    status: '',
    isImportant: false,
    createdAt: new Date().toISOString(),
    tasks: [],
    tags: [],
  };
}
interface ProjectsProps {
  projects: IProject[];
  newTemplate?: Omit<IProject, 'id'>;
  newTaskTemplate?: Omit<ITask, 'id'>;
}

export function Projects({
  projects,
  newTemplate = generateEmptyProject(),
  newTaskTemplate,
}: ProjectsProps) {
  const alerts = useAlertsStore();
  const queryClient = useQueryClient();
  const createProject = useMutation({
    mutationFn: (param: Omit<IProject, 'id'>) =>
      projectMockApiService.create(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      alerts.addAlert(new Alert('Project created', AlertType.SUCCESS));
    },
    onError: (error) => {
      alerts.addAlert(new Alert(error.message, AlertType.ERROR));
    },
  });

  return (
    <AccordionBox>
      {projects.map((project) => (
        <Project
          project={project}
          key={project.id}
          newTaskTemplate={newTaskTemplate}
        />
      ))}
      <button
        key={RandomUtils.generateId()}
        className={clsx(styles['new-project'])}
        onClick={() => {
          createProject.mutateAsync(newTemplate);
        }}
      >
        <BasilAddOutline />
        <span>Add project</span>
      </button>
    </AccordionBox>
  );
}

export default Projects;
