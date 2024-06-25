import { RouteObject, createBrowserRouter } from 'react-router-dom';
import ContentRoute from './content-routes';

const routes: RouteObject[] = [ContentRoute];
const router = createBrowserRouter(routes);

export default router;
