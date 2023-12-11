import RedirectLoginButton from '@/components/RedirectLoginButton'
import LoginGoogleButton from "@/components/LoginGoogleButton"
import LoginForm from './LoginForm'
import Link from "next/link"

export default function Login() {
  return (
    <div className="flex bg-base h-[calc(100vh-77px)] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto w-full md:max-w-lg bg-white p-4 rounded-lg shadow-custom">
        <h2 className="mt-6 text-center text-2xl font-medium leading-9 tracking-tight">
          Connectez vous
        </h2>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <p className=' text-center mx-4 mb-4'>avec</p> */}

          {/* <LoginGoogleButton /> */}
          {/* <Link className="text-white" href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`}>
          Signi in with google
        </Link> */}

          {/* <p className='text-white text-center mx-4 mb-4'>or</p> */}
          <LoginForm />

          <p className="mt-6 text-center text-sm text-gray-400">
            Pas encore inscrit ?{' '}
            <RedirectLoginButton path="register" />
          </p>
        </div>
      </div>
    </div>
  )
}