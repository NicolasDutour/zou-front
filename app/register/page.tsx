import RedirectLoginButton from '@/components/RedirectLoginRegisterButton';
import RegisterForm from "@/components/pages/register/RegisterForm"

export default function Register() {
  return (
    <div className="flex h-[calc(100vh-77px)] flex-1 flex-col justify-center bg-base px-6 lg:px-8">
      <div className="mx-auto w-full rounded-lg bg-white p-4 shadow-custom md:max-w-lg">
        <h2 className="mt-6 text-center text-2xl font-medium leading-9 tracking-tight">
          Enregistrez vous
        </h2>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <RegisterForm />
          <p className="mt-4 text-center text-sm text-gray-400">
            Déjà membre ?{' '}
            <RedirectLoginButton path="login" />
          </p>
        </div>
      </div>
    </div>
  )
}