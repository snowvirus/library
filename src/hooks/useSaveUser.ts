import { useAppDispatch } from "@/hooks";
import { SaveUser } from "@/store/customer";
interface User {
        User_id: string;
        Username: string;
         email:string;
        role:string,
        profilePicture:string,
        isVerified:boolean,
}
const useSaveUser = ()=>{
        const dispatch = useAppDispatch();
        return (user:User)=>{
                // console.log("user",user)
                dispatch(SaveUser(user))
        }
}
export default useSaveUser