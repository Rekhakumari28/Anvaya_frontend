import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Anvaya_CRM_URL } from "./userSlice";

export const fetchLeadsByQuery = createAsyncThunk(
  "leads/fetchLeadsByQuery",
  async (query) => {
    
    const token = localStorage.getItem("token");
    const response = await axios.get(`${Anvaya_CRM_URL}/api/leads?${query}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const data = response.data;
console.log(response, "response")
    return data;
  }
);

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    filters: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //filter by sales Agents
    builder.addCase(fetchLeadsByQuery.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchLeadsByQuery.fulfilled, (state, action) => {
      state.status = "All Leads";
      state.filters = action.payload;
      console.log(action.payload, "payload")
    });
    builder.addCase(fetchLeadsByQuery.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});
export default filterSlice.reducer;
