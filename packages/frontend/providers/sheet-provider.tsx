'use client'

import { useEffect, useState } from 'react'

import NewAccountSheet from '@/components/account/new-account-sheet'

export default function SheetProvider() {
	const [isMounted, setIsMounted] = useState(false)
	useEffect(() => {
		setIsMounted(true)
	}, [])
	if (!isMounted) return null
	return (
		<>
			<NewAccountSheet />
		</>
	)
}
