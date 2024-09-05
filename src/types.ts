export interface Istatus {
	text: string
	chip:
		| 'default'
		| 'warning'
		| 'success'
		| 'error'
		| 'primary'
		| 'secondary'
		| 'info'
}