import { Box, Button, TextField } from '@mui/material'

import { useSearch } from '../../hooks/useSearch'

import { useModal } from '../../context/ModalProvider'
import OrderModal from '../OrderModal'
import Filter from './Filter'

const TableHeader = () => {
	const [filters, setFilters] = useSearch({ search: '' })
	const { openModal } = useModal()
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters(initialFilters => ({
			...initialFilters,
			search: e.target.value,
		}))
	}

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
					value={filters.search}
					onChange={handleSearch}
					sx={{ width: 400 }}
				/>
			</Box>
			<Box display={'flex'} alignItems={'center'} gap={'10px'}>
				<Filter />
				<Button onClick={() => openModal()}>Добавить заказ</Button>
				<OrderModal />
			</Box>
		</Box>
	)
}

export default TableHeader
