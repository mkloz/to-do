import { useQuery } from '@tanstack/react-query';
import Projects from '../../components/custom/Projects';
import { TipUtils } from '../../utils/TipUtils';
import styles from './index.module.css';
import { projectMockApiService } from '../../__mock__/services/ProjectMockApiService';

function ImportantPage() {
  const projects = useQuery({
    queryKey: ['projects', 'important'],
    initialData: [],
    queryFn: () => projectMockApiService.getImportantProjects(),
  });
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
        <Projects projects={projects.data} />
      </div>
    </div>
  );
}

export default ImportantPage;
