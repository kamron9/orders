import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // Sizning backend URL
	endpoints: builder => ({
		getOrders: builder.query({
			query: () => '/orders',
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
		}),
		updateOrder: builder.mutation({
			query: ({ id, ...updatedOrder }) => ({
				url: `/orders/${id}`,
				method: 'PUT',
				body: updatedOrder,
			}),
		}),
		deleteOrder: builder.mutation({
			query: id => ({
				url: `/orders/${id}`,
				method: 'DELETE',
			}),
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
