import RedirectLoginRegisterButton from "@/components/auth/RedirectLoginRegisterButton";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto w-full max-w-lg rounded-2xl p-8 shadow-custom">
        <RegisterForm />
        <p className="mt-6 text-center text-sm text-gray-700">
          Already member ?{' '}
          <RedirectLoginRegisterButton path="login" />
        </p>
      </div>
    </div>
  )
}
