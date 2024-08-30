import CloseIcon from '@mui/icons-material/Close'
import {
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	TextField,
} from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { useModal } from '../context/ModalProvider'
import {
	useAddOrderMutation,
	useUpdateOrderMutation,
} from '../service/apiSlice'
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	borderRadius: '10px',
	p: 2,
}

const OrderModal = () => {
	const { open, openModal, closeModal, data } = useModal()
	const [addOrder, { isLoading, isSuccess, isError, error }] =
		useAddOrderMutation()

	const [openSnackBar, setOpenSnackBar] = useState(false)
	const [message, setMessage] = useState('')
	const [updateOrder] = useUpdateOrderMutation()
	const handleOpen = () => openModal({} as any)
	const handleClose = () => closeModal()
	const [productTitle, setProductTitle] = useState('')
	const [price, setPrice] = useState('')
	const [status, setStatus] = useState('pending')
	const [count, setCount] = useState('')
	const [details, setDetails] = useState('')

	const handleCloseSnackBar = () => {
		setOpenSnackBar(false)
		setMessage('')
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		try {
			if (Object.keys(data as {}).length) {
				await updateOrder({
					id: data?._id,
					productTitle,
					price: +price,
					status,
					count: +count,
					details,
				}).unwrap()
				setMessage('Заказ успешно изменен')
			} else {
				await addOrder({
					productTitle,
					price: +price,
					status,
					count: +count,
					details,
				}).unwrap()
				setMessage('Заказ добавлен')
			}
			setOpenSnackBar(true)
			closeModal()
		} catch (error: any) {
			setMessage(error.message || 'Ошибка')
			setOpenSnackBar(true)
		}
	}
	useEffect(() => {
		if (data) {
			setProductTitle(data.productTitle || '')
			setPrice(data.price?.toString() || '')
			setStatus(data.status || 'pending')
			setCount(data.count?.toString() || '')
			setDetails(data.details || '')
		}
	}, [data])
	return (
		<div>
			<Button onClick={handleOpen}>Добавить заказ</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Box display={'flex'} justifyContent={'end'} mb={'10px'}>
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</Box>
					<form
						onSubmit={handleSubmit}
						style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
					>
						<TextField
							label='Product Title'
							variant='outlined'
							value={productTitle}
							onChange={e => setProductTitle(e.target.value)}
							required
						/>
						<TextField
							label='Price'
							type='number'
							variant='outlined'
							value={price}
							onChange={e => setPrice(e.target.value)}
							required
						/>
						<FormControl variant='outlined' required>
							<InputLabel>Status</InputLabel>
							<Select
								value={status}
								onChange={e => setStatus(e.target.value)}
								label='Status'
							>
								<MenuItem value='pending'>Ожидает оплаты</MenuItem>
								<MenuItem value='sent'>Отправлен</MenuItem>
								<MenuItem value='delivered'>Доставлен</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label='Count'
							type='number'
							variant='outlined'
							value={count}
							onChange={e => setCount(e.target.value)}
							required
						/>
						<TextField
							label='Details'
							variant='outlined'
							multiline
							rows={4}
							value={details}
							onChange={e => setDetails(e.target.value)}
							required
						/>
						<Button type='submit' variant='contained' color='primary'>
							Submit
						</Button>
					</form>
				</Box>
			</Modal>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={4000}
				message={message}
				onClose={handleCloseSnackBar}
				anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
			/>
		</div>
	)
}
export default OrderModal
