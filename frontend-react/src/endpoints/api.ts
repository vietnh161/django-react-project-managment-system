import axios from 'axios';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { addMessage } from '@/store/Snackbar/SnackbarSlice';

export const axiosAPI = axios.create({
  baseURL: `${process.env.REACT_APP_DJANGO_API_ENDPOINT}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_DJANGO_API_ENDPOINT}`,
});

type BaseQueryArgs = Parameters<typeof baseQuery>[0];

const baseQueryWithErrorHandling: BaseQueryFn<
  BaseQueryArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const error = result.error as any;
    const endpointName = (api as any)?.endpoint || 'unknown';
    let errorMessage = `${endpointName}: `;

    if (typeof error === 'string') {
      errorMessage += error;
    } else if (typeof error?.error === 'string') {
      errorMessage += error.error;
    } else if (typeof error?.message === 'string') {
      errorMessage += error.message;
    }

    api.dispatch(addMessage({ text: errorMessage, severity: 'error' }));
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}),
});
