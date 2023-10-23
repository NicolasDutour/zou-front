import Image from "next/image"
import RedirectLoginButton from '@/components/RedirectLoginButton';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/chef-hat.png"
          alt="chef-hat"
          width={100}
          height={100}
          aspect-auto="true"
          className="rounded-lg mx-auto w-auto"
          priority
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />

        <p className="mt-10 text-center text-sm text-gray-400">
          Not a member?{' '}
          <RedirectLoginButton path="register" />
        </p>
      </div>
    </div>
  )
}