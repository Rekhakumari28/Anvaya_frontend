import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const reportLastWeek = createAsyncThunk("report/reportLastWeek", async()=>{
    const response = await axios.get("https://anvaya-backend.vercel.app/api/report/last-week")
    const data = response.data
    
    return data
})

export const reportPipelineAsync = createAsyncThunk('report/reportPipeline', async()=>{
    const response = await axios.get("https://anvaya-backend.vercel.app/api/report/pipeline")
    const data = response.data
    return data
})


export const reportLeadClosedByAgent = createAsyncThunk('report/reportLeadClosedByAgent', async()=>{
    const response = await axios.get("https://anvaya-backend.vercel.app/api/report/closed-by-agent")
    const data = response.data

    return data
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