import { useQueryClient } from '@tanstack/react-query'
import { Row } from '@tanstack/react-table'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteAccounts } from '@/features/accounts/actions'
import { Account } from '@/features/accounts/types'

export default function useDeleteAccount() {
	const [isDeleting, startDeleteTransition] = useTransition()
	const queryClient = useQueryClient()
	const handleDelete = (row: Row<Account>[]) => {
		startDeleteTransition(async () => {
			const ids = row.map((r) => r.original.id)
			const data = await deleteAccounts(ids)
			if (data && 'error' in data) {
				toast.error('Error eliminando cuentas')
				return
			}
			await queryClient.invalidateQueries({ queryKey: ['accounts'] })
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			toast.success('Cuentas eliminadas')
		})
	}

	return { isDeleting, handleDelete }
}
