// import {SignIn} from "@clerk/nextjs"
import LoginForm from "../components/login"
import React from 'react'
import Image from "next/image"

const Signin = () => {
  return (
   <div className="grid min-h-svh mt-[5%]  lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden mt-6 lg:block">
        <Image
          src="/images/logo2.png"
          alt="Image"
          width="500"
          height="500"
          className="absolute inset-0 h-[70] w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default Signin