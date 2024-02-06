"use client"

import Link from "next/link";
import { UserType } from '@/lib/types/userType';
import { createCustomer, createPrice, createProduct, createSessionCheckout, createSubscription } from "@/lib/actions/stripe-actions";
import { profileAction } from "@/lib/actions/profile-actions";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaProductsOptionPlan, TypeFormSchemaProductsOption } from "@/lib/types/planType";
import { Switch } from "@/components/ui/switch";
import { MonthlyCard } from "./MonthlyCard";
import { OptionsCard } from "./OptionsCard";

export function SubscriptionForm({ user }: { user: UserType }) {
  const [options, setOptions] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<TypeFormSchemaProductsOption>({
    resolver: zodResolver(FormSchemaProductsOptionPlan),
  });

  const productsOptionsWatch = watch('productsOptions', 0)

  const handleOptions = (checked: boolean) => {
    setOptions(checked)
  }

  useEffect(() => {
    if (options) {
      setTotalPrice(productsOptionsWatch * 2)
    } else {
      setValue('productsOptions', 0)
      setTotalPrice(0)
    }
  }, [productsOptionsWatch, options, setValue])

  async function onHandleCreateOrUpdateSubscription() {
    let customer = user?.stripeUserId;
    if (!customer) {
      const data = await createCustomer(user?.username, user?.email);
      if (data) {
        await profileAction({ stripeUserId: data.id }, user?.id);
        customer = data.id;
      }
    }

    if (customer) {
      const product = await createProduct("zou-plan");
      console.log("product", product);

      const price = await createPrice("prod_PVlhTgGX0SB5ya", totalPrice, "EUR", "week", 2);
      console.log("price", price);

      const plan = await createSubscription(customer, "price_1OgkClBt6PYjLNhAp0019Cjq");
      console.log("plan", plan);

      const session = await createSessionCheckout(customer, false, "price_1OgkClBt6PYjLNhAp0019Cjq");
      console.log("session", session);
    } else {
      console.error("Failed to create Stripe user");
    }
  }

  return (
    <form onSubmit={handleSubmit(onHandleCreateOrUpdateSubscription)}>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <MonthlyCard />
        {options ? <OptionsCard /> : null}
      </div>
      <div className="my-4 flex items-center space-x-2">
        <Label htmlFor="options">Sans Options</Label>
        <Switch
          checked={options}
          onCheckedChange={handleOptions}
          className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-secondary" id="options" />
        <Label htmlFor="options">Avec Options</Label>
      </div>

      {
        options ? (
          <div className="mb-6 flex w-full flex-col md:w-1/2">
            <Label htmlFor="productsOptions" className="mt-4 block text-sm font-medium leading-6 text-secondary">
              Nombre de produits que nous ajouterons pour vous:
            </Label>
            <input
              {...register('productsOptions', {
                setValueAs: (value) => Number(value),
              })}
              type="number"
              value={productsOptionsWatch}
              id="productsOptions"
              className="block w-full rounded-md border-0 bg-white p-2 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6 md:w-1/4"
            />
            <p className="mt-2 text-sm text-red-500">{errors.productsOptions?.message}</p>
          </div>
        ) : null
      }
      <div className="w-full rounded-2xl bg-muted p-4 md:w-1/2">
        <p className="mb-4 text-lg text-secondary">Votre commande:</p>
        <p>- Formule principale: <span className="text-secondary">{formatCurrency(19)}</span> </p>
        {
          options && productsOptionsWatch > 0 ? (
            <p>- Vos options: <span className="text-secondary">{totalPrice > 0 ? formatCurrency(totalPrice) : "0 €"}</span> </p>
          ) : null
        }
        <p className="mt-4 text-xl">- Total: <span className="text-secondary">{formatCurrency(totalPrice + 19)}</span> </p>
      </div>
      <div className="mt-4 flex w-full gap-2 md:w-1/2">
        <Link
          href="/admin/subscription"
          className="flex w-full  justify-center rounded-md bg-muted px-3 py-1.5 text-sm font-medium leading-6 text-gray-600 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          Annuler
        </Link>
        <button
          type="submit"
          className="flex w-full  justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          Je souscris
        </button>
      </div>
      <p className="mb-2 mt-4 text-sm text-primary">Après validation, vous serez redirigé vers une page sécurisée de paiement <em className="text-primary ">Stripe</em></p>
    </form >
  );
}