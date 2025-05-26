import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Anvaya_CRM_URL } from "./userSlice";

export const fetchLeadsByQuery = createAsyncThunk("leads/fetchLeadsByQuery", async (query) => {
   try {
    const token = localStorage.getItem("token");
     const response = await axios.get(`${Anvaya_CRM_URL}/api/leads?${query}` ,{
             headers: {
               Authorization: `${token}`,
             },
           });
   
    const data = response.data;
    
    return data;
   } catch (error) {
    console.log("Error: ", error)
   }
  });

  export const sortedLeadByPriority = createAsyncThunk( "sorted/sortedLeadByPriority", async (valueSelected) => {
     try {
        const token = localStorage.getItem("token");
         const response = await axios.get(`${Anvaya_CRM_URL}/api/leads/priority/${valueSelected}`,{
        headers: {
          Authorization: `${token}`,
        },
      } );
      const data = response.data;
      return data;
     } catch (error) {
        
         console.log("Error: ", error)
     }
    }
  );
  export const sortedLeadByTimeToClose = createAsyncThunk("leads/sortedLeadByTimeToClose", async () => {
     try {
        const token = localStorage.getItem("token");
         const response = await axios.get( `${Anvaya_CRM_URL}/api/leads/timeToClose`,{
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = response.data;
      return data;
     } catch (error) {
        
         console.log("Error: ", error)
     }
    }
  );

export const filterSlice = createSlice({
    name: "filters",
    initialState:{
        filters:[],
        status:'idle',
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
        //filter by sales Agents
        builder.addCase(fetchLeadsByQuery.pending, (state)=>{
            state.status = "Loading"  
        })
        builder.addCase(fetchLeadsByQuery.fulfilled, (state,action)=>{
            state.status = "All Leads"
             state.filters = action.payload;
            // console.log(action.payload, "payload")        
        })
        builder.addCase(fetchLeadsByQuery.rejected , (state, action)=>{
            state.status = "error"
            state.error = action.error.message
        })
        //sort by priority
        builder.addCase(sortedLeadByPriority.pending, (state)=>{
            state.status = "Loading"  
        })
        builder.addCase(sortedLeadByPriority.fulfilled, (state,action)=>{
            state.status = "All Leads"
             state.prioritySortedLead = action.payload;
            // console.log(action.payload, "priorityFilterdLead")        
        })
        builder.addCase(sortedLeadByPriority.rejected , (state, action)=>{
            state.status = "error"
            state.error = action.error.message
        })
        //sortByTimeToClose
        builder.addCase(sortedLeadByTimeToClose.pending, (state)=>{
            state.status = "Loading"  
        })
        builder.addCase(sortedLeadByTimeToClose.fulfilled, (state,action)=>{
            state.status = "All Leads"
             state.timeToCloseSortedLead = action.payload;
            // console.log(action.payload, "payload")        
        })
        builder.addCase(sortedLeadByTimeToClose.rejected , (state, action)=>{
            state.status = "error"
            state.error = action.error.message
        })

        
    }
})
export default filterSlice.reducer