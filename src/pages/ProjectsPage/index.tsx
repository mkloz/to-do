import { useQuery } from '@tanstack/react-query';
import Projects from '../../components/custom/Projects';
import { TipUtils } from '../../utils/TipUtils';
import styles from './index.module.css';
import { projectMockApiService } from '../../__mock__/services/ProjectMockApiService';

function ProjectsPage() {
  const projects = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectMockApiService.getAll(),
  });
  const [tip] = TipUtils.useRandomTip();

  if (projects.isLoading) return <div>Loading...</div>;
  if (projects.isError) return <div>Error: {projects.error.message}</div>;

  return (
    <div className={styles.projects}>
      <div className={styles['projects--content']}>
        <div>
          <h1>📁 All Projects</h1>
          <h4>💡{tip}💡</h4>
        </div>
        <Projects projects={projects.data || []} />
      </div>
    </div>
  );
}

export default ProjectsPage;
