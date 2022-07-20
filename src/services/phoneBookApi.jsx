import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phoneBookApi = createApi({
    reducerPath: 'phoneBookApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://62d7dc7649c87ff2af3e7b11.mockapi.io/phoneBook_api/v1/',
    }),
    tagTypes: ['Contact'],

    endpoints: bulder => ({
        getAllContacts: bulder.query({
            query: () => `./contacts`,
            providesTags: ['Contact'],
        }),

        addContact: bulder.mutation({
            query: newContact => ({
                url: `./contacts`,
                method: 'POST',
                body: newContact,
            }),
            invalidatesTags: ['Contact'],
        }),

        deleteContact: bulder.mutation({
            query: contactId => ({
                url: `./contacts/${contactId}`,
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