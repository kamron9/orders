import { Box } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { FC } from 'react'
import { useSearch } from '../../hooks/useSearch'

interface ICustomPagination {
	count?: number
	page?: number
}
const CustomPagination: FC<ICustomPagination> = ({ count = 10 }) => {
	const [_, setFilters] = useSearch({ page: '' })
	const totalPage = Math.ceil(count / 10)
	const handleChange = (_: any, value: number) => {
		console.log(value)
		setFilters(intialFilters => ({
			...intialFilters,
			page: value.toString(),
		}))
	}
	return (
		<Box my={'20px'} display={'flex'} justifyContent={'end'} px={'16px'}>
			<Stack spacing={2}>
				<Pagination count={totalPage} shape='rounded' onChange={handleChange} />
			</Stack>
		</Box>
	)
}
export default CustomPagination
