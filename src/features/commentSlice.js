import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Anvaya_CRM_URL } from "./userSlice";

export const fetchCommentByLeadId = createAsyncThunk(
  "fetchComment/fetchCommentByLeadId",
  async (leadId) => {
   try {
    const token = localStorage.getItem("token");
     const response = await axios.get(
      `${Anvaya_CRM_URL}/api/leads/${leadId}/comments`, {
              headers: {
                Authorization: `${token}`,
              },
            }
    );
    const data = response.data;
    // console.log(data, " get data")
    return data;
   } catch (error) {
    console.log("Error", error)
   }
  }
);

export const postCommentsAsync = createAsyncThunk(
  "addComment/postCommentsAsync",
  async ({ leadId, commentDataObject }) => {
    try {
      const token = localStorage.getItem("token");
      console.log(leadId, commentDataObject);
    const response = await axios.post(
      `${Anvaya_CRM_URL}/api/leads/${leadId}/comments`,
      commentDataObject, {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data, "add data");
    return data;
    } catch (error) {
      console.log("Error", error)
    }
  }
);

export const commentsSlice = createSlice({
  name: "Comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch comments
    builder.addCase(fetchCommentByLeadId.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchCommentByLeadId.fulfilled, (state, action) => {
      state.status = "Success";
      state.comments = action.payload;
      //  console.log(action.payload , "payload comment")
    });
    builder.addCase(fetchCommentByLeadId.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //add comment
    builder.addCase(postCommentsAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(postCommentsAsync.fulfilled, (state, action) => {
      state.status = "Comment added successfully";
      const addedComment = action.payload;
      console.log(addedComment, "addedComment");
    });
    builder.addCase(postCommentsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});
export default commentsSlice.reducer;
