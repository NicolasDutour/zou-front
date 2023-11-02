import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function DialogPlan({ title, price, description }: { title: string, price: string, description: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <p className="flex flex-col justify-between p-2 mb-2 shadow-lg rounded-xl border-2 border-secondary hover:bg-green-100 text-gray-600">
          <span className="text-secondary text-lg"><span className="font-bold text-2xl"> {title} </span> pour <span className="font-bold text-2xl"> {price} €</span> / mois</span> {description}.
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> {title} </AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
