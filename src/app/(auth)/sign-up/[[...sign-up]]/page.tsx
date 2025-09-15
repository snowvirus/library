import React from 'react'
import RegisterForm from '@/components/auth/RegisterForm'
import Image from 'next/image'

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex flex-col justify-center p-6 md:p-10">
          <div className="w-full max-w-md mx-auto">
            <RegisterForm />
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
          <Image
            src="/images/logo.png"
            alt="CityLibrary"
            width={600}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default Signup