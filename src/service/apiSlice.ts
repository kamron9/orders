import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://orders-backend.vercel.app/api',
	}),
	tagTypes: ['Order'],
	endpoints: builder => ({
		getOrders: builder.query({
			query: ({
				search,
				status,
				sortField,
				sortOrder,
				page,
				limit,
				startDate,
				endDate,
			}) => ({
				url: '/orders',
				params: {
					search: search,
					status,
					sortField,
					sortOrder,
					page,
					limit,
					startDate,
					endDate,
				},
			}),
			providesTags: () => ['Order'],
		}),
		getOrderById: builder.query({
			query: id => `/orders/${id}`,
		}),
		addOrder: builder.mutation({
			query: newOrder => ({
				url: '/orders',
				method: 'POST',
				body: newOrder,
			}),
			invalidatesTags: ['Order'],
		}),
		updateOrder: builder.mutation({
			query: ({ id, ...updatedOrder }) => ({
				url: `/orders/${id}`,
				method: 'PUT',
				body: updatedOrder,
			}),
			invalidatesTags: ['Order'],
		}),
		deleteOrder: builder.mutation({
			query: id => ({
				url: `/orders/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Order'],
		}),
	}),
})

export const {
	useGetOrdersQuery,
	useGetOrderByIdQuery,
	useAddOrderMutation,
	useUpdateOrderMutation,
	useDeleteOrderMutation,
} = orderApi
