import { useQuery } from '@tanstack/react-query';
import Projects from '../../components/custom/Projects';
import { TipUtils } from '../../utils/TipUtils';
import styles from './index.module.css';
import { projectMockApiService } from '../../__mock__/services/ProjectMockApiService';
import Fallback from '../../components/async/fallbacks/Fallback';

function ProjectsPage() {
  const projects = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectMockApiService.getAll(),
  });
  const [tip] = TipUtils.useRandomTip();

  return (
    <div className={styles.projects}>
      <div className={styles['projects--content']}>
        <div>
          <h1>📁 All Projects</h1>
          <h4>💡{tip}💡</h4>
        </div>
        <Fallback isError={projects.isError} isLoading={projects.isLoading}>
          <Projects projects={projects.data || []} />
        </Fallback>
      </div>
    </div>
  );
}

export default ProjectsPage;
