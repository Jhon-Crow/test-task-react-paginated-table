import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const API_URL = import.meta.env.VITE_API_BASE_URL;
const LIMIT = import.meta.env.VITE_PAGE_SIZE;

export const mockApi = createApi({
    reducerPath: "mockApi",
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        getPaginatedUsers: build.query({
            query: (page: number) => `users?page=${page}&limit=${LIMIT}`,
        }),
        getTotalPagesCount: build.query<number, void>({
            query: () => `users`,
            transformResponse: (result: any) => Math.ceil(result.length / LIMIT)
        })
    })
})

export const {useGetPaginatedUsersQuery, useGetTotalPagesCountQuery} = mockApi;