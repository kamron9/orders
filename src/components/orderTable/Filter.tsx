import { FilterList } from '@mui/icons-material'
import {
	Box,
	FormControl,
	FormControlLabel,
	IconButton,
	Menu,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import DatePicker from './DatePIcker'

const Filter = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<Box>
			<IconButton onClick={handleClick}>
				<FilterList />
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				variant='selectedMenu'
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Box px={'16px'} py={'6px'}>
					<FormControl>
						<Typography> по статусу </Typography>
						<RadioGroup defaultValue='all' name='radio-buttons-group'>
							<FormControlLabel value='all' control={<Radio />} label='Все' />
							<FormControlLabel
								value='delivered'
								control={<Radio />}
								label='Доставлен'
							/>
							<FormControlLabel
								value='pending'
								control={<Radio />}
								label='В ожидании'
							/>
							<FormControlLabel
								value='sent'
								control={<Radio />}
								label='Отправлен'
							/>
						</RadioGroup>
					</FormControl>
				</Box>
				<Box px={'16px'} py={'6px'}>
					<DatePicker handleClose={handleClose} />
				</Box>
			</Menu>
		</Box>
	)
}

export default Filter
