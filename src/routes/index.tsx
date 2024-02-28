import { Routes, Route, Navigate } from 'react-router-dom';
import UserRouteProvider, { UserNoRouteProvider } from './userRouteProvider';
import Messenger from '../pages/messenger/messenger';
import DefaultLayout from './layout';
import SignIn from '../pages/signIn/signIn';
import Login from '../pages/login';

interface RouteConfig {
  element: JSX.Element;
  path: string;
  Layout: React.ComponentType<any>;
}

const config: RouteConfig[] = [
  {
    element: <Messenger />,
    path: "messenger",
    Layout: DefaultLayout
  },
];

const configAuth: RouteConfig[] = [
  {
    element: <SignIn />,
    path: "/signin",
    Layout: DefaultLayout
  },
  {
    element: <Login />,
    path: "/login",
    Layout: DefaultLayout
  }
];

const RoutesProvider = () => {
  return (
    <Routes>
      {config.map(({ path, element, Layout }, idx) => (
        <Route key={idx} element={<UserRouteProvider />}>
          <Route path={path} element={<Layout>{element}</Layout>} />
        </Route>
      ))}
      {configAuth.map(({ path, element, Layout }, idx) => (
        <Route key={idx} element={<UserNoRouteProvider />}>
          <Route key={idx} path={path} element={<Layout>{element}</Layout>} />
        </Route>
      ))}
      <Route element={<Navigate to="/login" replace />} path="*" />
    </Routes>
  );
};

export default RoutesProvider;
