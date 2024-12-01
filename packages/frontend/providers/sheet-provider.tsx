'use client'

import { useEffect, useState } from 'react'

import EditCategorySheet from '@/components/category/edit-category-sheet'
import NewCategorySheet from '@/components/category/new-category-sheet'
import EditTransactionSheet from '@/components/transaction/edit-transaction-sheet'
import NewTransactionSheet from '@/components/transaction/new-transaction-sheet'
import EditAccountSheet from '@/features/accounts/components/edit-account-sheet'
import NewAccountSheet from '@/features/accounts/components/new-account-sheet'

export default function SheetProvider() {
	const [isMounted, setIsMounted] = useState(false)
	useEffect(() => {
		setIsMounted(true)
	}, [])
	if (!isMounted) return null
	return (
		<>
			<EditAccountSheet />
			<NewAccountSheet />

			<EditCategorySheet />
			<NewCategorySheet />

			<EditTransactionSheet />
			<NewTransactionSheet />
		</>
	)
}
