'use client';

import { useForm } from "react-hook-form";
import { FormSchemaLogin, TypeFormSchemaLogin } from "@/lib/validations";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { loginAction } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<TypeFormSchemaLogin>({
    defaultValues: {
      identifier: "",
      password: ""
    },
    resolver: zodResolver(FormSchemaLogin),
    mode: "onTouched"
  })

  const { register, handleSubmit, reset, formState } = form
  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } = formState

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])


  const onSubmit = async (formData: TypeFormSchemaLogin) => {
    const response = await loginAction(formData)
    if (response?.error === "Invalid identifier or password") {
      toast({
        title: "Erreur d'identification",
        description: "Identifiant ou mot de passe invalide.",
        className: "border-destructive text-destructive",
      })
    }

    if (response?.user) {
      toast({
        title: "Félicitation !",
        description: "Vous êtes bien connecté.",
        className: "border-primary text-primary",
      })
      router.push('/dashboard/overview')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex-1">
        <h1 className="mb-3 text-center text-2xl">Login</h1>
        <div className="w-full space-y-2">
          <div>
            <Label htmlFor="identifier">Email</Label>
            <Input
              className={cn({ "border-destructive": errors.identifier })}
              {...register("identifier")}
              id="identifier"
              type="email"
            />
            <p className="mt-2 text-sm text-destructive">{errors.identifier?.message}</p>
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <div className='absolute right-2 top-3 cursor-pointer text-gray-400' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <Eye size={20} /> : <EyeOff size={20} />} </div>
              <Input
                className={cn({ "border-destructive": errors.password })}
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
              />
              <p className="mt-2 text-sm text-destructive">{errors.password?.message}</p>
            </div>
          </div>
          <Button disabled={!isDirty || !isValid || isSubmitting} className={cn(buttonVariants(), "w-full")}>
            {isSubmitting ? (
              <>
                <svg className="-ml-1 mr-3 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#8c9fb9" strokeWidth="4"></circle>
                  <path fill="#135A9A" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Loading...</p>
              </>
            ) : "Login"}
          </Button>
        </div>
      </div>
    </form>
  );
}