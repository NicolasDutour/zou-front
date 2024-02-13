import RedirectLoginRegisterButton from "@/components/auth/RedirectLoginRegisterButton";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blueDark p-4">
      <div className="mx-auto w-full max-w-lg p-8 bg-white rounded-2xl">
        <LoginForm />
        <p className="mt-6 text-center text-sm text-gray">
          Not registered yet ?{' '}
          <RedirectLoginRegisterButton path="register" />
        </p>
      </div>
    </div>
  )
}
