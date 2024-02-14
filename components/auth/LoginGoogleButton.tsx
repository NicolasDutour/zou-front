"use client"

import { FcGoogle } from "react-icons/fc"
import { Button } from '@/components/ui/button';
import { IconContext } from "react-icons";

export default function LoginGoogleButton() {
  const loginWithGoogle = async () => {

  }

  return (
    <Button onClick={loginWithGoogle} className="mb-4 flex w-full cursor-pointer justify-center rounded-full border border-white p-2 text-white hover:border-2 hover:border-blueDark" variant="outline">
      <IconContext.Provider value={{ className: "text-2xl" }}>
        <div>
          <FcGoogle />
        </div>
      </IconContext.Provider>
      <span className='ml-4'>Google</span>
    </Button>
  )
}
