import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {User} from "../../shared/types/user.ts";


const API_URL = import.meta.env.VITE_API_BASE_URL;
const LIMIT = import.meta.env.VITE_PAGE_SIZE;

export const mockApi = createApi({
    reducerPath: "mockApi",
    tagTypes: ["Users", "TotalPageCount"],
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        getPaginatedUsers: build.query<User[], number>({
            query: (page: number) => `users?sortBy=createdAt&order=desc&page=${page}&limit=${LIMIT}`,
            providesTags: (result): readonly { type: 'Users'; id: string | number }[] => result ? [
                ...result.map((user: User) => ({type: "Users" as const, id: user.id})),
                {type: "Users" as const, id: "LIST"}
            ] : [{type: "Users" as const, id: "LIST"}]
        }),
        getUserById: build.query<User, number>({
            query: (id: number) => `users/${id}`,
        }),
        getTotalPagesCount: build.query<number, void>({
            query: () => `users`,
            transformResponse: (result: any) => Math.ceil(result.length / LIMIT),
            providesTags: ['TotalPageCount'],
        }),
        addUser: build.mutation({
            query: (user: Omit<User, 'id' | 'createdAt'>) => ({
                url: "users",
                method: "POST",
                body: { ...user, createdAt: new Date().toISOString() },
            }),
            invalidatesTags: [{type: "Users", id: "LIST"}, 'TotalPageCount'],
        }),
        updateUser: build.mutation<void, Pick<User, 'id'> & Partial<User>>({
            query: ({id, ...put}) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: put,
            }),
            invalidatesTags: [{type: "Users", id: "LIST"}],
        }),
    })
})

export const {
    useGetPaginatedUsersQuery,
    useGetUserByIdQuery,
    useGetTotalPagesCountQuery,
    useAddUserMutation,
    useUpdateUserMutation
} = mockApi;