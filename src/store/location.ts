import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface Location {
        lat: number;
        lng: number;
}


interface locationState {
        location: Location;
}

const initialState: locationState={
        location: {lat: 0.5703, lng:32.6438 }
}

const LocationSlice = createSlice({
        name: 'location',
        initialState,
        reducers: {
                SaveLocation(state, action: PayloadAction<Location>){
                        state.location =action.payload;
                },
                // DeleteUser(state ){
                //         state.user= null
                // }
        }
})
export const {SaveLocation} = LocationSlice.actions
export default LocationSlice.reducer;