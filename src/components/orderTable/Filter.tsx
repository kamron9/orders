import { FilterList } from '@mui/icons-material'
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	IconButton,
	Menu,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'
import DatePicker from './DatePIcker'

const Filter = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [searchParams, setSearchParams] = useSearchParams()

	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const [filters, setFilters] = useSearch({
		status: '',
		startDate: '',
		endDate: '',
	})
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleGetStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters({
			...filters,
			status: e.target.value,
		})
	}

	const handleClearFilter = () => {
		setSearchParams({})
		setAnchorEl(null)
	}
	useEffect(() => {
		if (searchParams.get('status')) {
			setFilters(prevFilters => ({
				...prevFilters,
				status: searchParams.get('status') || '',
			}))
		}
	}, [searchParams])
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
						<RadioGroup
							value={filters.status}
							onChange={handleGetStatus}
							name='radio-buttons-group'
						>
							<FormControlLabel value='' control={<Radio />} label='Все' />
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
					<DatePicker setFilters={setFilters} handleClose={handleClose} />
				</Box>
				<Button onClick={handleClearFilter}>Сбросить</Button>
			</Menu>
		</Box>
	)
}

export default Filter
