import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ModalProvider from './context/ModalProvider.tsx'
import './index.css'
import { store } from './store/store.ts'

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#dc004e',
		},
	},
})

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<ModalProvider>
					<CssBaseline />
					<App />
				</ModalProvider>
			</ThemeProvider>
		</Provider>
	</BrowserRouter>
)
