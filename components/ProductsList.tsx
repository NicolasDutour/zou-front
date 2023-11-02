import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { capitalize } from "@/lib/utils"
import { useSelector } from "react-redux"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function ProductsList({ products, updateProduct }: { products, updateProduct: (product: object) => void }) {
  const token = useSelector((state: any) => state.auth.token)
  const { toast } = useToast()
  const router = useRouter()

  const deleteProduct = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      })
    console.log("response after delete product", response);

    if (response.status === 200) {
      try {
        toast({
          title: "Produit supprimé avec succés !"
        })
        router.refresh()
      } catch (error) {
        console.error('ERROR: ', error);
        toast({
          title: "ERROR:",
          description: error
        })
      }
    }
  }

  const updateCurrentProduct = (product: object) => {
    updateProduct(product)
  }

  return (
    <div>
      {
        products?.map(product => {
          return (
            <Card className='odd:bg-gray-100 md:flex justify-between items-center border-b first:border-t border-gray-300 mb-2' key={product.id}>
              <CardHeader>
                <CardTitle>{capitalize(product.product_name.toLowerCase())}</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                {product.ingredients}
              </CardContent>
              <CardFooter className="block md:flex py-2">
                <p className="w-24 mb-4 md:mb-0">{product.price} € </p>
                <div className='flex flex-col md:flex-row w-full justify-center md:items-center gap-2 md:ml-4'>
                  <AlertDialog>
                    <AlertDialogTrigger className="p-2 border-2 border-primary rounded-md text-primary">Remove</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Voulez vous supprimer définitivement ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete <span className="underline underline-offset-4 text-primary">{product.product_name} </span> and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="p-2 bg-primary rounded-md text-white" onClick={() => deleteProduct(product.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <button onClick={() => updateCurrentProduct(product)} className="p-2 border-2 border-secondary rounded-md text-secondary">Update</button>
                </div>
              </CardFooter>
            </Card>
          )
        })
      }
    </div>
  )
}
