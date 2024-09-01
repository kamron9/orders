import { createContext, useContext, useState } from 'react'
import { IOrders } from '../components/orderTable'

interface IModalContext {
	openModal: (data?: IOrders) => void
	closeModal: () => void
	data: IOrders | null
	open: boolean
}

const ModalContext = createContext<IModalContext>({
	openModal: () => {},
	closeModal: () => {},
	data: null,
	open: false,
})

export const useModal = () => useContext(ModalContext)

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [data, setData] = useState<IOrders | null>(null)

	const openModal = (data?: IOrders) => {
		if (data) setData(data)

		setOpen(true)
	}
	const closeModal = () => {
		setOpen(false)
		setData(null)
	}

	return (
		<ModalContext.Provider value={{ openModal, closeModal, data, open }}>
			{children}
		</ModalContext.Provider>
	)
}
export default ModalProvider
