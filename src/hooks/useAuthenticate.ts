"use client"
import useSaveUser from "./useSaveUser";
import { UpdateUser } from "@/lib/server-actions/user-actions";
import { AuthenticateUser } from "@/lib/server-actions/user-actions";
// type User = {
//             username: string,
//             email: string,
//             passwordHash: string,
//             phoneNumber: string,
//             profilePicture: string,
//             isVerified: boolean,
//             role: string,
//             reset_token: string,
//             reset_token_expires:number,
//             updatedAt: number,
//             lastLogin: number,
//       };
interface UsertoSave {
        User_id: string|"";
        Username: string|"";
         email:string|"";
        role:string|"",
        profilePicture:string|"",
        isVerified:boolean,
}
      type response={
        success:boolean
        message: string
        status:number
        user:{
                _id?: string;
                username: string,
                email: string,
                passwordHash: string,
                phoneNumber?: string,
                profilePicture?: string,
                isVerified: boolean,
                role: string,
                reset_token?: string,
                reset_token_expires?:number,
                updatedAt?: number,
                lastLogin?: number,
        } | null
      }
      
const useAuthenticate = () => {
 const saveUser = useSaveUser();
    const Authenticate = async (email: string | "",password:string) => {
      try {
        
              const res:response = await AuthenticateUser(email,password)
        //       const data = res?.json();
        // setData(res);
        if(!res.success){
                if(res?.status===404){
                        return { success: false, message: res.message};
                }
                // setError(data?.);
                if (res?.status === 401) {
                        return { success: false, message: res.message };
                }

        return { success: false, message:"Login failed" };
        }
        const user = res.user
        
                        try {
                        const response = await fetch('/api/createsession', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                        userId: user?._id,
                                        role: user?.role,
                                        isVerified: user?.isVerified,
                                }),
                        });
                        const usertosave:UsertoSave = { 
                                User_id: user?._id||"",
                                Username:user?.username||"",
                                 email:user?.email||"",
                                role:user?.role||"",
                                profilePicture:user?.profilePicture||"",
                                isVerified:user?.isVerified||false, 
                        }
                        saveUser(usertosave)
                          if (user?._id) {
                                                        UpdateUser({
                                                                ...user,
                                                                _id: user._id as string,
                                                                lastLogin: Date.now(),
                                                                _creationTime: 0,
                                                                reset_token_expires: user.reset_token_expires ?? 0,
                                                                updatedAt: Date.now(),
                                                                
                                                        });
                                                }
                        
                        if (!response.ok) {
                                throw new Error('Failed to create session');
                        }
                        
                        return { success: true, status: 201, message: 'Success' };
                } catch (error) {
                        console.error('Error during session creation:', error);
                        return { success: false, status: 500, message: `Internal Server Error ${error}` };
                }
      } catch (err) {
        console.error(err);
        return { success: false, message: "Internal Server Error" };
      } 
    };


  return {Authenticate };
};

export default useAuthenticate;