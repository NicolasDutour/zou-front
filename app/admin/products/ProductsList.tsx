import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { capitalize } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AiOutlineDelete } from "react-icons/ai"
import { BiEditAlt } from "react-icons/bi"
import { ProductAdminType } from "@/lib/types"

export default function ProductsList({ products, token, updateProduct }: { products: ProductAdminType[], token: string, updateProduct: ({ }) => void }) {
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
    <Table>
      <TableHeader>
        <TableRow className="border-b border-b-gray-700">
          <TableHead className="w-2/12 border-l border-gray-700 font-semibold">Name</TableHead>
          <TableHead className="w-1/12 border-l border-gray-700 font-semibold">Base</TableHead>
          <TableHead className="w-5/12 border-l border-gray-700 font-semibold">Ingredients</TableHead>
          <TableHead className="w-1/12 border-l border-gray-700 font-semibold">Price</TableHead>
          <TableHead className="w-1/12 border-l border-gray-700 font-semibold">Status</TableHead>
          <TableHead className="w-2/12 border-l border-gray-700 font-semibold text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => {
          return (
            <TableRow className="hover:shadow-lg" key={product.id}>
              <TableCell className="font-medium">{capitalize(product.product_name.toLowerCase())}</TableCell>
              <TableCell>{capitalize(product.base.toLowerCase())}</TableCell>
              <TableCell>{product.ingredients}</TableCell>
              <TableCell className="text-right">{product.price} €</TableCell>
              <TableCell> <p className="p-2 text-secondary font-bold text-center">{product.publishedAt ? 'Published' : ''}</p></TableCell>
              <TableCell className="text-center">
                <AlertDialog>
                  <AlertDialogTrigger className="text-2xl text-primary">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><AiOutlineDelete /></TooltipTrigger>
                        <TooltipContent className=" bg-white text-primary text-base border border-primtext-primary">
                          <p>Delete product</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Voulez vous supprimer définitivement ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete <span className="underline underline-offset-4 text-primary">{product.product_name} </span> and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-primary rounded-md text-white" onClick={() => deleteProduct(product.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button onClick={() => updateCurrentProduct(product)} className="text-2xl bg-white border-none shadow-none text-secondary">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><BiEditAlt /></TooltipTrigger>
                      <TooltipContent className=" bg-white text-secondary text-base border border-secondary">
                        <p>Update product</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table >
  )
}