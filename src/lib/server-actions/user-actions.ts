import { randomBytes } from "crypto"
import { User } from "@/lib/types"
import bcrypt from "bcryptjs";
export const UpdateUser =async (user:User)=>{
              if(user){
              const NewUser = await ctx.db.patch(user._id, {
                ...user,
                updatedAt: Date.now(),
              });
              return {succes:true, status: 20, message: "Success", user: NewUser};
              }
        
        }
export const CreateUser = async (user: User) => {
        const generateSecureToken = (length = 32): string=> {
                return randomBytes(length).toString('hex');
}
        try{
                const token = generateSecureToken();
                const res = await create({...user,
                        reset_token:token,
                        reset_token_expires:Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
                        updatedAt:Date.now(),
                }
                );
                 if(!res.success){
                        return { success: false, message: res.message , status: 400 };
                }
                return { success: true, message:res.message ,  status: 200 };
                }catch(error){
                        return  { success: false, message: error as string , status: 500 };
                        
                }
 }
 export const GetCustomerByEmail = async(email:string) => {
    // Call the registered query using ctx.runQuery
    const customer = await ctx.runQuery(api.users.GetCustomer, { email: args.email });

    if (!customer.user) {
      return { success: false, status: 404, message: "Account not Found, please sign-Up first !", user: null };
    }

    return { success: true, status: 200, message: "Success !", user: customer.user };
  }
        export const AuthenticateUser =async (email:string, password:string)=>{
                        const user = await GetCustomerByEmail(email)
                        if (!user.success || !user.user) {
                               return { success:false ,status: 404,message: "User not Found",user:user.user };
                        }
                        
                        const isMatch = await bcrypt.compare(password, user.user?.passwordHash ?? "");
                        if (!isMatch) {
                          return { success:false ,status: 401,message: "Invalid Password",user:user.user };
                }
                   return { success:true ,status: 201,message: "Success",user:user.user };
        }