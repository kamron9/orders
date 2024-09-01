import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'
import { FC, memo, useState } from 'react'

interface IDatePicker {
	handleClose: () => void

	setFilters: any
}

const DatePicker: FC<IDatePicker> = ({ handleClose, setFilters }) => {
	const [open, setOpen] = useState(false)
	const [startDate, setStartDate] = useState<Dayjs | null>(null)
	const [endDate, setEndDate] = useState<Dayjs | null>(null)
	// const [_, setFilters] = useSearch({ startDate: '', endDate: '' })

	const handleOpenPicker = () => {
		setOpen(true)
	}

	const handleClosePicker = () => {
		setOpen(false)
	}

	const handleFilterDate = () => {
		const start = startDate?.format('MM-DD-YYYY')
		const end = endDate?.format('MM-DD-YYYY')
		console.log(start, end)
		setFilters((initials: any) => ({
			...initials,
			startDate: start,
			endDate: end,
		}))
		handleClose()
		handleClosePicker()
	}

	return (
		<div>
			<span
				onClick={handleOpenPicker}
				style={{ cursor: 'pointer', color: 'blue' }}
			>
				диапазон
			</span>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Dialog open={open} onClose={handleClosePicker}>
					<DialogTitle>Диапазон дат</DialogTitle>
					<DialogContent>
						<Box display={'flex'} gap={'5px'} padding={'10px'}>
							<MUIDatePicker
								label='Начальная дата'
								value={startDate}
								onChange={(value: Dayjs | null) => setStartDate(value)}
							/>
							<MUIDatePicker
								label={'Конечная дата'}
								value={endDate}
								onChange={(value: Dayjs | null) => setEndDate(value)}
							/>
						</Box>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClosePicker} color='primary'>
							Отмена
						</Button>
						<Button onClick={handleFilterDate} color='primary'>
							ОК
						</Button>
					</DialogActions>
				</Dialog>
			</LocalizationProvider>
		</div>
	)
}
export default memo(DatePicker)
