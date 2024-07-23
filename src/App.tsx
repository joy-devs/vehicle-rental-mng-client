import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { persistor, store } from './app/store';
import Home from './Pages/home';
import AboutUs from './components/About';
import Login from './features/login/login';
import Register from './features/login/register';
import ContactUs from './components/contact';

// user page
import Userdashboard from './Pages/userdashboard';
import Bookings from './features/bookings/Bookings';
import Support from './components/support';
import Logout from './components/logout';
import UserProfile from './features/userprofile/userProfile';

// admin page
import ADashBoard from './Pages/admindashboard';
import BookingForm from './features/bookings/BookingForm';
import VehicleList from './features/cars/vehicleList';
// import Error from './Pages/Error';
import UsersList from './features/users/UsersList';
import Locations from './features/locations/location';
import FleetManagement from './features/fleet/fleet';
import VehicleSpecifications from './features/vehicleSpec/vehicleSpec';
import ABookings from './features/ABookings/ABooking';
import Payments from './features/Payments/Payments';
import Tickets from './features/Tickets/tickets';
import { Cloud } from './features/cloudinary/cloudinary';
import AppCloud from './features/cloudinary/cloud';
import  Chart  from './features/charts/charts';
import PaymentSuccess from './features/PaymentWithStripe/PaymentSuccessComponent';
import PaymentCancel from './features/PaymentWithStripe/PaymentCancel';

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
      element: <VehicleList />,
    },
    {
      path: "/userprofile",
      element: <UserProfile />,
    },
    {
      path: "/bookingForm",
      element: <BookingForm />,
    },
    {
      path: "paymentSuccess",
      element: <PaymentSuccess />,
    },
    {
      path: "paymentCancel",
      element: <PaymentCancel />,
   
    },
    {
      path: "/admindashboard",
      element: <ADashBoard />,
      // errorElement: <Error />,
      children: [
        {
          path: "users",
          element: <UsersList />,
        },
        {
          path: "locations",
          element: <Locations />,
        },
        {
          path: "cars",
          element: <VehicleList />,
        },
        {
          path: "vehicleSpecifications",
          element: <VehicleSpecifications />,
        },
        {
          path: "bookings",
          element: <ABookings />,
        },
        {
          path: "payments",
          element: <Payments />,
        },
        {
          path: "fleet",
          element: <FleetManagement />,
        },
        {
          path: "tickets",
          element: <Tickets />,
        },

        {
          path: "chart",
          element: <Chart />,
        },
        {
          path: "cloudinaryForm",
          element: <Cloud />,
        },
        {
          path: "cloudinary",
          element: <AppCloud />,
        },
      ],
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
