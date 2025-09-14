import {jwtDecode} from 'jwt-decode'
import { CredentialResponse } from "@react-oauth/google";
import useCreateUser from "@/hooks/useCreateUser"

interface user {
        username: string,
        email: string,
        passwordHash: string,
        phoneNumber: string,
        profilePicture:string,
        isVerified: boolean,
        role: string,
        reset_token: "",
        reset_token_expires:0,
        updatedAt: 0,
        lastLogin: 0,
}
interface DecodedToken {
  iss?: string;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: boolean;
  nbf?: number;
  name?: string;
  picture?: string;
  given_name?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

const useSignUpWithGoogle =()=>{
        const {CreateUser} = useCreateUser()
        
        try{
        const SignUpWithGoogle = async (Response:CredentialResponse)=>{
                  const  token  = Response
                  try {
                         if (!token.credential) {
                                throw new Error("Google credential is missing");
        }
                        const decoded = jwtDecode<DecodedToken>(token.credential);
                        const user:user = {
                                username:decoded.name||"",
                                email:decoded.email||"",
                                profilePicture:decoded.picture||"",
                                passwordHash:"",
                                phoneNumber:"",
                                isVerified:true,
                                role:"user",
                                reset_token:"",
                                reset_token_expires:0,
                                updatedAt:0,
                                lastLogin:0,
                        } 
                        const res = await CreateUser(user);
                        
                        if(!res.success){
                    return { success: false, message: res.message ,  status: 400 };
                        }         
                        return { success: true, message:res.message+"and verified, you'll be redirected to the sign-in page!",  status: 200 };
                  } catch (error) {
                    console.error('Error creating Account:', error);
                    return { success: false, message: 'Error Creating your account try again Later' ,  status: 500 };
                  }
        }
        
        return {SignUpWithGoogle};
}catch(error){
        throw new Error((error instanceof Error) ? error.message : String(error));
}

}
export default useSignUpWithGoogle;