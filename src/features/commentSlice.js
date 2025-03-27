import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCommentByLeadId = createAsyncThunk('fetchComment/fetchCommentByLeadId', async(leadId)=>{
    const response = await  axios.get(`https://anvaya-backend.vercel.app/api/leads/${leadId}/comments`)
    const data = response.data
    console.log(data, " get data")
    return data
})

export const postCommentsAsync = createAsyncThunk('addComment/postCommentsAsync', async({leadId, newComment})=>{
    const response = await  axios.post(`https://anvaya-backend.vercel.app/api/leads/${leadId}/comments`, newComment)
    const data = response.data
    console.log(data, "add data")
    return data
})

export const commentsSlice = createSlice({
    name:"Comments",
    initialState: {
        comments:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers : (builder)=>{
     //fetch comments
             builder.addCase(fetchCommentByLeadId.pending, (state)=>{
                 state.status = "Loading"
             })
             builder.addCase(fetchCommentByLeadId.fulfilled, (state,action)=>{
                 state.status = "Success"
                 state.comments = action.payload
                 console.log(action.payload , "payload comment")
             })
             builder.addCase(fetchCommentByLeadId.rejected , (state, action)=>{
                 state.status = "error"
                 state.error = action.error.message
             })
     
             //add comment
             builder.addCase(postCommentsAsync.pending, (state)=>{
                 state.status = "Loading"
             })
             builder.addCase(postCommentsAsync.fulfilled, (state,action)=>{
                 state.status = "Comment added successfully"
                 const addedComment = [...state.comments, action.payload]
                 console.log(addedComment, "addedComment");
             })
             builder.addCase(postCommentsAsync.rejected , (state, action)=>{
                 state.status = "error"
                 state.error = action.error.message
             })   
    }
})
export default commentsSlice.reducer