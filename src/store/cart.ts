import {createSlice} from "@reduxjs/toolkit"
import { Id } from "../../convex/_generated/dataModel";

interface CartItem {
        product_id: Id<"products">;
        quantity: number;
        cart_Owner_id?: string;
}

interface CartState {
        items: CartItem[];
}

const initialState: CartState = {
        items: []
}

const CartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
                addToCart(state, action){
                        const{product_id, quantity, cart_Owner_id} =action.payload;
                        const indexproduct_id = state.items.find(item => item.product_id ===product_id);
                        if(indexproduct_id){
                                indexproduct_id.quantity += quantity;
                        }else{
                                state.items.push({product_id, quantity, cart_Owner_id});
                        }
                },
                ReduceCart(state, action){
                        const{product_id, quantity} =action.payload;
                        const indexproduct_id = state.items.find(item => item.product_id ===product_id);
                        if(indexproduct_id){
                                indexproduct_id.quantity -= quantity;
                                if(indexproduct_id.quantity < 1){
                                        const index = state.items.findIndex(item => item.product_id === product_id);
                                        if (index !== -1) {
                                        state.items.splice(index, 1);
                                }
                                }
                        }
                        else{
                                state.items.push({product_id, quantity});
                        }
                },
                IncreaseCart(state, action){
                        const{product_id, quantity, cart_Owner_id} =action.payload;
                        const indexproduct_id = state.items.find(item => item.product_id ===product_id);
                        if(indexproduct_id){
                                indexproduct_id.quantity += quantity;
                        }else{
                                state.items.push({product_id, quantity, cart_Owner_id});
                        }
                },
                DeleteCart(state, action){
                        const { product_id } = action.payload;
                        const index = state.items.findIndex(item => item.product_id === product_id);
                        if (index !== -1) {
                        state.items.splice(index, 1);
                        // console.log("Current State",state.items)
    }
                },
                ClearCart(state ){
                        state.items = [];
                }
        }
})
export const {addToCart,ReduceCart,IncreaseCart,DeleteCart,ClearCart } = CartSlice.actions
export default CartSlice.reducer;