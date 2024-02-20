import RedirectLoginRegisterButton from "@/components/auth/RedirectLoginRegisterButton";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto w-full max-w-lg rounded-2xl p-8 shadow-custom">
        <LoginForm />
        <p className="mt-6 text-center text-sm text-gray-700">
          Not registered yet ?{' '}
          <RedirectLoginRegisterButton path="register" />
        </p>
      </div>
    </div>
  )
}
