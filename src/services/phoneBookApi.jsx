import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phoneBookApi = createApi({
    reducerPath: 'phoneBookApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://62da5bc5e56f6d82a75f70d8.mockapi.io/contacts',
    }),
    tagTypes: ['Contact'],

    endpoints: bulder => ({
        getAllContacts: bulder.query({
            query: () => `/`,
            providesTags: ['Contact'],
        }),

        addContact: bulder.mutation({
            query: newContact => ({
                url: `/`,
                method: 'POST',
                body: newContact,
            }),
            invalidatesTags: ['Contact'],
        }),

        deleteContact: bulder.mutation({
            query: contactId => ({
                url: `/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }),
    }),
});

export const {
    useGetAllContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation,
} = phoneBookApi;