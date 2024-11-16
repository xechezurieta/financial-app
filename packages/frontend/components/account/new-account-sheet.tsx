import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { useNewAccount } from '@/stores/use-new-account'

export default function NewAccountSheet() {
	const { isOpen, onClose } = useNewAccount()
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>Nueva cuenta</SheetTitle>
					<SheetDescription>
						Crea una nueva cuenta para empezar controlar tus transacciones.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}
