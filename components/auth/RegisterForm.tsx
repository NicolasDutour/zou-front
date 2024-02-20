'use client';

import { useForm } from "react-hook-form";
import { FormSchemaRegister, TypeFormSchemaRegister } from "@/lib/validations";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { registerAction } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<TypeFormSchemaRegister>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    resolver: zodResolver(FormSchemaRegister),
    mode: "onTouched"
  })

  const { register, handleSubmit, reset, formState } = form
  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } = formState

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])


  const onSubmit = async (formData: TypeFormSchemaRegister) => {
    const response = await registerAction(formData)
    if (response?.user) {
      toast({
        title: "Félicitation !",
        description: "Vous êtes bien connecté.",
        className: "border-primary text-blue",
      })
      router.push('/dashboard/overview')
      // router.push('/verify-email')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex-1">
        <h1 className="mb-3 text-center text-2xl">
          Register
        </h1>
        <div className="w-full space-y-2">
          <div>
            <Label htmlFor="username">Prénom</Label>
            <Input
              className={cn({ "border-destructive": errors.username })}
              {...register("username")}
              id="username"
              type="text"
            />
            <p className="mt-2 text-sm text-destructive">{errors.username?.message}</p>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              className={cn({ "border-destructive": errors.email })}
              {...register("email")}
              id="email"
              type="email"
            />
            <p className="mt-2 text-sm text-destructive">{errors.email?.message}</p>
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

          <div className="mt-4">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <div className='absolute right-2 top-3 cursor-pointer text-xl text-gray-400' onClick={() => setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />} </div>
              <Input
                className={cn({ "border-destructive": errors.username })}
                {...register("confirmPassword")}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
              />
              <p className="mt-2 text-sm text-destructive">{errors.confirmPassword?.message}</p>
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
            ) : "Register"}
          </Button>
        </div>
      </div>
    </form>
  );
}