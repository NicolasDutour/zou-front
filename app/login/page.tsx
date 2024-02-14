import RedirectLoginRegisterButton from "@/components/auth/RedirectLoginRegisterButton";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blueDark p-4">
      <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8">
        <LoginForm />
        <p className="mt-6 text-center text-sm text-gray">
          Not registered yet ?{' '}
          <RedirectLoginRegisterButton path="register" />
        </p>
      </div>
    </div>
  )
}
