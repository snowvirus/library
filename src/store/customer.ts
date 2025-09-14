import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface User {
        User_id: string;
        Username: string;
        email:string;
        role:string;
        profilePicture:string;
        isVerified:boolean;
}

interface userState {
        user: User|null;
}

const initialState: userState={
        user: null
}

const UserSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
                SaveUser(state, action: PayloadAction<User>){
                        // const{User_id, Username,role,profilePicture,isVerified} =action.payload;
                        state.user =action.payload;
                },
                DeleteUser(state ){
                        state.user= null
                }
        }
})
export const {SaveUser,DeleteUser } = UserSlice.actions
export default UserSlice.reducer;