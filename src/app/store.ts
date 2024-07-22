import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

import {loginApi} from "../features/login/loginApi";
import authSlice from "../features/Auth/authSlice";
import {vehiclesApi} from "../features/cars/vehicleApi";
import { BookingsAPI } from "../features/bookings/BookingApi";


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
    [vehiclesApi.reducerPath]:vehiclesApi.reducer,
    [BookingsAPI.reducerPath]:BookingsAPI.reducer,
  
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
            vehiclesApi.middleware,
          )
          .concat(
            BookingsAPI.middleware,
          ),
});


// Create persistor
export const persistor = persistStore(store);

// Set up listeners for RTK Query
setupListeners(store.dispatch);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;