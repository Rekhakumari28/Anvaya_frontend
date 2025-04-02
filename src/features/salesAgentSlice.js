import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllSalesAgent = createAsyncThunk(
  "salesAgent/fetchAllSalesAgent",
  async () => {
    const response = await axios.get(
      "https://anvaya-backend.vercel.app/api/agents"
    );
    const data = response.data;
    return data;
  }
);

export const addSalesAgentAsync = createAsyncThunk(
  "addSalesAgent/addSalesAgentAsync",
  async (newSalesAgent) => {
    const response = await axios.post(
      "https://anvaya-backend.vercel.app/api/agents",
      newSalesAgent
    );
    const data = response.data;
    return data;
  }
);

export const deleteSalesAgentAsync = createAsyncThunk(
  "deleteAgent/deleteSalesAgentAsync",
  async (agentId) => {
    const response = await axios.delete(
      `https://anvaya-backend.vercel.app/api/agents/${agentId}`
    );
    const data = response.data;
    return data;
  }
);

export const salesAgentSlice = createSlice({
  name: "SalesAgent",
  initialState: {
    agents: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //get all sales Agents
    builder.addCase(fetchAllSalesAgent.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchAllSalesAgent.fulfilled, (state, action) => {
      state.status = "Get Sales Agent successfully";
      state.agents = action.payload;
      // console.log(action.payload, "payload")
    });
    builder.addCase(fetchAllSalesAgent.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //add Sales Agent
    builder.addCase(addSalesAgentAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(addSalesAgentAsync.fulfilled, (state, action) => {
      state.status = "Added Sales Agent successfully";
      const addedSalesAgent = action.payload;
      console.log(addedSalesAgent, "addedSalesAgent");
    });
    builder.addCase(addSalesAgentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //delete Sales Agent
    builder.addCase(deleteSalesAgentAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(deleteSalesAgentAsync.fulfilled, (state, action) => {
      state.status = "Agent deleted successfully";
      const deletedAgent = action.payload;
      console.log(deletedAgent, "deletedAgent");
    });
    builder.addCase(deleteSalesAgentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});
export default salesAgentSlice.reducer;
