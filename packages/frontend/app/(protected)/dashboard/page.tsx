'use client'

import { Button } from '@/components/ui/button'
import { useNewAccount } from '@/stores/use-new-account'

export default function Dashboard() {
	const { onOpen } = useNewAccount()
	return (
		<div>
			<Button onClick={onOpen}></Button>
		</div>
	)
}
