import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const user = JSON.parse(localStorage.getItem('user') || '{}')
	return !!user.username ? children : <Navigate to={'/login'} />
}

const App = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />

			<Route
				path='/'
				element={
					<PrivateRoute>
						<Home />
					</PrivateRoute>
				}
			/>
		</Routes>
	)
}

export default App
