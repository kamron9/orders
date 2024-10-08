import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
	Box,
	Chip,
	Collapse,
	IconButton,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { IOrders } from '.'
import { useModal } from '../../context/ModalProvider'
import { Istatus } from '../../types'
import { formatDate } from '../../utils/formatDate'
import RemoveOrderModal from '../RemovOrderModal'

const Row = ({ row }: { row: IOrders }) => {
	const [openRow, setOpenRow] = useState<boolean>(false)
	const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false)
	const productTitle =
		row.productTitle.length > 30
			? row.productTitle.slice(0, 30)
			: row.productTitle
	const { openModal } = useModal()
	const generateStatus = (status: string): Istatus => {
		switch (status) {
			case 'pending':
				return { text: 'Ожидает оплаты', chip: 'warning' }
			case 'delivered':
				return { text: 'Доставлен', chip: 'success' }
			case 'sent':
				return { text: 'Отправлен', chip: 'default' }
			default:
				return { text: 'неизвестно', chip: 'default' }
		}
	}

	const handleOpen = () => {
		setOpenRemoveModal(true)
	}
	const hadleClose = () => {
		setOpenRemoveModal(false)
	}
	const onEditData = () => {
		openModal(row)
	}
	return (
		<>
			<TableRow
				key={row._id}
				sx={{
					'&:last-child td, &:last-child th': { border: 0 },
					'& > *': { borderBottom: 'unset' },
				}}
			>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpenRow(!openRow)}
					>
						{openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component={'th'}>{productTitle}</TableCell>
				<TableCell>
					<Chip
						label={generateStatus(row.status).text}
						color={generateStatus(row.status).chip}
					/>
				</TableCell>

				<TableCell>{row.price.toLocaleString('ru')} сум</TableCell>
				<TableCell align='center'>{row.orderId}</TableCell>

				<TableCell sx={{ display: 'flex', gap: '5px' }}>
					<IconButton onClick={onEditData}>
						<EditIcon />
					</IconButton>
					<RemoveOrderModal
						open={openRemoveModal}
						handleClose={hadleClose}
						id={row._id}
					>
						<IconButton color='error' onClick={handleOpen}>
							<DeleteOutlineIcon />
						</IconButton>
					</RemoveOrderModal>
				</TableCell>
			</TableRow>

			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse
						sx={{ py: '15px' }}
						in={openRow}
						timeout='auto'
						unmountOnExit
					>
						<Box display={'flex'} alignItems={'center'} gap={'10px'}>
							<Typography component={'h3'} fontWeight={600}>
								Название продукта
							</Typography>
							<span>{row.productTitle}</span>
						</Box>
						<Box display={'flex'} alignItems={'center'} gap={'10px'}>
							<Typography component={'h3'} fontWeight={600}>
								Время получения:
							</Typography>
							<span>{formatDate(row.createdAt)}</span>
						</Box>
						<Box display={'flex'} alignItems={'center'} gap={'10px'}>
							<Typography component={'h3'} fontWeight={600}>
								Количество:
							</Typography>
							<span>{row.count}</span>
						</Box>

						<Box display={'flex'} alignItems={'center'} gap={'10px'}>
							<Typography component={'h3'} fontWeight={600}>
								Итог:
							</Typography>
							<span>{(row.count * row.price).toLocaleString('ru')} сум</span>
						</Box>

						<Box>
							<Typography component={'h3'} fontWeight={600}>
								Дополнительно:
							</Typography>
							<Typography>
								{row.details ? row.details : 'нет описания'}
							</Typography>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	)
}
export default Row
