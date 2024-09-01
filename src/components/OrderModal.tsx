import CloseIcon from '@mui/icons-material/Close'
import {
	CircularProgress,
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
import { SubmitHandler, useForm } from 'react-hook-form'
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

interface Inputs {
	productTitle: string
	price: string
	status: string
	count: string
	details: string
}

const OrderModal = () => {
	const { open, closeModal, data } = useModal()
	const [addOrder, { isLoading }] = useAddOrderMutation()
	const [openSnackBar, setOpenSnackBar] = useState(false)
	const [message, setMessage] = useState('')
	const [updateOrder] = useUpdateOrderMutation()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			productTitle: data?.productTitle || '',
			price: data?.price?.toString() || '',
			status: data?.status || 'pending',
			count: data?.count?.toString() || '',
			details: data?.details || '',
		},
	})

	const handleCloseSnackBar = () => {
		setOpenSnackBar(false)
		setMessage('')
	}

	const onSubmit: SubmitHandler<Inputs> = async values => {
		try {
			if (data?._id) {
				await updateOrder({
					id: data._id,
					productTitle: values.productTitle,
					price: +values.price,
					status: values.status,
					count: +values.count,
					details: values.details,
				}).unwrap()
				setMessage('Заказ успешно изменен')
			} else {
				await addOrder({
					productTitle: values.productTitle,
					price: +values.price,
					status: values.status,
					count: +values.count,
					details: values.details,
				}).unwrap()
				setMessage('Заказ добавлен')
			}
			setOpenSnackBar(true)
			closeModal()
			reset()
		} catch (error: any) {
			setMessage(error.message || 'Ошибка')
			setOpenSnackBar(true)
		}
	}

	useEffect(() => {
		if (data) {
			reset({
				productTitle: data.productTitle || '',
				price: data.price?.toString() || '',
				status: data.status || 'pending',
				count: data.count?.toString() || '',
				details: data.details || '',
			})
		}
	}, [data, reset])

	return (
		<div>
			<Modal
				open={open}
				onClose={closeModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Box display={'flex'} justifyContent={'end'} mb={'10px'}>
						<IconButton onClick={closeModal}>
							<CloseIcon />
						</IconButton>
					</Box>
					<form
						onSubmit={handleSubmit(onSubmit)}
						style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
					>
						<TextField
							label='Product Title'
							variant='outlined'
							error={!!errors.productTitle}
							helperText={errors.productTitle?.message}
							{...register('productTitle', {
								required: 'Пожалуйста, введите название продукта',
								minLength: { value: 3, message: 'Минимальная длина 3 символа' },
							})}
						/>
						<TextField
							label='Price'
							type='number'
							variant='outlined'
							error={!!errors.price}
							helperText={errors.price?.message}
							{...register('price', { required: 'Пожалуйста, введите цену' })}
						/>
						<FormControl variant='outlined'>
							<InputLabel>Status</InputLabel>
							<Select
								label='Status'
								defaultValue={data?.status || 'pending'}
								{...register('status', { required: true })}
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
							error={!!errors.count}
							helperText={errors.count?.message}
							{...register('count', {
								required: 'Пожалуйста, введите количества  продукта',
								min: { value: 1, message: 'Минимальное количество 1' },
							})}
						/>
						<TextField
							label='Details'
							variant='outlined'
							multiline
							rows={4}
							{...register('details', { required: false })}
						/>
						<Button
							disabled={isLoading}
							type='submit'
							variant='contained'
							color='primary'
							sx={{ padding: '10px' }}
						>
							{isLoading ? <CircularProgress size={20} /> : 'Submit'}
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
