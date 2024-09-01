import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export interface IFilters {
	[key: string]: string | undefined
}

export const useSearch = (initialFilters: IFilters) => {
	const [filters, setFilters] = useState(initialFilters)
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		const handler = setTimeout(() => {
			Object.keys(filters).forEach(key => {
				const value = filters[key]
				if (value) {
					searchParams.set(key, value)
				} else {
					searchParams.delete(key)
				}
			})
			setSearchParams(searchParams)
		}, 300)

		return () => {
			clearTimeout(handler)
		}
	}, [filters, searchParams, setSearchParams])

	return useMemo(() => [filters, setFilters] as const, [filters, setFilters])
}
