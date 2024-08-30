import { Box, TextField } from '@mui/material'
import OrderModal from '../OrderModal'
import Filter from './Filter'

interface OrderFiltersProps {
	onFilterChange: (filters: any) => void
}

const TableHeader = () => {
	return (
		<Box
			display='flex'
			width={'100%'}
			justifyContent='space-between'
			mb={2}
			p={'16px'}
		>
			<Box display={'flex'} alignItems={'center'} gap={'20px'}>
				<h3>Закази</h3>
				<TextField
					placeholder='Поиск  по имени клиента или номеру заказа...'
					variant='outlined'
					size='small'
					sx={{ width: 400 }}
				/>
			</Box>
			<Box display={'flex'} alignItems={'center'} gap={'10px'}>
				<Filter />
				<OrderModal />
			</Box>
		</Box>
	)
}

export default TableHeader
