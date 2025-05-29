import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Anvaya_CRM_URL} from "./userSlice";

export const fetchTagsAsync = createAsyncThunk("tags/fetchTagsAsync", async () => {
    try {
        const token = localStorage.getItem("token");        
    const response = await axios.get(`${Anvaya_CRM_URL}/api/tags`,{
            headers: {
              Authorization: `${token}`,
            },
          });   
    const data = response.data;    
    console.log(response, "tags res")
    return data;
    } catch (error) {
        console.log(error)
    }
  });

export const addTagsAsync = createAsyncThunk("tags/addTagsAsync", async (newTag) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${Anvaya_CRM_URL}/api/tags`, newTag ,{
        headers: {
          Authorization: `${token}`,
        },
      });   
    const data = response.data;   
    console.log(data, "Tag added") 
    return data;
    } catch (error) {
        console.log(error)
    }
  });

export const tagSlice = createSlice({
    name: "tags",
    initialState:{
        tags:[],
        status:'idle',
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
        //fetch tags
        builder.addCase(fetchTagsAsync.pending, (state)=>{
            state.status = "Loading"  
        })
        builder.addCase(fetchTagsAsync.fulfilled, (state,action)=>{
            state.status = "All tags"
             state.tags = action.payload;
            console.log(action.payload, "payload")        
        })
        builder.addCase(fetchTagsAsync.rejected , (state, action)=>{
            state.status = "error"
            state.error = action.error.message
        })

        //add tag
        builder.addCase(addTagsAsync.pending, (state)=>{
            state.status = "Loading"  
        })
        builder.addCase(addTagsAsync.fulfilled, (state,action)=>{
            state.status = "Added tags"
             state.tags = action.payload;
            console.log(action.payload, "payload")        
        })
        builder.addCase(addTagsAsync.rejected , (state, action)=>{
            state.status = "error"
            state.error = action.error.message
        })
        
    }
})
export default tagSlice.reducer