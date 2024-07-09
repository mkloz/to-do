import { useQuery } from '@tanstack/react-query';
import Projects, {
  generateEmptyProject,
} from '../../components/custom/Projects';
import { TipUtils } from '../../utils/TipUtils';
import styles from './index.module.css';
import { projectMockApiService } from '../../__mock__/services/ProjectMockApiService';
import { useMemo } from 'react';

function ImportantPage() {
  const projects = useQuery({
    queryKey: ['projects', 'important'],
    initialData: [],
    queryFn: () => projectMockApiService.getImportantProjects(),
  });
  const newProjectTemplate = useMemo(
    () => ({
      ...generateEmptyProject(),
      name: 'New important project',
      isImportant: true,
    }),
    [],
  );
  const [tip] = TipUtils.useRandomTip();
  if (projects.isLoading) return <div>Loading...</div>;
  if (projects.isError) return <div>Error</div>;
  return (
    <div className={styles.important}>
      <div className={styles['important--content']}>
        <div>
          <h1>📌 Important projects</h1>
          <h4>💡{tip}💡</h4>
        </div>
        <Projects projects={projects.data} newTemplate={newProjectTemplate} />
      </div>
    </div>
  );
}

export default ImportantPage;
