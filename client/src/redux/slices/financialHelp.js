import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    financialRequests:[],
    userFinancialRequests:[]
}

const slice = createSlice({
    name:"financialHelp",
    initialState,
    reducers:{
        getFinancialRequestsSuccess(state,action){
            state.financialRequests = action.payload;
            return state;
        },
        getUserFinancialRequestsSuccess(state,action){
            state.userFinancialRequests = action.payload;
            return state;
        }
    }
})

export const {getFinancialRequestsSuccess,getUserFinancialRequestsSuccess} = slice.actions;

export default slice.reducer;