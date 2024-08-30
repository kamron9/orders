import { Box, Button, Container, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface IFormInput {
	username: string
	password: string
}

const Login = () => {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>()

	const onSubmit: SubmitHandler<IFormInput> = data => {
		localStorage.setItem('user', JSON.stringify(data))
		navigate('/', { replace: true })
	}

	return (
		<Container>
			<Box
				sx={{
					width: '100%',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box sx={{ backgroundColor: 'white', p: '30px', borderRadius: '12px' }}>
					<Box sx={{ textAlign: 'center' }}>
						<h3>Sign in</h3>
					</Box>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							label='Username'
							variant='outlined'
							margin='normal'
							fullWidth
							helperText={errors.username?.message}
							error={!!errors.username}
							{...register('username', {
								required: 'username is required',
								minLength: 3,
							})}
						/>
						<TextField
							label='Password'
							type='password'
							variant='outlined'
							margin='normal'
							fullWidth
							helperText={errors.password?.message}
							error={!!errors.password}
							{...register('password', {
								required: 'password is required',
								minLength: 3,
							})}
						/>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							fullWidth
							sx={{ py: '10px' }}
						>
							Login
						</Button>
					</form>
				</Box>
			</Box>
		</Container>
	)
}

export default Login
