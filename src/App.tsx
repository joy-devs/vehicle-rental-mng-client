import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { persistor, store } from './app/store';
import Home from './Pages/home';
import AboutUs from './components/About';
import Login from './features/login/login';
import Userdashboard from './Pages/userdashboard';
import Bookings from './features/bookings/bookings';
import Support from './components/support';
import Logout from './components/logout';
import Register from './features/login/register';
import Dashboard from './components/Dashboard';
import ContactUs from './components/contact';
import VehicleList from './features/cars/vehicleList'
import UserProfile from './features/userprofile/userProfile';

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
      path: "/contact",
      element: <ContactUs />,
    },
      
    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/userdashboard",
      element: <Userdashboard />,
    },
    
    {
      path: "/bookings",
      element: <Bookings />,
    },
    {
      path: "/support",
      element: <Support />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },

    {
      path: "/vehicleList",
      element: <VehicleList/>,

    },

    {
      path: "/dashboard",
      element: <Dashboard />,

    },
    {
      path: "/userprofile",
      element: <UserProfile />,

    }
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
