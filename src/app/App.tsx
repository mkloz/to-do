import { RouterProvider } from 'react-router-dom';
import Alerts from '../components/ui/alerts';
import AppProvider from './providers/AppProvider';
import router from './router';
import { initMockDB } from '../__mock__/services/db/init';

function App() {
  initMockDB(true);

  return (
    <>
      <AppProvider>
        <Alerts />
        <RouterProvider router={router} />
      </AppProvider>
    </>
  );
}

export default App;
