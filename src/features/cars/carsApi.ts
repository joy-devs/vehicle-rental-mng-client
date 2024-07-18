import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Vehicle {
  id: string;
  model: string;
  image: string;
  specifications: string;
  location: string;
  availability: boolean;
  engine: string;
  transmission: string;
  fuelType: string;
}

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
  }),
  endpoints: (builder) => ({
    getVehicles: builder.query<Vehicle[], void>({
      query: () => "Vehicles",
    }),
  }),
});

// export const { useGetVehiclesQuery } = carApi;
export default carApi;
