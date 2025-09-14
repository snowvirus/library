"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import useAuthenticate from "@/hooks/useAuthenticate"
// import useAuthByGoogle from "@/hooks/useAuthByGoogle"
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import Loader from "@/components/Loader/loader"


const LoginForm=({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">)=>{
        const {Authenticate} = useAuthenticate()
        const[IsSubmitting,setIsSubmitting] = useState(false)
        const[SubmittingError,setSubmittingError] = useState("")
        const[Email, setEmail] = useState('')
        const [view,setview] = useState(false)
        const [passwordtype,setpasswordtype] = useState("password")
        const[Password, setPassword] = useState('')

        const router = useRouter();

        // const HandleGoogleLogin= async (response:CredentialResponse)=>{
        //          setIsSubmitting(true);
        //         const AuthRes = await AuthenticateByGoogle(response)
        //         if(!AuthRes.success){
        //                 setSubmittingError(AuthRes.message)
        //                 setTimeout(()=>{
        //                         setSubmittingError("")
        //                 },5000)
        //                  setIsSubmitting(false);
        //                 return
        //         }
        //         router.push('/')
        //          setIsSubmitting(false);
              
        // }

                const HandleView = ()=>{
                        setview(true)
                        setpasswordtype("text")
                
        }
                const HandleHide = ()=>{
                        setview(false)
                        setpasswordtype("password")
                }



        const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
                e.preventDefault();
                setIsSubmitting(true);
                try{
                const Auth = await Authenticate(Email,Password)
                
                if(!Auth?.success){
                        setSubmittingError(Auth?.message)
                        setIsSubmitting(false)
                        return
                }
                setIsSubmitting(false)
                router.push("/")
        }catch(error){
                console.error(error)
                setSubmittingError("Error Logging in")
                setIsSubmitting(false)
        }finally{
                setIsSubmitting(false)
                setTimeout(()=>{
                        setSubmittingError("")
                },10000)
        }
        }
        if(IsSubmitting){
                return <Loader />
        }

  return (
    <form onSubmit={HandleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold"><span className="text-gold" >Welcome</span> Back </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
        {SubmittingError && SubmittingError.length>0 && <p className="text-balance text-sm text-red-500">
          {SubmittingError}
        </p>}
      </div>
      <div className="grid gap-6 border p-6 rounded-lg shadow-lg dark:bg-black bg-slate-100 ">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email"
           type="email"
           value={Email}
           onChange={(e) =>setEmail(e.target.value)}
            placeholder="m@example.com"
             required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/password-reset"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative" >
                <Input id="password"
           type={passwordtype}
           value={Password}
           onChange={(e) =>setPassword(e.target.value)}
           maxLength={16}
           minLength={8}
            required />
            {view ?(
                <IoEye  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>HandleHide()}  />
                ):(
                        <IoMdEyeOff
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>HandleView()}
                />
                )}
          </div>
        </div>
        <Button type="submit" disabled={Email.length < 0 || Password.length<8} className="w-full bg-dark dark:bg-gold ">
          {IsSubmitting ? "Authenticating...":"Login"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>


        {/* <div className="flex justify-center mt-2">
          <GoogleLogin theme="outline" text="continue_with" onSuccess={(response) => {HandleGoogleLogin(response)}} onError={() => {router.push("/sign-up")}} />
        </div> */}
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}
export default LoginForm;