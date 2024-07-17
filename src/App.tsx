import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { persistor, store } from './app/store';
import Home from './Pages/home';
import AboutUs from './components/About';
import Login from './features/login/login';
import Userdashboard from './Pages/userdashboard';
import Profile from './features/profile/profile';
import Booking from './features/booking/bookings';
import Support from './components/support';
import Logout from './components/logout';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/about",
      element: <AboutUs />,
    },
    {
      path: "/userdashboard",
      element: <Userdashboard />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/bookings",
      element: <Booking />,
    },
    {
      path: "/support",
      element: <Support />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
};

export default App;
