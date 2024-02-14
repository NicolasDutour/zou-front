import RedirectLoginRegisterButton from "@/components/auth/RedirectLoginRegisterButton";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blueDark p-4">
      <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8">
        <RegisterForm />
        <p className="mt-6 text-center text-sm text-gray">
          Already member ?{' '}
          <RedirectLoginRegisterButton path="login" />
        </p>
      </div>
    </div>
  )
}
