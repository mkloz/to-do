import Projects from '../../components/custom/Projects';
import { TipUtils } from '../../utils/TipUtils';
import Tags from '../../components/custom/Tags';
import styles from './index.module.css';
import useQueryParam from '../../hooks/useQueryParams';
import { useQuery } from '@tanstack/react-query';
import { tagMockApiService } from '../../__mock__/services/TagMockApiService';
import { projectMockApiService } from '../../__mock__/services/ProjectMockApiService';

function TagsPage() {
  const [tag] = useQueryParam('tag');
  const [tip] = TipUtils.useRandomTip();
  const tags = useQuery({
    queryKey: ['tags'],
    initialData: [],
    queryFn: () => tagMockApiService.getAll(),
  });
  const projects = useQuery({
    queryKey: ['projects', tag],
    initialData: [],
    queryFn: () => projectMockApiService.getByTag(tag || undefined),
  });

  if (tags.isLoading || projects.isLoading) return <div>Loading...</div>;
  if (tags.isError || projects.isError) return <div>Error</div>;

  return (
    <div className={styles.tags}>
      <div className={styles['tags--content']}>
        <div>
          <h1>🏷️ Tags</h1>
          <h4>💡{tip}💡</h4>
        </div>
        <Tags
          tags={tags.data}
          selectedTag={tags.data.find((el) => el.name == tag)}
        />
        <Projects projects={projects.data} />
      </div>
    </div>
  );
}

export default TagsPage;
