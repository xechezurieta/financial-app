'use client'

import { useMountedState } from 'react-use'

import NewAccountSheet from '@/components/account/new-account-sheet'

export default function SheetProvider() {
	const isMounted = useMountedState()

	if (!isMounted) {
		return null
	}
	return (
		<>
			<NewAccountSheet />
		</>
	)
}
