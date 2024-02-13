import RedirectLoginRegisterButton from "@/components/auth/RedirectLoginRegisterButton";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blueDark p-4">
      <div className="mx-auto w-full max-w-lg p-8 bg-white rounded-2xl">
        <RegisterForm />
        <p className="mt-6 text-center text-sm text-gray">
          Already member ?{' '}
          <RedirectLoginRegisterButton path="login" />
        </p>
      </div>
    </div>
  )
}
