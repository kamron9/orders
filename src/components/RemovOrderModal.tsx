import { Button } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { FC, memo } from 'react'
import { useSnackbar } from '../context/SnackbarProvider'
import { useDeleteOrderMutation } from '../service/apiSlice'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: '#fff',

	p: 4,
}
interface IRemoveOrderModal {
	open: boolean
	id: string
	handleClose: () => void
	children: React.ReactNode
}
const RemoveOrderModal: FC<IRemoveOrderModal> = ({
	open,
	handleClose,
	id,
	children,
}) => {
	const [deleteOrder, { isLoading }] = useDeleteOrderMutation()
	const { handleOpen } = useSnackbar()

	const handleDeleteData = async () => {
		try {
			await deleteOrder(id).unwrap()
			handleClose()
			handleOpen('Заказ успешно удален', 'warning')
		} catch (error: any) {
			handleOpen(error?.message, 'error')
		}
	}

	return (
		<div>
			{children}
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id='transition-modal-title' variant='h6' component='h2'>
							Вы уверены что хотите удалить заказ?
						</Typography>
						<Box sx={{ display: 'flex', gap: '10px', mt: 2 }}>
							<Button
								variant='contained'
								color='error'
								onClick={handleDeleteData}
								disabled={isLoading}
							>
								Удалить
							</Button>
							<Button onClick={handleClose}>Отмена</Button>
						</Box>
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
export default memo(RemoveOrderModal)
