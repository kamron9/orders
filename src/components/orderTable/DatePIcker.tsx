import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

export default function DateRangePickerValue({
	handleClose,
}: {
	handleClose: () => void
}) {
	const [open, setOpen] = useState(false)
	const [startDate, setStartDate] = useState<Dayjs | null>(null)
	const [endDate, setEndDate] = useState<Dayjs | null>(null)

	const handleOpenPicker = () => {
		setOpen(true)
	}

	const handleClosePicker = () => {
		setOpen(false)
	}
	const handleFilterDate = () => {
		console.log(startDate?.format('MM-DD-YYYY'), endDate?.format('MM-DD-YYYY'))
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
							<DatePicker
								label='Начальная дата'
								onChange={(value: Dayjs | null) => setStartDate(value)}
							/>
							<DatePicker
								label={'Конечная дата'}
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
