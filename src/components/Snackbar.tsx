import { Alert, Snackbar as MuiSnackbar } from '@mui/material'
import { useSnackbar } from '../context/SnackbarProvider'

const Snackbar = () => {
	const { handleClose, message, type, open } = useSnackbar()
	return (
		<MuiSnackbar
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}
			anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
		>
			<Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
				{message}
			</Alert>
		</MuiSnackbar>
	)
}

export default Snackbar
