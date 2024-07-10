import Projects, {
  generateEmptyProject,
} from '../../components/custom/Projects';
import { TipUtils } from '../../utils/TipUtils';
import styles from './index.module.css';
import useQueryParam from '../../hooks/useQueryParams';
import { useQuery } from '@tanstack/react-query';
import { tagMockApiService } from '../../__mock__/services/TagMockApiService';
import { projectMockApiService } from '../../__mock__/services/ProjectMockApiService';
import TagsList from '../../components/custom/TagsList';
import CreateTagForm from '../../components/forms/CreateTagForm';
import Fallback from '../../components/async/fallbacks/Fallback';

function TagsPage() {
  const [tagName] = useQueryParam('tag');
  const [tip] = TipUtils.useRandomTip();
  const tags = useQuery({
    queryKey: ['tags'],
    queryFn: () => tagMockApiService.getAll(),
  });
  const projects = useQuery({
    queryKey: ['projects', tagName],
    queryFn: () => projectMockApiService.getByTag(tagName || undefined),
  });
  const tag = tags.data?.find((el) => el.name == tagName);
  const newProjectTemplate = {
    ...generateEmptyProject(),
    tags: tag ? [tag] : [],
  };
  return (
    <div className={styles.tags}>
      <div className={styles['tags--content']}>
        <div>
          <h1>🏷️ Tags</h1>
          <h4>💡{tip}💡</h4>
        </div>
        <Fallback isError={tags.isError} isLoading={tags.isLoading}>
          <TagsList
            tags={tags.data || []}
            deletable
            selectedTags={tag ? [tag] : []}
            createTagForm={CreateTagForm}
          />
        </Fallback>
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

export default TagsPage;
