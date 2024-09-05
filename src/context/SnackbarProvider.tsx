import { createContext, useContext, useState } from 'react'

type TAlert = 'success' | 'info' | 'warning' | 'error'
interface ISnackbarContext {
	open: boolean
	message: string
	type: TAlert
	handleClose: () => void
	handleOpen: (message: string, type: TAlert) => void
}

const SnackbarContext = createContext<ISnackbarContext>({
	open: false,
	message: '',
	type: 'success',
	handleClose: () => {},
	handleOpen: () => {},
})
export const useSnackbar = () => useContext<ISnackbarContext>(SnackbarContext)

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [message, setMessage] = useState<string>('')
	const [type, setType] = useState<TAlert>('success')

	const handleClose = () => {
		setOpen(false)
	}
	const handleOpen = (message: string, type: TAlert) => {
		setOpen(true)
		setMessage(message)
		setType(type)
	}

	return (
		<SnackbarContext.Provider
			value={{ open, message, type, handleClose, handleOpen }}
		>
			{children}
		</SnackbarContext.Provider>
	)
}

export default SnackbarProvider
