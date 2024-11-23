import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getAPIUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_API_URL}${path}`
}

export function convertAmountToMiliunits(amount: number) {
	return Math.round(amount * 1000)
}

export function convertAmountFromMiliunits(amount: number) {
	return amount / 1000
}

export default function formatCurrency(amount: number) {
	return Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR'
	}).format(amount)
}
