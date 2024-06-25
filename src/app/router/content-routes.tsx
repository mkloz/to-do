import { RouteObject, redirect } from 'react-router-dom';
import TodaysPage from '@/pages/TodayPage';
import NotFoundPage from '@/pages/NotFoundPage';
import CalendarPage from '@/pages/CalendarPage';
import ProjectsPage from '../../pages/ProjectsPage';
import ImportantPage from '../../pages/ImportantPage';
import TagsPage from '../../pages/TagsPage';
import ContentLayout from '../../components/layout/ContentLayout';

const routes: RouteObject[] = [
  { path: '/', loader: () => redirect('/today') },
  { path: '/today', element: <TodaysPage /> },
  { path: '/calendar', element: <CalendarPage /> },
  { path: '/projects', element: <ProjectsPage /> },
  { path: '/tags', element: <TagsPage /> },
  { path: '/important', element: <ImportantPage /> },
  { path: '/support', loader: () => redirect('/') },
  { path: '/settings', loader: () => redirect('/') },
  { path: '*', element: <NotFoundPage /> },
];

const ContentRoute = {
  element: <ContentLayout />,
  children: routes,
};

export default ContentRoute;
