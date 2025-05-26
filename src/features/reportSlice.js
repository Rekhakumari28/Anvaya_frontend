import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Anvaya_CRM_URL } from "./userSlice";


export const reportLastWeek = createAsyncThunk("report/reportLastWeek", async()=>{
   try {
    const token = localStorage.getItem("token");
     const response = await axios.get(`${Anvaya_CRM_URL}/api/report/last-week`,{
             headers: {
               Authorization: `${token}`,
             },
           })
    console.log(response, "response")
    const data = response.data
    
    return data
   } catch (error) {
    console.log("Error: ", error)
   }
})

export const reportPipelineAsync = createAsyncThunk('report/reportPipeline', async()=>{
   try {
    const token = localStorage.getItem("token");
     const response = await axios.get(`${Anvaya_CRM_URL}/api/report/pipeline`,{
        headers: {
          Authorization: `${token}`,
        },
      })
    const data = response.data
    return data
   } catch (error) {
    console.log("Error :", error)
   }
})


export const reportLeadClosedByAgent = createAsyncThunk('report/reportLeadClosedByAgent', async()=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Anvaya_CRM_URL}/api/report/closed-by-agent`,{
        headers: {
          Authorization: `${token}`,
        },
      })
    const data = response.data

    return data
    } catch (error) {
        console.log("Error: ", error)
    }
})

export const reportSlice = createSlice({
    name: "Report",
    initialState:{
        
        status:'idle',
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
          //report last week
          builder.addCase(reportLastWeek.pending, (state)=>{
            state.status = "Loading"
        })
        builder.addCase(reportLastWeek.fulfilled, (state,action)=>{
            state.status = "Success"
            state.reportLastWeek = action.payload
          
        })
        builder.addCase(reportLastWeek.rejected , (state, action)=>{
            state.status = "error"
            state.error = action.error.message
        })

        //report pipeline
        builder.addCase(reportPipelineAsync.pending, (state)=>{
            state.status = "Loading"
        })
        builder.addCase(reportPipelineAsync.fulfilled, (state,action)=>{
            state.status = "Success"
            state.reportPipeline = action.payload
        })
        builder.addCase(reportPipelineAsync.rejected , (state, action)=>{
            state.status = "error"
            state.error = action.error.message
        })

        //report lead closed by agent
        builder.addCase(reportLeadClosedByAgent.pending, (state)=>{
            state.status = "Loading"
        })
        builder.addCase(reportLeadClosedByAgent.fulfilled, (state,action)=>{
            state.status = "Success"
            state.reportLeadClosedByAgent = action.payload
        })
        builder.addCase(reportLeadClosedByAgent.rejected , (state, action)=>{
            state.status = "error"
            state.error = action.error.message
        })

    }
})
export default reportSlice.reducer