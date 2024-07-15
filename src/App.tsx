import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { persistor, store } from './app/store';
// import Dashboard from './components/Dashboard/dashboard';
import Home from './components/landing Page/home';
import AboutUs from './components/landing Page/About'; // Import AboutUs component

const App: React.FC = () => {
  // Define your routes for the router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    // {
    //   path: "/dashboard",
    //   element: <Dashboard />,
    // },
    {
      path: "/about",
      element: <AboutUs />, // Add AboutUs route
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
