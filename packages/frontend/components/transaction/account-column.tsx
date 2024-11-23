import { cn } from '@/lib/utils'
import { useOpenAccount } from '@/stores/account/use-open-account'

type AccountColumnProps = {
	account: string
	accountId: string
}

export default function AccountColumn({
	account,
	accountId
}: AccountColumnProps) {
	const { onOpen: onOpenAccount } = useOpenAccount()
	return (
		<button
			className='flex items-center cursor-pointer hover:underline'
			onClick={() => onOpenAccount(accountId)}
		>
			{account}
		</button>
	)
}
