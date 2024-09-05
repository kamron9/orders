import { Container } from '@mui/material'

import OrderTable from '../components/orderTable'
import Snackbar from '../components/Snackbar'

const Home = () => {
	return (
		<Container sx={{ pt: '50px' }}>
			<OrderTable />
			<Snackbar />
		</Container>
	)
}

export default Home
