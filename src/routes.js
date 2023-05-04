import { Navigate, useRoutes } from 'react-router-dom';
// layouts
//import DashboardLayout from './layouts/dashboard';
//import SimpleLayout from './layouts/simple';
//
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <Page404 />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },

        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <Page404 /> }
      ]
    },
    {
      path: 'login',
      element: <Page404 />
    },
    {
      element: <Page404 />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ]);

  return routes;
}
