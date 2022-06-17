import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    foundItems:[],
    losItems:[]
}

const slice = createSlice({
    name:"item",
    initialState,
    reducers:{
        getFoundItemsSuccess(state,action){
            state.foundItems = action.payload;
            return state;
        },
        getLostItemsSuccess(state,action){
            state.lostItems = action.payload;
            return state;
        }
    }
})

export const {getFoundItemsSuccess,getLostItemsSuccess} = slice.actions;

export default slice.reducer;
