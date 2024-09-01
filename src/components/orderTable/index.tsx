import {
	Paper,
	Skeleton,
	Snackbar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material'

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetOrdersQuery } from '../../service/apiSlice'
import { IError } from '../../types/indes'
import CustomPagination from './Pagination'
import Row from './Row'
import TableHeader from './TableHeader'

export interface IOrders {
	_id: string
	count: number
	createdAt: string
	details: string
	orderId: number
	status: string
	price: number
	productTitle: string
}

const OrderTable = () => {
	const [searchParams] = useSearchParams()

	const { data, error, isLoading } = useGetOrdersQuery({
		search: searchParams.get('search') ? searchParams.get('search') : '',
		page: searchParams.get('page') ? searchParams.get('page') : '',
		status: searchParams.get('status') ? searchParams.get('status') : '',
		startDate: searchParams.get('startDate')
			? searchParams.get('startDate')
			: '',
		endDate: searchParams.get('endDate') ? searchParams.get('endDate') : '',
	})
	const order = (data?.orders as IOrders[]) || []

	if (error) {
		const { data } = error as IError
		return (
			<Snackbar
				open={true}
				message={data.message}
				anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
			/>
		)
	}

	const [sortField, setSortField] = useState<string>('')
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

	const handleSort = (field: string) => {
		const isAsc = sortField === field && sortOrder === 'asc'
		setSortOrder(isAsc ? 'desc' : 'asc')
		setSortField(field)
	}

	const sortedOrder = [...order]?.sort((a, b) => {
		if (sortField === 'price') {
			return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
		} else {
			return sortOrder === 'asc'
				? a._id.localeCompare(b._id)
				: b._id.localeCompare(a._id)
		}
	})

	const skeletons = Array.from({ length: 5 })

	return (
		<Paper sx={{ width: '100%', mb: 2 }}>
			<TableHeader />
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>продукты</TableCell>
							<TableCell>статус</TableCell>
							<TableCell>
								<TableSortLabel
									active={sortField === 'price'}
									direction={sortField === 'price' ? sortOrder : 'asc'}
									onClick={() => handleSort('price')}
								>
									сумма
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={sortField === 'orderId'}
									direction={sortField === 'orderId' ? sortOrder : 'asc'}
									onClick={() => handleSort('orderId')}
								>
									номер заказа
								</TableSortLabel>
							</TableCell>

							<TableCell>действия</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{isLoading
							? skeletons.map((_, index) => {
									return (
										<TableRow key={index}>
											<TableCell>
												<Skeleton animation='wave' width={40} height={40} />
											</TableCell>
											<TableCell>
												<Skeleton animation='wave' width={200} />
											</TableCell>
											<TableCell>
												<Skeleton animation='wave' width={100} />
											</TableCell>
											<TableCell>
												<Skeleton animation='wave' width={100} />
											</TableCell>
											<TableCell>
												<Skeleton animation='wave' width={100} />
											</TableCell>
											<TableCell sx={{ display: 'flex' }}>
												<Skeleton animation='wave' width={30} height={30} />
												<Skeleton animation='wave' width={30} height={30} />
											</TableCell>
										</TableRow>
									)
							  })
							: sortedOrder.map(order => <Row row={order} key={order._id} />)}
					</TableBody>
				</Table>
				<CustomPagination count={data?.total} />
			</TableContainer>
		</Paper>
	)
}

export default OrderTable
