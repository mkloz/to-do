import { FC, SVGProps, useEffect, useRef } from 'react';
import styles from './index.module.css';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { HashLink as Link } from 'react-router-hash-link';
import {
  AkarIconsGear,
  CiCircle,
  FlowbiteFolderOutline,
  IconamoonHomeBold,
  LucideTag,
  SolarCalendarOutline,
  SystemUiconsSupport,
  UilStar,
} from '@/components/icons';
import {
  AccordionBox,
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeaderNonInteractive,
} from '../../../ui/accordion';
import { Color, ColorUtils } from '@/utils/ColorUtils';
import Tags from '../../../custom/Tags';
import { useQuery } from '@tanstack/react-query';
import { projectMockApiService } from '../../../../__mock__/services/ProjectMockApiService';
import { tagMockApiService } from '../../../../__mock__/services/TagMockApiService';

enum NavBarLinkName {
  TODAY = 'Today',
  CALENDAR = 'Calendar',
  PROJECTS = 'Projects',
  TAGS = 'Tags',
  IMPORTANT = 'Important',
  SUPPORT = 'Support',
  SETTINGS = 'Settings',
}

type NavBarLink = {
  name: NavBarLinkName;
  icon: FC<SVGProps<SVGSVGElement>>;
  link: string;
  content?: FC;
};

const NAVBAR_LINKS: Array<NavBarLink> = [
  { name: NavBarLinkName.TODAY, icon: IconamoonHomeBold, link: '/today' },
  {
    name: NavBarLinkName.CALENDAR,
    icon: SolarCalendarOutline,
    link: '/calendar',
  },
  {
    name: NavBarLinkName.PROJECTS,
    icon: FlowbiteFolderOutline,
    link: '/projects',
    content: NavbarProjectsContent,
  },
  {
    name: NavBarLinkName.TAGS,
    icon: LucideTag,
    link: '/tags',
    content: NavbarTagsContent,
  },
  { name: NavBarLinkName.IMPORTANT, icon: UilStar, link: '/important' },
  { name: NavBarLinkName.SUPPORT, icon: SystemUiconsSupport, link: '/support' },
  { name: NavBarLinkName.SETTINGS, icon: AkarIconsGear, link: '/settings' },
];

function NavbarProjectsContent() {
  const colorGenerator = ColorUtils.getColorGenerator();
  const projects = useQuery({
    queryKey: ['projects'],
    initialData: [],
    queryFn: () => projectMockApiService.getAll(),
  });

  if (projects.isLoading) return <div>Loading...</div>;
  if (projects.isError) return <div>Error: {projects.error.message}</div>;

  return (
    <ul className={styles['nav-item-projects-content']}>
      {projects.data.map((el) => {
        return (
          <li key={el.id}>
            <Link
              to={`/projects#project-${el.id}`}
              className={styles['project-link']}
            >
              {el.isImportant ? (
                <UilStar
                  style={{
                    color: colorGenerator.next().value || Color.GREEN,
                  }}
                />
              ) : (
                <CiCircle
                  style={{
                    color: colorGenerator.next().value || Color.GREEN,
                  }}
                />
              )}
              <h5>{el.name} </h5>
              <span>{el.tasks.length}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function NavbarTagsContent() {
  const tags = useQuery({
    queryKey: ['tags'],
    initialData: [],
    queryFn: () => tagMockApiService.getAll(),
  });

  if (tags.isLoading) return <div>Loading...</div>;
  if (tags.isError) return <div>Error</div>;

  return <Tags tags={tags.data} className={styles['nav-item-tags-content']} />;
}

function NavbarItem({ name, icon: Icon, link }: NavBarLink) {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (location.pathname === link) {
      ref.current.classList.add(styles['nav-item-header--active']);
      return;
    }
    ref.current.classList.remove(styles['nav-item-header--active']);
  }, [location.pathname, link]);

  return (
    <AccordionItemHeaderNonInteractive
      className={clsx(styles['nav-item-header'])}
      ref={ref}
    >
      <Link to={link} className={clsx(styles['nav-link'])}>
        <Icon width="1.3rem" height="1.3rem" />
        <span>{name}</span>
      </Link>
    </AccordionItemHeaderNonInteractive>
  );
}

function NavbarLinks() {
  return (
    <AccordionBox className={styles.list}>
      {NAVBAR_LINKS.map((el) => (
        <AccordionItem
          key={el.name}
          className={clsx({
            [styles['bottom-group']]: el.name == NavBarLinkName.SUPPORT,
          })}
          defaultCollapsed={true}
        >
          <NavbarItem name={el.name} icon={el.icon} link={el.link} />
          <AccordionItemContent className={styles['nav-item-content']}>
            {el.content && <el.content />}
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionBox>
  );
}

export default NavbarLinks;
