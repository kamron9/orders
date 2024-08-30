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
} from '@mui/material'

import { useGetOrdersQuery } from '../../service/apiSlice'
import { IError } from '../../types/indes'
import Row from './Row'
import TableHeader from './TableHeader'

export interface IOrders {
	_id: number
	count: number
	createdAt: string
	details: string
	orderId: number
	status: string
	price: number
	productTitle: string
}

const OrderTable = () => {
	const { data, error, isLoading } = useGetOrdersQuery({})
	const order = data?.orders as IOrders[]

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
							<TableCell>сумма</TableCell>
							<TableCell align='center'>номер заказа</TableCell>

							<TableCell>действия</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{isLoading &&
							skeletons.map((_, index) => {
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
							})}
						{order?.map((item: IOrders) => {
							return <Row row={item} key={item._id} />
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

export default OrderTable
