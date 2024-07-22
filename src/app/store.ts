import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

import {loginApi} from "../features/login/loginApi";
import authSlice from "../features/Auth/authSlice";
import { BookingsAPI } from "../features/bookings/BookingApi";
import {usersApi} from "../features/users/UserAPi"
import { LocationsApi } from "../features/locations/locationApi";
import { CarsApi } from "../features/vehicles/vehiclesApi";
import { vehicleSpecApi } from "../features/vehicleSpec/vehicleSpecApi";
import { PaymentsApi } from "../features/Payments/PaymentsApi";
import { TicketsAPI } from "../features/Tickets/ticketsApi";


// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["usersApi"], // Only persist the users API
};

// Combine all reducers
const rootReducer = combineReducers({
    [loginApi.reducerPath]: loginApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [BookingsAPI.reducerPath]:BookingsAPI.reducer,
    [usersApi.reducerPath]:usersApi.reducer,
    [LocationsApi.reducerPath]:LocationsApi.reducer,
    [CarsApi.reducerPath]:CarsApi.reducer,
    [vehicleSpecApi.reducerPath]:vehicleSpecApi.reducer,
    [PaymentsApi.reducerPath]:PaymentsApi.reducer,
    [TicketsAPI.reducerPath]:TicketsAPI.reducer,
  
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(
      // usersAPI.middleware,
      loginApi.middleware,
          )
          
          .concat(
            BookingsAPI.middleware,
          )
          .concat(
            usersApi.middleware,
          )
          .concat(
            LocationsApi.middleware,
          )
          .concat(
            CarsApi.middleware,
          )
          .concat(
            vehicleSpecApi.middleware,
          )
          .concat(
            PaymentsApi.middleware,
          )
          .concat(
            TicketsAPI.middleware,
          )
});


// Create persistor
export const persistor = persistStore(store);

// Set up listeners for RTK Query
setupListeners(store.dispatch);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;