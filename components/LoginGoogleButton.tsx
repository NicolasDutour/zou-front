"use client"

import { auth, googleProvider } from '@/firebase';
import { signInWithPopup } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import { Button } from '@/components/ui/button';
import { IconContext } from "react-icons";
import { useRouter } from 'next/navigation';

export default function LoginGoogleButton() {
  const router = useRouter()
  const loginWithGoogle = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider)
      console.log("user", userCredentials);
      if (userCredentials?.user?.accessToken) {
        router.push('/admin')
      }

    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <Button onClick={loginWithGoogle} className="flex justify-center text-white cursor-pointer border border-white hover:border-2 hover:border-secondary p-2 w-full rounded-full mb-4" variant="outline">
      <IconContext.Provider value={{ className: "text-2xl" }}>
        <div>
          <FcGoogle />
        </div>
      </IconContext.Provider>
      <span className='ml-4'>Google</span>
    </Button>
  )
}
