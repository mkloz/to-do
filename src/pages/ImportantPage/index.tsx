import { useQuery } from '@tanstack/react-query';
import Projects, {
  generateEmptyProject,
} from '../../components/custom/Projects';
import { TipUtils } from '../../utils/TipUtils';
import styles from './index.module.css';
import { projectMockApiService } from '../../__mock__/services/ProjectMockApiService';
import { useMemo } from 'react';
import { CiCircle, UilStar } from '../../components/icons';
import { Color } from '../../utils/ColorUtils';
import Fallback from '../../components/async/fallbacks/Fallback';

const Star = () => (
  <UilStar
    style={{
      color: Color.YELLOW,
    }}
  />
);

const Circle = () => (
  <CiCircle
    style={{
      color: Color.GREEN,
    }}
  />
);
function ImportantPage() {
  const projects = useQuery({
    queryKey: ['projects', 'important'],
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
  return (
    <div className={styles.important}>
      <div className={styles['important--content']}>
        <div>
          <h1>📌 Important projects</h1>
          <h3>
            💡Click on circle to make project important &nbsp;
            <Circle />
            {'->'}
            <Star />
          </h3>
          <h4>💡{tip}💡</h4>
        </div>
        <Fallback isError={projects.isError} isLoading={projects.isLoading}>
          <Projects
            projects={projects.data || []}
            newTemplate={newProjectTemplate}
          />
        </Fallback>
      </div>
    </div>
  );
}

export default ImportantPage;
